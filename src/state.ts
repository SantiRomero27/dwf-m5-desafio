// Auxiliar types
type Move = "rock" | "paper" | "scissors";
type Result = "userWin" | "computerWin" | "tiedGame";

// State
const state = {
    // Main data
    data: {
        // Current game data
        currentGame: {
            computerMove: "none",
            myMove: "none",
        },

        // Game history
        history: {
            userWins: 0,
            computerWins: 0,
        },
    },

    // State listeners
    listeners: [],

    // Getter
    getState() {
        return this.data;
    },

    // Setter
    setState(newState) {
        this.data = newState;

        // Save the changes made to the state
        localStorage.setItem("games-data", JSON.stringify(this.data));

        for (const cb of this.listeners) {
            cb();
        }
    },

    // Set move method
    setMove(movement: Move, player: "computerMove" | "myMove") {
        // Get the current state
        const currentState = this.getState();

        // Change the move from the current game
        currentState["currentGame"][player] = movement;

        // Set the state changes
        this.setState(currentState);
    },

    // Current game getter
    getCurrentGame() {
        // Get the current state
        const currentState = this.getState();

        return currentState.currentGame;
    },

    // Restart game method
    restartGame() {
        // Get the current State
        const currentState = this.getState();

        // Change values to the initial
        currentState.currentGame.computerMove = "none";
        currentState.currentGame.myMove = "none";

        this.setState(currentState);
    },

    // Set winner method
    getResult(myMove: Move, computerMove: Move) {
        // Aux variables
        const userWin = [
            myMove === "rock" && computerMove === "scissors",
            myMove === "paper" && computerMove === "rock",
            myMove === "scissors" && computerMove === "paper",
        ].includes(true);
        const computerWin = [
            computerMove === "rock" && myMove === "scissors",
            computerMove === "paper" && myMove === "rock",
            computerMove === "scissors" && myMove === "paper",
        ].includes(true);

        // Result variable
        let gameResult: Result;

        // Change the winner history, depending on the result
        if (userWin) {
            gameResult = "userWin";
        } else if (computerWin) {
            gameResult = "computerWin";
        } else {
            gameResult = "tiedGame";
        }

        return gameResult;
    },

    // History setter/change
    changeHistory(gameResult: Result) {
        // Get the current state
        const currentState = this.getState();

        // Change the history, depending on the result
        if (gameResult === "userWin") {
            currentState.history.userWins += 1;
        } else if (gameResult === "computerWin") {
            currentState.history.computerWins += 1;
        }

        // Set the new state
        this.setState(currentState);
    },

    // Init state method
    init() {
        // Get the local data
        const localData = JSON.parse(localStorage.getItem("games-data"));

        this.setState(localData);
    },
};

// EXPORT
export { state, Move };
