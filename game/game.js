import {RoundData} from "./roundData.js";
import {
    checkForWinBySetPlayerFields,
    getUnsetFieldId,
    loadDrawView,
    loadWinnerView,
    setFieldValuesByCurrentPlayer
} from "../statics.js";

const OPPONENT = "O";
const MAX_TURNS = 9;

export class Game {
    constructor() {
        this.roundData = new RoundData;
    }

    getRoundData() {
        return this.roundData;
    }

    start() {
        if (this.getRoundData().isOpponentsTurn()) {
            this.startOpponentsTurn();
        }
    }

    startOpponentsTurn() {
        const game = this;
        const playedFieldIds = this.getRoundData().getPlayedFieldIs();
        const field = getUnsetFieldId(playedFieldIds);

        setTimeout(function () {
            game.makeTurn(field);
        }, 500);
    }

    makeTurn(fieldId) {
        const field = document.getElementById(fieldId);

        this.markFieldByCurrentPlayer(field);
        this.addFieldToRoundData(fieldId);
        this.checkEndOfGame();
    };

    handleNextTurn() {
        this.switchCurrentPlayer();

        if (this.getRoundData().getCurrentPlayer() === OPPONENT) {
            this.startOpponentsTurn();
        }
    }

    markFieldByCurrentPlayer(field) {
        setFieldValuesByCurrentPlayer(field, this.getRoundData().getCurrentPlayer());
    }

    addFieldToRoundData(fieldId) {
        this.getRoundData().setPlayedFieldIds(fieldId);
    }

    isWinner() {
        const setPlayerFields = this.getRoundData().getPlayedFieldsByPlayer();
        return checkForWinBySetPlayerFields(setPlayerFields);
    }

    isPlayerAllowedToMakeThisTurn(fieldId) {
        return this.isFieldFree(fieldId) && this.getRoundData().isPlayersTurn() && !this.getRoundData().isFinished();
    }

    isFieldFree(fieldId) {
        return !this.getRoundData().getPlayedFieldIs().includes(String(fieldId));
    }

    switchCurrentPlayer() {
        this.getRoundData().toggleOpponentsTurn();
        this.getRoundData().setCurrentPlayer();
    }

    getPlayedTurns() {
        return this.getRoundData().getPlayedFields().length;
    }

    checkEndOfGame() {
        if (this.isWinner()) {
            this.getRoundData().setFinishedTrue();
            loadWinnerView(this.getRoundData().getCurrentPlayer());
        } else if (this.getPlayedTurns() === MAX_TURNS) {
            this.getRoundData().setFinishedTrue();
            loadDrawView(this.getRoundData().getCurrentPlayer());
        } else {
            this.handleNextTurn();
        }
    }
}

