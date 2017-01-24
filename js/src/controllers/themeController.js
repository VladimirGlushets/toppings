import '../../../css/article.css';

import Constants from '../common/const';
import DataServiceProxy from '../services/dataServiceProxy';
import ViewService from '../services/viewService';
import Publisher from '../common/publisher';

// controller get requests, generate nesessary html and put it in DOM
export default class ThemeController {
    constructor() {
        this.dataServiceProxy = DataServiceProxy.getInstance();
        this.viewService = ViewService.getInstance();
    }

    fillThemes() {
        // get source data
        this.dataServiceProxy.getAllThemes().then((data) => {

            // after getting data I converted it to DOM elements
            let themesView = this.viewService.getThemesView(data);

            // render view
            this.renderView(themesView);

        }).catch((err) => {
            console.log(err);
        });
    }

    fillArticles(theme) {
        //get source data
        this.dataServiceProxy.getArticlesForThema(theme).then((data) => {

            // after getting data I converted it to DOM elements
            let articlesView = this.viewService.getArticlesView(data, this.fillThemes.bind(this));

            // render view
            this.renderView(articlesView);

        }).catch((err) => {
            console.log(err);
        });
    }

    renderView(view) {
        let container = document.getElementById('content');
        if (container) {
            container.innerHTML = '';
            container.appendChild(view);
        }
    }

    // init start page
    init() {
        // subscribe 'fillArticles' controller's method for Publisher event 'changeTheme'
        Publisher.getInstance().subscribe(Constants.CHANGE_THEME, this.fillArticles.bind(this));
        // subscribe 'fillThemes' controller's method for Publisher event 'back'
        Publisher.getInstance().subscribe(Constants.BACK, this.fillThemes.bind(this));
        this.fillThemes();
    }
}
