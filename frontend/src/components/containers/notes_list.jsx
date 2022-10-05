import React, { useState, useEffect, useRef } from 'react';
import AddNoteForm from '../pure/forms/AddNoteForm';
import Note from '../pure/note';
import AddEditModal from './AddEditModal';
// Model:
import { Notes } from '../../models/notes.class';
// Service:
import { getAllNotes, create, update, remove } from '../../services/axiosService';
// Styles:
import '../../styles/notesStyle.scss';

const NotesList = () => {
    
    const [notes, setNotes] = useState([]);
    const [estadoModal1, setestadoModal1] = useState(false);
    const [archived, setArchived] = useState(false);
    const [filterCategory, setFilterCategory] = useState('');
    const tagRef = useRef('');

    // Get notes list when the app loads
    useEffect(() => {
         getNotes();
    }, []);

    /**
     * Get notes stored in the BD and set the note list as a state of the component
     */
    function getNotes() {
        getAllNotes()
            .then((response) => {
                if (response.data.length > 0) {
                    // Initialize the objects in the response
                    let listNotes = response.data.map((note) => {
                        return (
                            note = new Notes(note.id, note.title, note.content, note.lastEdited,
                                             note.archivedStatus, note.categories)
                        )
                    })
                    setNotes(listNotes);
                }
            })
            .catch((error) => {
                console.log(`Error getting notes: ${error}`);
            })
    }

    /**
     * Filter the notes that have archivedStatus=false
     * @returns list of non archived notes
     */
    function getNonArchivedNotes(){
        // Get only the notes that are not arhived
        let nonArchivedNotes = notes.filter
            (note => (
                filterCategory === '' ?
                    (!note.archivedStatus) :
                    (!note.archivedStatus && isCategoryPresent(note, filterCategory))
            ));
        return nonArchivedNotes;
    }

    /**
     * Filter the notes that have archivedStatus=true
     * @returns list of archived notes
     */
    function getArchivedNotes(){
        // Get only the notes that are arhived
        let archivedNotes = notes.filter
            (note => (
                filterCategory === '' ?
                    (note.archivedStatus) :
                    (note.archivedStatus && isCategoryPresent(note, filterCategory))
            ));
        return archivedNotes;
    }

    // Check if a note has a specific category
    function isCategoryPresent(note, category){
        return note.categories.includes(category);
    }

    /**
     * Divide the note list to be shown in a two column grid
     * @param {*} listNotes: Archived or unarchived filtered notes list
     * @returns Array with two lists, first list is rendered in the first column, second in the second column
     */
    function twoColumnGrid(listNotes){
        // Get number of elements per subarray
        const numsPerGroup = Math.ceil(listNotes.length / 2);
        let listOne = listNotes.slice(0,numsPerGroup);
        let listTwo = listNotes.slice(numsPerGroup, listNotes.length+1);
        return([listOne, listTwo]);
    }

    // Archived = true: Show Archived notes, Archived = false: No archived notes
    function notesToShow(){
        if (archived)
            return twoColumnArchivedList;
        else
            return twoColumnNonArchivedList;
    }

    /**
     * Store a note in the BD and update the note list state of the component
     * @param {*} title: note title
     * @param {*} content: note content
     * @param {*} categories: (String) note categories
     */
    function addNote(title, content, categories) {
        create(title, content, categories)
            .then((response) => {
                let note = response.data;
                // Instance a new Notes object:
                note = new Notes(note.id, note.title, note.content, note.lastEdited,
                                 note.archivedStatus, note.categories);
                const tempNotes = [...notes];
                tempNotes.push(note);
                setNotes(tempNotes);
            })
            .catch((error) => {
                console.log(`Error adding the new note: ${error}`);
            })
    }

    /**
     * Update data of a note in the BD and update the note list state of the component
     * @param {*} id: note id
     * @param {*} title: note title
     * @param {*} content: note content
     * @param {*} archivedStatus: note archived status
     * @param {*} categories : note categories
     */
    function editNote(id, title, content, archivedStatus, categories){
        update(id, title, content, archivedStatus, categories)
            .then((response) => {
                let editedNote = response.data;
                // Remove commas from the categories;
                let editedcategories = editedNote.categories.replace(',','');
                // Instance a new Notes object:
                editedNote = new Notes(editedNote.id, editedNote.title, editedNote.content,
                                       editedNote.lastEdited, editedNote.archivedStatus, editedcategories);
                let note = notes.filter(note => note.id === editedNote.id);
                const index = notes.indexOf(note[0]);
                const tempNotes = [...notes];
                tempNotes[index] = editedNote;
                setNotes(tempNotes);
            })
            .catch((error) => {
                console.log(`Error editing the note: ${error}`);
            })
    }

    /**
     * Change archived status of a note
     * @param {*} note: Notes object
     */
    function changeState(note){
        update(note.id, note.title, note.content, !note.archivedStatus, note.categories)
            .then(() => {
                const index = notes.indexOf(note); 
                const tempNotes = [...notes];
                tempNotes[index].archivedStatus = !tempNotes[index].archivedStatus;
                setNotes(tempNotes);
            })
            .catch((error) => {
                console.log(`Error changing state of the note: ${error}`);
            })
    }

    /**
     * Delete data of a note in the BD and update the note list state of the component
     * @param {*} id: (Long) note id
     */
    function deleteNote(id){
        remove(id)
            .then((response) => {
                const idNote = response.data;
                let deletedNote = notes.filter(note => note.id === idNote);
                // Get the current task index of the list
                const index = notes.indexOf(deletedNote); 
                const tempNotes = [...notes];
                tempNotes.splice(index,1);
                setNotes(tempNotes);
            })
            .catch((error) => {
                console.log(`Error removing the note: ${error}`);
            })
    }

    // Set filter status, to filter notes by category
    function setFilter(e){
        e.preventDefault();
        setFilterCategory(tagRef.current.value);
    }

    let archivedList = getArchivedNotes();
    let nonArchivedList = getNonArchivedNotes();
    let twoColumnArchivedList = twoColumnGrid(archivedList);
    let twoColumnNonArchivedList = twoColumnGrid(nonArchivedList);
    const notesList = notesToShow();

    return (
        <div className='p-4'>
            <div className='d-flex me-auto mb-2 mb-lg-0'>
                {/* Create and Archive Note Buttons */}
                { !archived ? (
                    <div>
                        <button className="btn btn-primary" aria-current="page"
                                onClick={() => setestadoModal1(!estadoModal1)}>Create note</button>
                        <button className="btn btn-link"
                                onClick={() => setArchived(true)}>Archived notes</button>
                    </div>)
                    : (<button className="btn btn-link"
                               onClick={() => setArchived(false)}>{'<'} Go back to unarchived notes</button>)
                }
            </div>
            <div>
                {/* Filter Notes by Category */}
                <form onSubmit={setFilter} className='d-fex justify-content-center align-items-center mb-4 mt-4'>
                    <div className='form-outline d-flex'>
                        <label className='p-3'>Category filter</label>
                        <input ref={tagRef} id='inputCategory' type='text'
                               className='form-control' placeholder='Ex: working, shopping, info' />
                        <button type='submit' className='btn btn-link'>
                            <i className="bi bi-search" />
                        </button>
                    </div>
                </form>
            </div>
            <div className='container d-flex'>
                <div className='col-12 ml-0' style={{'marginLeft': '-50px'}}>
                    {
                        // Show notes list from the left column
                        notesList.length > 0 ?
                        notesList[0].map((currentNote, index) => {
                            return (
                                <Note
                                    key={index}
                                    note={currentNote}
                                    edit={editNote}
                                    remove={deleteNote}
                                    state={changeState}
                                />
                            )})
                        : <h5>There are no notes to show</h5>
                    }
                </div>  
                <div className='col-12 ml-0' style={{'marginLeft': '-550px'}}>
                    {
                        // Show notes list from the right column
                        notesList.length > 0 ?
                        notesList[1].map((currentNote, index) => {
                            return (
                                <Note
                                    key={index}
                                    note={currentNote}
                                    edit={editNote}
                                    remove={deleteNote}
                                    state={changeState}
                                />
                            )})
                        : null
                    }
                </div>    
            </div>
            {/* Display add form popup */}
            <AddEditModal 
                estado={estadoModal1}
                cambiarEstado={setestadoModal1} 
            >
                <AddNoteForm add={addNote} cambiarEstado={setestadoModal1} />
            </AddEditModal>
        </div>
    );
}

export default NotesList;
