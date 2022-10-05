package com.danielvargas.notesbackend.service;

import java.util.List;
import org.springframework.http.ResponseEntity;
// Model:
import com.danielvargas.notesbackend.model.Notes;

public interface NotesService {
	public ResponseEntity<?> findById(Long id);
	public ResponseEntity<?> findByTitle(String title);
    public List<Notes> findAll();
    public ResponseEntity<?> save(Notes note);
    public Long deleteById(Long id);
    public ResponseEntity<?> updateNote(Notes note);
}
