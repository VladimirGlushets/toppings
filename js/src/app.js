import '../../css/layout.css';

require(["./controllers/themeController"],
    (Controller) => {
        let controller = new Controller.default();
        controller.init();

        exports.controller = controller;
    });
