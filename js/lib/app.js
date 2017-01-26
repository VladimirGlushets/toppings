'use strict';

require('../../css/layout.css');

var showNews = document.getElementById('show-news');

if (showNews) {
    showNews.onclick = function () {
        // AMD
        require(["./controllers/themeController"], function (Controller) {
            var controller = new Controller.default();
            controller.init();

            //hide showNews button
            showNews.style.display = 'none';

            exports.controller = controller;
        });
    };
}