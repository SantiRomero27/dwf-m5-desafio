export function initHomePage(params) {
    // Create the Home Page container
    const homePageCont = document.createElement("div");
    homePageCont.setAttribute("class", "home");

    // Give content to the container
    homePageCont.innerHTML = `
        <h1 class="game-title">Piedra, Papel, ó Tijeras</h1>

        <custom-button text="Empezar"></custom-button>

        <div class="hands-container-home">
            <hand-comp hand="scissors"></hand-comp>
            <hand-comp hand="rock"></hand-comp>
            <hand-comp hand="paper"></hand-comp>
        </div>`;

    // Add an event listener to the button
    const buttonEl = homePageCont.querySelector("custom-button");

    buttonEl.addEventListener("click", () => {
        // Go to the next page
        params.goToFunction("/dwf-m5-desafio/instructions");
    });

    return homePageCont;
}
