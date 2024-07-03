// Selectors
const noteForm = document.getElementById('noteForm');
const noteTitleInput = document.getElementById('noteTitle');
const noteContentInput = document.getElementById('noteContent');
const noteCategorySelect = document.getElementById('noteCategory');
const addBtn = document.getElementById('addBtn');
const editBtn = document.getElementById('editBtn');
const cancelBtn = document.getElementById('cancelBtn');
const noteList = document.getElementById('noteList');

let notes = [];


// Event listeners to load all the notes that are added
window.addEventListener('DOMContentLoaded', () => {
    // Load notes from local storage on page load
    if (localStorage.getItem('notes')) {
        notes = JSON.parse(localStorage.getItem('notes'));
        displayNotes();
    }
});



noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const noteTitle = noteTitleInput.value.trim();
    const noteContent = noteContentInput.value.trim();
    const noteCategory = noteCategorySelect.value;

    if (!noteTitle || !noteContent) {
        alert('Please fill in both title and content fields.');
        return;
    }

    if (editBtn.style.display === 'none') {
        // Add new note
        const newNote = {
            id: new Date().getTime(),
            title: noteTitle,
            content: noteContent,
            category: noteCategory
        };

        notes.push(newNote);
    } else {
        // Edit existing note
        const noteId = editBtn.dataset.id;
        const index = notes.findIndex(note => note.id === parseInt(noteId));
        if (index !== -1) {
            notes[index].title = noteTitle;
            notes[index].content = noteContent;
            notes[index].category = noteCategory;
        }
        addBtn.style.display = 'inline-block';
        editBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
    }

    // Save notes to local storage and display
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();

    // Clear form inputs
    noteTitleInput.value = '';
    noteContentInput.value = '';
    noteCategorySelect.value = 'Personal';
});

function displayNotes() {
    noteList.innerHTML = '';

    notes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.content}</p>
            <p><strong>Category:</strong> ${note.category}</p>
            <div class="actions">
                <button onclick="editNote(${note.id})">Edit</button>
                <button onclick="deleteNote(${note.id})">Delete</button>
            </div>
        `;
        noteList.appendChild(noteDiv);
    });
}

function editNote(id) {
    const note = notes.find(note => note.id === id);
    if (note) {
        noteTitleInput.value = note.title;
        noteContentInput.value = note.content;
        noteCategorySelect.value = note.category;

        addBtn.style.display = 'none';
        editBtn.style.display = 'inline-block';
        editBtn.dataset.id = id;
        cancelBtn.style.display = 'inline-block';
    }
}

function deleteNote(id) {
    if (confirm('Are you sure you want to delete this note?')) {
        notes = notes.filter(note => note.id !== id);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
    }
}

cancelBtn.addEventListener('click', () => {
    addBtn.style.display = 'inline-block';
    editBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
    noteTitleInput.value = '';
    noteContentInput.value = '';
    noteCategorySelect.value = 'Personal';
});
