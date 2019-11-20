import {Field} from "./field.js";
import {getRandomBoolean} from "../statics.js";

const PLAYER = "X";
const OPPONENT = "O";

export class RoundData {
    constructor() {
        this.playedFields = [];
        this.opponentTurn = getRandomBoolean();
        this.finished = false;
        this.setCurrentPlayer();
    }

    getPlayedFields() {
        return this.playedFields;
    }

    setPlayedFieldIds(fieldId) {
        const field = new Field(fieldId, this.currentPlayer);
        this.playedFields.push(field);
    }

    isOpponentsTurn() {
        return this.opponentTurn;
    }

    isPlayersTurn() {
        return !this.opponentTurn;
    }

    toggleOpponentsTurn() {
        this.opponentTurn = !this.opponentTurn;
    }

    isFinished() {
        return this.finished;
    }

    setFinishedTrue() {
        this.finished = true;
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    setCurrentPlayer() {
        this.currentPlayer = this.opponentTurn ? OPPONENT : PLAYER;
    }

    getPlayedFieldIs() {
        return this.playedFields.map(field => {
            return field.id;
        });
    }

    getPlayedFieldsByPlayer() {
        const playerFields =  this.getPlayedFields().filter(field => field.value === this.getCurrentPlayer());

        return playerFields.map(field => field.id);
    }
}

