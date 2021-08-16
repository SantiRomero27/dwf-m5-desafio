import { initHomePage } from "./pages/home/home";
import { initInstructionsPage } from "./pages/instructions/instructions";
import { initGameCountdownPage } from "./pages/game-countdown/game-countdown";
import { initResultPage } from "./pages/result/result";

// Init router function
export function initRouter(container: Element) {
    // Routes collection
    const routes = [
        {
            path: /\/home$/,
            page: initHomePage,
        },

        {
            path: /\/instructions$/,
            page: initInstructionsPage,
        },

        {
            path: /\/game-countdown$/,
            page: initGameCountdownPage,
        },

        {
            path: /\/result$/,
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

                console.log(pageContainer);

                // Append the page container, to the root container
                container.appendChild(pageContainer);
            }
        }
    }

    // If the route is just "/"
    if (location.pathname === "/") {
        goTo("/home");
    } else {
        // Handle the route for the first time
        handleRoute(location.pathname);
    }

    // Set the router behaviour for navigator surfing
    window.onpopstate = () => {
        handleRoute(location.pathname);
    };
}
