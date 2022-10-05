import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddEditModal from '../containers/AddEditModal';
import DeleteModal from '../containers/DeleteModal';
import EditNoteForm from './forms/EditNoteForm';
// Model
import { Notes } from '../../models/notes.class'

const Note = ({note, edit, remove, state}) => {

    const [estadoModal2, setestadoModal2] = useState(false);
    const [estadoModal3, setEstadoModal3] = useState(false);

    // Split String of categories, and generate a list of strings
    const generateCategories = (tags) => tags.split('#');
    const listCategories = generateCategories(note.categories);

    return (
        <div>
            <div className='card mb-4' style={{'width': '45%'}}>
                <div className='card-body p-0'>
                    <div className='container d-flex'>
                        <div className='col-2 d-flex'>
                            <i className="bi bi-sticky-fill" style={{'fontSize': '4rem'}} />
                        </div>
                        <div className='col-8 mt-3'>
                            {/* Note Content */}
                            <h5 className='card-title d-flex'>{note.title}</h5>
                            <p className='card-text d-flex mb-0'>{note.content}</p>
                            <div className='text-start mt-1'>
                                {
                                    /* Show the categories of the note */
                                    listCategories.length > 0 ?
                                    listCategories.map((tag, index) => {
                                        return (
                                            <span className="badge badge-pill badge-info bg-info text-dark mb-2 m-1"
                                                key={index}>{tag}</span>
                                        )
                                    })
                                    : null    
                                }
                            </div>
                            <p className='card-text d-flex mb-3'>Last edited: {note.lastEdited}</p>
                        </div>
                        <div className='col-2 d-flex flex-row-reverse align-items-end'>
                            {/* Icons for Delete, Edit or Archive Note */}
                            {
                                // Change icon for archive or unarchive note
                                note.archivedStatus ?
                                    <i className='bi bi-upload p-2'
                                       onClick={() => state(note)} /> :
                                    <i className='bi bi-archive-fill p-2'
                                       onClick={() => state(note)} />
                            }
                            {/* Open Edit or Delete Modals */}
                            <i className='bi bi-pencil-square p-2' 
                               onClick={() => setEstadoModal3(!estadoModal3)}/>
                            <i className='bi bi-trash3-fill p-2'
                               onClick={() => setestadoModal2(!estadoModal2) } />
                        </div>
                    </div>
                </div>
            </div>
            {/* Reusable Popup Window Showing the Edit Form */}
            <AddEditModal 
                estado={estadoModal3}
                cambiarEstado={setEstadoModal3} 
            >
                <EditNoteForm edit={edit} note={note} cambiarEstado={setEstadoModal3} />
            </AddEditModal>
            {/* Reusable Popup Window Showing the Delete Alert */}
            <DeleteModal 
                estado={estadoModal2}
                cambiarEstado={setestadoModal2} 
            >
                <h5>Are you sure you want to delete this note?</h5>
                <div className='d-flex flex-row-reverse align-items-end'>
                    <button className="btn btn-secondary m-1"
                            onClick={() => setestadoModal2(false)}>No</button>
                    <button className="btn btn-primary m-1"
                            onClick={() => {
                                remove(note.id);
                                setestadoModal2(false);
                            }}>Yes</button>
                </div>
            </DeleteModal>
        </div>
    );
};

Note.propTypes = {
    note: PropTypes.instanceOf(Notes).isRequired,
    edit: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    state: PropTypes.func.isRequired
};

export default Note;
