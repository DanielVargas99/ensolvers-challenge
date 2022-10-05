package com.danielvargas.notesbackend.repository;

import org.springframework.stereotype.Repository;
import java.util.Optional;
// Hibernate JPA ORM:
import org.springframework.data.jpa.repository.JpaRepository;
// Model:
import com.danielvargas.notesbackend.model.Notes;

@Repository
public interface NotesRepository extends JpaRepository<Notes, Long> {
	Optional<Notes> findByTitle(String title);
}
