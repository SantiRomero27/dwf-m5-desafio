import { state, Move } from "../../state";

// Random select function
function randomMoveChoice(): Move {
    const possibleMoves: Move[] = ["rock", "paper", "scissors"];
    const pickedMove: Move =
        possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    return pickedMove;
}

// Page function
export function initGameCountdownPage(params) {
    // Aux variables
    let timeLimit: number = 5;

    // Create the Instructions Page container
    const gamePageCont = document.createElement("div");
    gamePageCont.setAttribute("class", "game-countdown");

    // Give content to the container
    gamePageCont.innerHTML = `
    <h2 class="countdown-timer">${timeLimit}</h2>
    <div class="hands-container-countdown">
        <hand-comp hand="scissors"></hand-comp>
        <hand-comp hand="rock"></hand-comp>
        <hand-comp hand="paper"></hand-comp>
    </div>`;

    // Get the hand components
    const handComponents = gamePageCont.querySelectorAll("hand-comp");

    // Add event listeners to the hand components, in order to change their styles
    handComponents.forEach((hand) => {
        hand.addEventListener("handClick", (e: any) => {
            // Get the selected Move
            const selectedMove = e.detail.handMove;

            // Set move from state
            state.setMove(selectedMove, "myMove");

            // Loop all over the hand components, in order to activate one, and deactivate the rest of them
            handComponents.forEach((auxHand) => {
                // Get the image element
                const imageEl = auxHand.shadowRoot.querySelector(".hand");

                // If the selected move is not equal to the aux hand, just deactivate it
                if (auxHand.getAttribute("hand") !== selectedMove) {
                    imageEl.classList.add("inactive-hand");
                    imageEl.classList.remove("active-hand");
                }

                // But, if it is equal to the aux hand, activate it
                else if (auxHand.getAttribute("hand") === selectedMove) {
                    imageEl.classList.add("active-hand");
                    imageEl.classList.remove("inactive-hand");
                }
            });
        });
    });

    // Make the computer move
    state.setMove(randomMoveChoice(), "computerMove");

    // Get the countdown timer
    const countdownTimerEl = gamePageCont.querySelector(".countdown-timer");

    // Timer handling, to take the user Move
    const timerIntervalID = setInterval(() => {
        // The timer stops when it gets to 0
        if (timeLimit === 0) {
            // Break the time interval
            clearInterval(timerIntervalID);

            // Get the current game
            const currentGame = state.getCurrentGame();

            // Check the user selection
            if (currentGame.myMove === "none") {
                // Make a random move
                state.setMove(randomMoveChoice(), "myMove");
            }

            // Show both Moves
            gamePageCont.classList.add("game-hands-show");

            gamePageCont.innerHTML = `
            <hand-comp hand=${currentGame.computerMove} class="computer-hand" height="215px" width="90px"></hand-comp>
            <hand-comp hand=${currentGame.myMove} class="user-hand" height="215px" width="90px"></hand-comp>
            `;

            // Send to the Result page
            setTimeout(() => {
                params.goToFunction("/dwf-m5-desafio/result");
            }, 4000);
        }

        // Change the countdown number showed
        countdownTimerEl.textContent = timeLimit.toString();

        // Reduce the time
        timeLimit -= 1;
    }, 1000);

    return gamePageCont;
}
