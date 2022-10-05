package com.danielvargas.notesbackend.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
// Model:
import com.danielvargas.notesbackend.model.Notes;
// Repository:
import com.danielvargas.notesbackend.repository.NotesRepository;

@Service
public class NotesServiceImpl implements NotesService{
	
	@Autowired  // We inject the repository: NotesRepository
	private NotesRepository notesRepository;
	
	@Override
    @Transactional(readOnly = true)
    public ResponseEntity<?> findById(Long id) {
		
		// Optional, maybe what is here is a Notes object or Empty
        Optional<Notes> note = notesRepository.findById(id); 

        if(!note.isPresent()){ // If no note was found for this id
            return ResponseEntity.notFound().build(); // Build and return 404 error entity.
        }

        return ResponseEntity.ok(note); // If found, code 200 and return the note
    }
	
	@Override
    @Transactional(readOnly = true)
	public ResponseEntity<?> findByTitle(String title) {
		Optional<Notes> note = notesRepository.findByTitle(title); 
		if(!note.isPresent()){
            return ResponseEntity.notFound().build();
        }
		return ResponseEntity.ok(note);
    }
	
	@Override
    @Transactional(readOnly = true) 
    public List<Notes> findAll() {
        return notesRepository.findAll();
    }
	
	@Override
	@Transactional
	public ResponseEntity<?> save(Notes note) {
		// Saves the new note in the DB
		Notes newNote = new Notes(note.getTitle(), note.getContent(), note.getCategories());
		notesRepository.save(newNote);
		return ResponseEntity.status(HttpStatus.CREATED).body(newNote);
	}
	
	@Override
	@Transactional
	public Long deleteById(Long id) {
		// Deletes the note from the DB
		notesRepository.deleteById(id);
		return id;
	}
	
	public ResponseEntity<?> updateNote(Notes note) {
        Notes existingNote = notesRepository.findById(note.getId()).orElse(null);
        existingNote.setTitle(note.getTitle());
        existingNote.setContent(note.getContent());
        existingNote.setLastEdited(LocalDate.now());
        existingNote.setArchivedStatus(note.getArchivedStatus());
        existingNote.setCategories(note.getCategories());
        notesRepository.save(existingNote);
        return ResponseEntity.ok(existingNote);
    }
}
