import { state } from "../../state";

// Image routes
const resultVisual = {
    userWin: require("url:../../assets/userWin.svg"),
    computerWin: require("url:../../assets/computerWin.svg"),
    tiedGame: require("url:../../assets/tiedGame.svg"),
};

// Page init function
export function initResultPage(params) {
    // Create the result Page container
    const resultPageCont = document.createElement("div");
    resultPageCont.setAttribute("class", "result");

    // Get the game result
    const currentGame = state.getCurrentGame();
    const gameResult = state.getResult(
        currentGame.myMove,
        currentGame.computerMove
    );

    // Update the history
    state.changeHistory(gameResult);

    // Get the state, and the current history
    const currentHistory = state.getState().history;

    // After that, clear the current game from the state
    state.restartGame();

    // Give content to the container
    resultPageCont.innerHTML = `
    <div class="image-container"> 
        <img src=${resultVisual[gameResult]} class="result-image" />
    </div>

    <div class="score-container">
        <h2 class="score-container__title">Score</h2>
        <article class="score-container__data">
            <h3 class="score-container__user-data score">Vos: ${currentHistory.userWins}</h3>
            <h3 class="score-container__computer-data score">
                Máquina: ${currentHistory.computerWins}
            </h3>
        </article>
    </div>

    <div class="button-container">
        <custom-button text="Volver a jugar"></custom-button>
    </div>`;

    // Add an event listener to the button
    const buttonEl = resultPageCont.querySelector("custom-button");
    buttonEl.addEventListener("click", () => {
        params.goToFunction("/instructions");
    });

    return resultPageCont;
}
