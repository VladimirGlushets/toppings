import UrlService from './urlService';

// service for providing source data from API
export default class DataService {
    constructor() {
        this.urlService = UrlService.getInstance();
    }

    getAllThemes() {
        return axios.get(this.urlService.getThemesUrl())
            .then((response) => {
                if (response.status != 200) {
                    console.log(response);
                } else {
                    return response.data.sources;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getArticlesForThema(thema) {
        return axios.get(this.urlService.getArticlesUrl(thema))
            .then((response) => {
                if (response.status != 200) {
                    console.log(response);
                } else {
                    return response.data.articles;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
