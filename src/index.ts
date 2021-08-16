import { state } from "./state";
import { initRouter } from "./router";
import { initCustomButton } from "./components/custom-button/custom-button";
import { initHandComponent } from "./components/hand-component/hand-component";

// Main function
(function () {
    // Init components
    initCustomButton();
    initHandComponent();

    // TODO Init the state
    state.init();

    // Init the router
    initRouter(document.querySelector("#root"));
})();
