
import Q from 'Q';

const IS_BROWSER = (typeof window !== 'undefined');
const IS_CORDOVA = IS_BROWSER && window.cordova;

let defaultPlugins = {
    Contacts: require('./plugins/Contacts'),
    Battery: require('./plugins/Battery')
}

let defaultMocks = {
    Contacts: require('./plugins/Contacts/mocks')
}

/*
 handle plugins load
 */
export default class CordoWrap {
    // on startup, register available plugins
    constructor() {
        this.plugins = {};
        this.mocks = {};
        // load default plugins
        Object.keys(defaultPlugins).map(name => this.addPlugin({
            Plugin: defaultPlugins[name]
        }));
    }
    useDefaultMocks() {
        this.setMocks(defaultMocks);
    }
    /**
     * mock some plugin methods, return a promise
     */
    mockPlugin(plugin, mocks) {
        if (mocks) {
            Object.keys(mocks).forEach(methodName => {
                plugin[methodName] = () => Q.when(mocks[methodName]());
            });
        }
    }
    /**
     * add/update mocks
     */
    setMocks(mocksData) {
        this.mocks = mocksData;
        Object.keys(this.plugins).forEach(pluginName => {
            this.mockPlugin(this.plugins[pluginName], mocksData[pluginName]);
        });
    }
    addPlugin({Plugin, options = {}}) {
        if (this.plugins[Plugin.name]) {
            return Q.when(this.plugins[Plugin.name]);
        }

        // instanciate Plugin and resolve when ready
        let plugin = new Plugin(this, options);

        // register the plugin internally
        this.plugins[Plugin.name] = plugin;

        // add mocks
        if (this.mocks[Plugin.name]) {
            this.mockPlugin(plugin, this.mocks[Plugin.name]);
        }

        return Q.when(plugin);
    }
    get isCordova() {
        return IS_BROWSER && IS_CORDOVA;
    }

}
