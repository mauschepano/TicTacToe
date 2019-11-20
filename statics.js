const PLAYABLE_FIELD_IDS = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

export function getRandomBoolean() {
    return Math.random() >= 0.5
}

export function getUnsetFieldId(playedFieldIds) {
    const fieldId = getRandomFieldId(playedFieldIds);

    if (playedFieldIds.includes(fieldId)) {
        getUnsetFieldId(playedFieldIds);
    }

    return fieldId;
}

export function setFieldValuesByCurrentPlayer(field, currentPlayer) {
    field.value = currentPlayer;
    field.dataset.value = currentPlayer;
    field.innerHTML = currentPlayer;
}

export function checkForWinBySetPlayerFields(fieldIds) {
    return fieldIds.length < 3 ? false : hasWon(fieldIds);
}

export function loadWinnerView(currentPlayer) {
    const winner = document.getElementById('winner');

    winner.innerHTML = "Congrats to " + currentPlayer + "!";
    winner.classList.remove('hidden');
    showReload();
}

export function loadDrawView() {
    const draw = document.getElementById('draw');
    draw.classList.remove('hidden');
    showReload();
}

export function resetToDefault() {
    resetReloadContainerToDefault();
    resetBoardToDefault();
}

function resetReloadContainerToDefault() {
    document.getElementById('winner').classList.add('hidden');
    document.getElementById('draw').classList.add('hidden');
    document.getElementById('reload').classList.add('hidden');
}

function resetBoardToDefault() {
    const fields = document.getElementsByClassName('field');
    let i;

    for (i = 0; i < fields.length; i++) {
        fields[i].dataset.value = "";
        fields[i].innerHTML = "";
    }
}

function getRandomFieldId(playedFieldIds) {
    const difference = PLAYABLE_FIELD_IDS.filter(x => !playedFieldIds.includes(x));

    return difference[Math.floor(Math.random() * difference.length)];
}

function hasWon(fieldIds) {
    const ROWS_FOR_WIN = [
        ["0", "3", "6"],
        ["1", "4", "7"],
        ["2", "5", "8"],
        ["0", "1", "2"],
        ["3", "4", "5"],
        ["6", "7", "8"],
        ["0", "4", "8"],
        ["2", "4", "6"]
    ];
    let i;

    for (i = 0; i < ROWS_FOR_WIN.length; i++) {
        if (isRowSetComplete(fieldIds, ROWS_FOR_WIN[i])) return true;
    }

    return false;
}

function isRowSetComplete(fields, rowSet) {
    const checker = (set, ids) => ids.every(id => set.includes(id));

    return checker(rowSet, fields);
}

function showReload() {
    const reloadContainer = document.getElementById('reload');
    const reloadIcon = document.getElementById('reload-icon');

    reloadContainer.classList.remove('hidden');
    reloadIcon.classList.remove('hidden');
}
