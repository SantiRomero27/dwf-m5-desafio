export function initInstructionsPage(params) {
    // Create the Instructions Page container
    const instructionsPageCont = document.createElement("div");
    instructionsPageCont.setAttribute("class", "instructions");

    // Give content to the container
    instructionsPageCont.innerHTML = `
    <p class="instructions-text">
    Presioná jugar y elegí: piedra, papel o tijera antes de que
    pasen los 5 segundos.
    </p>
    <custom-button text="¡Jugar!"></custom-button>
    <div class="hands-container">
    <hand-comp hand="scissors"></hand-comp>
    <hand-comp hand="rock"></hand-comp>
    <hand-comp hand="paper"></hand-comp>
    </div>`;

    // Add an event listener to the button, in order to redirect to the game countdown
    const buttonEl = instructionsPageCont.querySelector("custom-button");
    buttonEl.addEventListener("click", () => {
        params.goToFunction("/game-countdown");
    });

    return instructionsPageCont;
}
