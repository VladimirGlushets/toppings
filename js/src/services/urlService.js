// private variables
const themesUrl = 'https://newsapi.org/v1/sources';
const apiKey = '05d1310787a94c24a707f1c3c8d2584c';

let instance = null;

export default class UrlService {

    static getInstance(){
      if (!instance) {
          instance = new UrlService();
      }

      // return singltone
      return instance;
    }

    getThemesUrl() {
        return themesUrl;
    }

    // method generate and return url for current theme
    getArticlesUrl(theme) {
        return `https://newsapi.org/v1/articles?source=${theme}&apiKey=${apiKey}`;
    }
}
