//import $ from "jquery";

import UrlService from './urlService';
 //var json = require('../data/groups.json'); //(with path)

import json from  '../data/groups.json';

// service for providing source data from API
export default class DataService {
    constructor() {
        this.urlService = UrlService.getInstance();
    }

    getAllThemes() {
      return new Promise(function(resolve, reject) {
        resolve(json);
      });
    }

    getArticlesForThema(id) {
      return new Promise(function(resolve, reject) {
        var group = json.filter((el) => { return el.id == id[0]});
        resolve(group[0].toppings);
      });
    }
};
