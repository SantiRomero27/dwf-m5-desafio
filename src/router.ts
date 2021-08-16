import { initHomePage } from "./pages/home/home";
import { initInstructionsPage } from "./pages/instructions/instructions";
import { initGameCountdownPage } from "./pages/game-countdown/game-countdown";
import { initResultPage } from "./pages/result/result";

// Init router function
export function initRouter(container: Element) {
    console.log("> Se cargó el router");

    // Routes collection
    const routes = [
        {
            path: /\/dwf-m5-desafio\/home/,
            page: initHomePage,
        },

        {
            path: /\/dwf-m5-desafio\/instructions/,
            page: initInstructionsPage,
        },

        {
            path: /\/dwf-m5-desafio\/game-countdown/,
            page: initGameCountdownPage,
        },

        {
            path: /\/dwf-m5-desafio\/result/,
            page: initResultPage,
        },
    ];

    // Function that handles history
    function goTo(path: string) {
        history.pushState({}, "", path);
        handleRoute(path);
    }

    // Function that handles the route
    function handleRoute(route: string) {
        // Loop all over the routes collection
        for (const r of routes) {
            if (r.path.test(route)) {
                // Get the page container
                const pageContainer = r.page({ goToFunction: goTo });

                // If there's content in the page, remove it first
                if (container.firstChild) {
                    container.firstChild.remove();
                }

                // Append the page container, to the root container
                container.appendChild(pageContainer);
            }
        }
    }

    // If the route is just "/dwf-m5-desafio"
    if (location.host.includes("github.io")) {
        console.log("> Se inició la primera página");
        goTo("/dwf-m5-desafio/home");
    } else {
        // Handle the route for the first time
        console.log("> Se cargó la ruta: ", location.pathname);
        handleRoute(location.pathname);
    }

    // Set the router behaviour for navigator surfing
    window.onpopstate = () => {
        handleRoute(location.pathname);
    };
}
