import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Notes_page.css';

const API_URL = 'http://localhost:5000/api';

const NotesApp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '' 
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [notes, setNotes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes: ', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      navigate('/');
    } else {
      setUser(loggedInUser);
      fetchNotes();
    }
  }, [navigate, fetchNotes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({ title: '', content: '' });
    setIsEditing(false);
    setSelectedNoteId(null);
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    const { title, content } = formData;
    
    if (!title.trim() || !content.trim()) return;
    
    try {
      if (isEditing && selectedNoteId) {
        await axios.put(`${API_URL}/notes/${selectedNoteId}`, {
          title,
          content
        });
      } else {
        await axios.post(`${API_URL}/notes`, {
          title,
          content
        });
      }
      
      fetchNotes();
      resetForm();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };
  
  const handleDeleteNote = async (noteId, e) => {
    e.stopPropagation(); // Prevent triggering parent click events

    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if(confirmDelete){
    try {
      await axios.delete(`${API_URL}/notes/${noteId}`);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }
  };

  const handleEditNote = (note, e) => {
    e.stopPropagation(); 
    setFormData({
      title: note.title,
      content: note.content
    });
    setSelectedNoteId(note.id);
    setIsEditing(true);
  };

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  const toggleContent = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // Filter notes once and reuse the result
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.id.toString().includes(searchTerm)
  );

  return (
    <div className="notes-container">
      <header className="notes-header">
        <h2>Welcome, {user}</h2>
        <button className="logout-button" onClick={logout}>Logout</button>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <form className="input-section" onSubmit={handleAddNote}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />

        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleInputChange}
          required
        />

        <div className="form-actions">
          <button type="submit">
            {isEditing ? 'Update Note' : 'Add Note'}
          </button>

          {isEditing && (
            <button 
              type="button"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3>Your Notes:</h3>
      {isLoading ? (
        <p>Loading notes...</p>
      ) : (
        <div className="notes-list">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note, i) => (
              <div 
                key={note.id} 
                className="note-card"
                onClick={() => toggleContent(i)}
              >
                <h4>{note.id}.{note.title}</h4>
                {activeIndex === i && <p>{note.content}</p>}
                <div className="note-actions" onClick={e => e.stopPropagation()}>
                  <button onClick={(e) => handleEditNote(note, e)}>Edit</button>
                  <button onClick={(e) => handleDeleteNote(note.id, e)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No notes found matching your search.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotesApp;