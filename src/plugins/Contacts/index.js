import Q from 'Q';

export default class Contacts {
    find({options = {}} = {}) {
        let deferred = Q.defer();
        try {
            navigator.contacts.find(options.fields, deferred.resolve, deferred.reject, options);
        } catch(e) {
            deferred.reject(e);
        }
        return deferred.promise;
    }
}
