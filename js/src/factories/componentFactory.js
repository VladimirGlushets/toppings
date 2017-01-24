import Constants from '../common/const';
import ThemeViewComponent from '../views/themeViewComponent';
import ArticleViewComponent from '../views/articleViewComponent';

// factory fo creating view components
export default class ComponentFactory {
    createViewComponent(componentSourceObj, componentName, callback) {
        switch (componentName) {
            case Constants.THEME:
                return new ThemeViewComponent(componentSourceObj, callback);
                break;

            case Constants.ARTICLE:
                return new ArticleViewComponent(componentSourceObj);
                break;

            default:
                break;
        }
    }
}
