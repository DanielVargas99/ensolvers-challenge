package com.danielvargas.notesbackend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
// Model:
import com.danielvargas.notesbackend.model.Notes;
// Service:
import com.danielvargas.notesbackend.service.NotesService;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class NotesController {
	
	@Autowired // We inject the service: notesService
    private NotesService notesService;
	
	// Create a new note
	@PostMapping("/add")
	public ResponseEntity<?> create(@RequestBody Notes note){
    	return notesService.save(note);
    }
	
	// Get all notes
	@GetMapping("/notes")
    public List<Notes> findAllNotes() {
        return notesService.findAll();
    }
	
	@GetMapping("/noteById/{id}") // @PathVariable, the path changes according to the id
    public ResponseEntity<?> findNoteById(@PathVariable Long id){
        return notesService.findById(id);
    }
	
	@GetMapping("/noteByTitle/{title}")
    public ResponseEntity<?> findNoteByTitle(@PathVariable String title) {
        return notesService.findByTitle(title);
    }
	
	 @PutMapping("/update")
	 public ResponseEntity<?> updateNote(@RequestBody Notes note) {
	    return notesService.updateNote(note);
	 }
	 
	 @DeleteMapping("/delete/{id}")
	 public Long deleteNote(@PathVariable Long id) {
	    return notesService.deleteById(id);
	 }
}
