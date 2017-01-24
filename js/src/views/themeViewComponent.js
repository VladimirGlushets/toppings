import Constants from '../common/const';
import Publisher from '../common/publisher';

// private method
const getImageElement = function(id, imageUrl, callback) {
    let image = document.createElement("div");
    image.setAttribute("class", "image");

    let floater = document.createElement("div");
    floater.setAttribute("class", "floater");

    let a = document.createElement("a");
    a.setAttribute("href", "#");
    a.addEventListener("click", () => {
        callback(id);
    }, false);

    let img = document.createElement("img");
    img.setAttribute("src", imageUrl);

    a.appendChild(img);
    floater.appendChild(a);
    image.appendChild(floater);
    return image;
}

// private method
const getTitleElement = function(id, title, callback) {
    let titleEl = document.createElement("div");
    titleEl.setAttribute("class", "title");

    let a = document.createElement("a");
    a.setAttribute("href", "#");
    a.innerHTML = title;
    a.addEventListener("click", () => {
        callback(id);
    }, false);

    titleEl.appendChild(a);
    return titleEl;
}

// private method
const getDescriptionElement = function(description) {
    let descriptionEl = document.createElement("div");
    descriptionEl.setAttribute("class", "description");
    descriptionEl.innerHTML = description;

    return descriptionEl;
}

export default class ThemeViewComponent{
    constructor(componentSourceObj) {
        this.componentSourceObj = componentSourceObj;
    }

    getView() {
        let root = document.createElement("div");
        root.setAttribute("class", "article-container");

        let body = document.createElement("div");
        body.setAttribute("class", "body");

        let image = getImageElement(this.componentSourceObj.id, this.componentSourceObj.urlsToLogos.small, this.changeSelectedThemeId);

        let title = getTitleElement(this.componentSourceObj.id, this.componentSourceObj.name, this.changeSelectedThemeId);

        let description = getDescriptionElement(this.componentSourceObj.description);

        body.appendChild(image);
        body.appendChild(title);
        body.appendChild(description);

        root.appendChild(body);
        return root;
    }

    changeSelectedThemeId(id){
      //init notifying all callbacks, subscraibed on changeTheme event
      Publisher.getInstance().notify(Constants.CHANGE_THEME, id);
    }
}
