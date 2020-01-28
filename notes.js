const fs = require("fs");

function fetchNotes() {
    try {
        const notesString = fs.readFileSync("notes-data.json");
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
}

function saveNotes(notes) {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));
}

function addNote(title, body) {
    let notes = fetchNotes();
    let note = {
        title,
        body
    };

    let duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);

        return note;
    }
}

function getAll() {
    return fetchNotes();
}

function getNote(title) {
    let notes = fetchNotes();
    let filteredNotes = notes.filter((note) => note.title === title);

    return filteredNotes[0];
}

function removeNote(title) {
    let notes = fetchNotes();
    let filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
}

function logNote(note) {
    console.log("--");
    console.log(`   Title: ${note.title}`);
    console.log(`   Body: ${note.body}`);
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};