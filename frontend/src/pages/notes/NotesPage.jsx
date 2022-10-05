import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotesList from '../../components/containers/notes_list';

const NotesPage = () => {
    
    let navigate = useNavigate();

    return (
        <div>
            {/* Header */}
            <nav className="navbar navbar-expand-lg bg-light p-4">
                <div className="container-fluid">
                    <h1 className='navbar-brand'>My notes</h1>
                    <div className='justify-content-end'>
                        <button className="btn btn-primary" aria-current="page"
                                onClick={() => navigate('/login')}>Login</button>
                    </div>
                </div>
            </nav>
            {/* Body content */}
            <NotesList />
        </div>
    );
}

export default NotesPage;
