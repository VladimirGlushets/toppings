import Constants from '../common/const';
import Publisher from '../common/publisher';

const createThemes = function(themaJson, controller) {
    return `
    <div class="article-container">
      <div class="body">
        <div class="image">
          <div class='floater'>
            <a href="#" onclick = "controller.fillArticles('${themaJson.id}');" >
              <img src="${themaJson.groupImage}">
              </a>
          </div>
        </div>
        <div class="title">
            <a href="#" onclick = "controller.fillArticles('${themaJson.id}');">
                ${themaJson.groupName}
              </a>
        </div>
        <div class="description">${themaJson.description}</div>
      </div>
    </div>`;
}

export default class GroupHtmlComponent{
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
