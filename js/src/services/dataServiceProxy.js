import DataService from './dataService';

let instance = null;

// use DataServiceProxy to cache list of themes
export default class DataServiceProxy extends DataService {
    static getInstance() {
        if (!instance) {
            instance = new DataServiceProxy();
        }

        // return singltone
        return instance;
    }

    getAllThemes() {
        if (!this.themes) {
            this.themes = super.getAllThemes();
        }
        return this.themes;
    }
}
