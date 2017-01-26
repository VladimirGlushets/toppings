"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// private method
var getImageElement = function getImageElement(imageUrl, articleUrl) {
    var image = document.createElement("div");
    image.setAttribute("class", "image");

    var floater = document.createElement("div");
    floater.setAttribute("class", "floater");

    var a = document.createElement("a");
    a.setAttribute("href", articleUrl);
    a.setAttribute("target", "_blank");

    var img = document.createElement("img");
    img.setAttribute("src", imageUrl);

    a.appendChild(img);
    floater.appendChild(a);
    image.appendChild(floater);
    return image;
};

// private method
var getTitleElement = function getTitleElement(articleUrl, title) {
    var titleEl = document.createElement("div");
    titleEl.setAttribute("class", "title");

    var a = document.createElement("a");
    a.setAttribute("href", articleUrl);
    a.setAttribute("target", "_blank");
    a.innerHTML = title;

    titleEl.appendChild(a);
    return titleEl;
};

// private method
var getAuthorElement = function getAuthorElement(author) {
    var authorEl = document.createElement("div");
    authorEl.setAttribute("class", "author");
    authorEl.innerHTML = author ? 'by ' + author : '';

    return authorEl;
};

// private method
var getDescriptionElement = function getDescriptionElement(description) {
    var descriptionEl = document.createElement("div");
    descriptionEl.setAttribute("class", "description");
    descriptionEl.innerHTML = description;

    return descriptionEl;
};

// private method
var getPublishAtElement = function getPublishAtElement(publishAt) {
    var publishAtEl = document.createElement("div");
    publishAtEl.setAttribute("class", "publish-at");
    publishAtEl.innerHTML = publishAt ? publishAt : '';

    return publishAtEl;
};

var ArticleViewComponent = function () {
    function ArticleViewComponent(componentSourceObj) {
        _classCallCheck(this, ArticleViewComponent);

        this.componentSourceObj = componentSourceObj;
    }

    _createClass(ArticleViewComponent, [{
        key: "getView",
        value: function getView() {
            var root = document.createElement("div");
            root.setAttribute("class", "article-container");

            var body = document.createElement("div");
            body.setAttribute("class", "body");

            var image = getImageElement(this.componentSourceObj.urlToImage, this.componentSourceObj.url);

            var title = getTitleElement(this.componentSourceObj.url, this.componentSourceObj.title);

            var author = getAuthorElement(this.componentSourceObj.author);

            var description = getDescriptionElement(this.componentSourceObj.description);

            var publishAt = getPublishAtElement(this.componentSourceObj.publishedAt);

            body.appendChild(image);
            body.appendChild(title);
            body.appendChild(author);
            body.appendChild(description);
            body.appendChild(publishAt);

            root.appendChild(body);
            return root;
        }
    }]);

    return ArticleViewComponent;
}();

exports.default = ArticleViewComponent;