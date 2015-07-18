

const Q = require('Q');

const IS_BROWSER = (typeof window !== 'undefined');
const IS_CORDOVA = IS_BROWSER && window.cordova;

export default class CordoWrap {
    constructor(...plugins) {
        this.plugins = {};
        this.mocks = {};
        plugins.forEach(pluginName => {
            this.addPlugin({
                name: pluginName
            });
        })
    }
    /**
     * mock some plugin methods
     */
    mockPlugin(plugin, mocks) {
        if (mocks) {
            Object.keys(mocks).forEach(methodName => {
                plugin[methodName] = () => mocks[methodName]();
            });
        }
    }
    /**
     * add/update mocks
     */
    addMocks(mocksData) {
        this.mocks = mocksData;
        Object.keys(this.plugins).forEach(pluginName => {
            this.mockPlugin(this.plugins[pluginName], mocksData[pluginName]);
        });
    }
    addPlugin({name, options = {}}) {

        if (typeof arguments[0] === 'string') {
            name = arguments[0];
        }

        if (this.plugins[name]) {
            return Q.when(this.plugins[name]);
        }

        let plugin = new Plugins[name](options);
        let deferred = Q.defer();
        deferred.resolve(plugin);

        return deferred.promise.then(plugin => {
            // ex: cordoWrap.plugins.Contacts
            this.plugins[name] = plugin;
            // add a convenient shortcut
            // ex: cordoWrap.Contacts
            this[name] = plugin;
            // add mock hooks
            this.mockPlugin(plugin, this.mocks[name]);
            return plugin;
        });
    }
    get isCordova() {
        return IS_BROWSER && IS_CORDOVA;
    }

}

class Battery {
    constructor() {
        this.level = null;
        if (IS_CORDOVA) {
            window.addEventListener("batterystatus", this.onBatteryStatus, false);
            window.addEventListener("batterycritical", this.onBatteryCritical, false);
            window.addEventListener("batterylow", this.onBatteryLow, false);
        }
    }
    onBatteryStatus(info) {
        this.level = info.level;
        console.Log('Battery.status', arguments);
    }
    onBatteryCritical(info) {
        console.Log('Battery.CRITICAL', arguments);
    }
    onBatteryLow(info) {
        console.Log('Battery.LOW', arguments);
    }
}

function getMock(path) {
    return function() {
        var data = require(path);
        return Q.when(data);
    };
};

var mocks = {
    Contacts: {
        find: getMock('./plugins/Contacts/mocks/find.js')
    }
};

class Contacts {
    find({options = {}} = {}) {
        let deferred = Q.defer();
        navigator.contacts.find(options.fields, deferred.resolve, deferred.reject, options);
        return deferred.promise;
    }
}


let Plugins = {
    Battery: Battery,
    Contacts: Contacts
};

var c = new CordoWrap('Battery');
c.addMocks(mocks);

c.addPlugin('Contacts').then(() => {
    console.log('hello', c);
    c.Contacts.find().then(contacts => {
        console.log('contacts', contacts);
    });
}).catch((err, ...rest) => {
    console.log(err);
    throw err;
})



//
// var c = new Contacts();
// c.find().then(data => {
//     console.log('data', data);
// }).catch(err=>{
//     console.log('err', arguments);
// });
