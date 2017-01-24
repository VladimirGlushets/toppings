// private method
const getImageElement = function(imageUrl, articleUrl) {
    let image = document.createElement("div");
    image.setAttribute("class", "image");

    let floater = document.createElement("div");
    floater.setAttribute("class", "floater");

    let a = document.createElement("a");
    a.setAttribute("href", articleUrl);
    a.setAttribute("target", "_blank");

    let img = document.createElement("img");
    img.setAttribute("src", imageUrl);

    a.appendChild(img);
    floater.appendChild(a);
    image.appendChild(floater);
    return image;
}

// private method
const getTitleElement = function(articleUrl, title) {
    let titleEl = document.createElement("div");
    titleEl.setAttribute("class", "title");

    let a = document.createElement("a");
    a.setAttribute("href", articleUrl);
    a.setAttribute("target", "_blank");
    a.innerHTML = title;

    titleEl.appendChild(a);
    return titleEl;
}

// private method
const getAuthorElement = function(author){
  let authorEl = document.createElement("div");
  authorEl.setAttribute("class", "author");
  authorEl.innerHTML = author ? 'by ' + author : '';

  return authorEl;
}

// private method
const getDescriptionElement = function(description) {
    let descriptionEl = document.createElement("div");
    descriptionEl.setAttribute("class", "description");
    descriptionEl.innerHTML = description;

    return descriptionEl;
}

// private method
const getPublishAtElement = function(publishAt) {
    let publishAtEl = document.createElement("div");
    publishAtEl.setAttribute("class", "publish-at");
    publishAtEl.innerHTML = publishAt ? publishAt : '';

    return publishAtEl;
}

export default class ArticleViewComponent {
    constructor(componentSourceObj) {
        this.componentSourceObj = componentSourceObj;
    }

    getView() {
        let root = document.createElement("div");
        root.setAttribute("class", "article-container");

        let body = document.createElement("div");
        body.setAttribute("class", "body");

        let image = getImageElement(this.componentSourceObj.urlToImage, this.componentSourceObj.url);

        let title = getTitleElement(this.componentSourceObj.url, this.componentSourceObj.title);

        let author = getAuthorElement(this.componentSourceObj.author);

        let description = getDescriptionElement(this.componentSourceObj.description);

        let publishAt = getPublishAtElement(this.componentSourceObj.publishedAt);

        body.appendChild(image);
        body.appendChild(title);
        body.appendChild(author);
        body.appendChild(description);
        body.appendChild(publishAt);

        root.appendChild(body);
        return root;
    }
}
