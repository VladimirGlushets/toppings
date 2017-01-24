let instance = null;

// Publisher singleton object for implementing Observer pattern
// https://habrahabr.ru/post/132472/
export default class Publisher {
    constructor() {
        // to store subscribers
        this.observers = new Map();
    }

    // singltone
    static getInstance() {
        if (!instance) {
            instance = new Publisher();
        }
        return instance;
    }

    // label - event name ('back', 'changeTheme', and others)
    subscribe(label, callback) {
        if (!this.observers.has(label)) {
            this.observers.set(label, []);
        }
        this.observers.get(label).push(callback);
    }

    unsubscribe(label, callback) {
        if (this.observers.has(label)) {
            let callbacks = observers.get(label);
            let newcallbacks = callbacks.filter((e) => e != callback);
            this.observers.set(label, newcallbacks);
            return true;
        }
        return false;
    }

    // method for notifying all observers
    notify(label, ...args) {
        if (this.observers.has(label)) {
            let callbacks = this.observers.get(label);
            callbacks.forEach((callback) => {
                callback(args);
            });
            return true;
        }
        return false;
    }

}
