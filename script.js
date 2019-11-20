import {Game} from "./game/game.js";
import {resetToDefault} from "./statics.js";

window.onload = function () {

    addReloadListener();
    init();

    function init() {
        const game = new Game();

        game.start();
        addEventListeners(game);
        resetToDefault();
    }

    function addEventListeners(game) {
        const fields = document.getElementsByClassName('field');
        let i;

        for (i = 0; i < fields.length; i++) {
            addEventListenerToField(fields[i], game);
        }
    }

    function addEventListenerToField(field, game) {

        field.addEventListener('click', event => {
            if (game.isPlayerAllowedToMakeThisTurn(field.id)) {
                game.makeTurn(field.id);
            }
        }, false);
    }

    function addReloadListener() {
        const reload = document.getElementById('reload-icon');

        reload.addEventListener('click', event => {
            init();
        }, false);
    }
};

