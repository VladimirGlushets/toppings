import '../../css/layout.css';

let showNews = document.getElementById('show-news');

if (showNews) {
    showNews.onclick = () => {
        // AMD
        require(["./controllers/themeController"],
            (Controller) => {
                let controller = new Controller.default();
                controller.init();

                //hide showNews button
                showNews.style.display = 'none';

                exports.controller = controller;
            });
    };
}
