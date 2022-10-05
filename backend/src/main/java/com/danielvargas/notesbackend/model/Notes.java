package com.danielvargas.notesbackend.model;

import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "notes")
public class Notes implements Serializable {
	
	private static final long serialVersionUID = -4645318898216306609L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Generate the id automatically
	private Long id;
	
	@Column(length = 50, nullable=false)
	private String title;
	
	@Column(nullable=false)
	private String content;
	
	@Column(nullable=false)
    private LocalDate lastEdited;
	
	@Column(nullable=false)
	private Boolean archivedStatus;
	
	private String categories;

	// Setters and Getters
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDate getLastEdited() {
		return lastEdited;
	}

	public void setLastEdited(LocalDate lastEdited) {
		this.lastEdited = lastEdited;
	}

	public Boolean getArchivedStatus() {
		return archivedStatus;
	}

	public void setArchivedStatus(Boolean archivedStatus) {
		this.archivedStatus = archivedStatus;
	}
	
	public String getCategories() {
		return categories;
	}

	public void setCategories(String categories) {
		this.categories = categories;
	}

	// Constructor
	
	public Notes() {}
	
	public Notes(String title, String content, String categories) {
		this.title = title;
		this.content = content;
		this.lastEdited = LocalDate.now();
		this.archivedStatus = false;  // Not archived by default
		this.categories = categories;
	}
}
