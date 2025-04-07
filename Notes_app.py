from flask import Flask, request, jsonify
from flask_cors import CORS
from flasgger import Swagger

app = Flask(__name__)
CORS(app)
swagger = Swagger(app)

notes = []

# Function to reassign IDs after delete
def reindex_notes():  
    for idx, note in enumerate(notes, start=1):
        note['id'] = idx

# Create a new note
@app.route('/api/notes', methods=['POST'])
def create_note():
    """
    Create a new note
    ---
    tags:
      - Notes
    parameters:
      - name: body
        in: body
        required: true
        schema:
          id: Note
          required:
            - title
            - content
          properties:
            title:
              type: string
              description: Title of the note
            content:
              type: string
              description: Content of the note
    responses:
      201:
        description: Note created successfully
    """
    data = request.get_json()

    if not data or 'title' not in data or 'content' not in data:
        return jsonify({'error': 'Title and content are required'}), 400

    note = {
        'id': len(notes) + 1,
        'title': data['title'],
        'content': data['content']
    }
    notes.append(note)

    return jsonify(note), 201

# Get all notes
@app.route('/api/notes', methods=['GET'])
def get_notes():
    """
    Get all notes
    ---
    tags:
      - Notes
    responses:
      200:
        description: A list of all notes
    """
    return jsonify(notes)

# Get a specific note
@app.route('/api/notes/<int:note_id>', methods=['GET'])
def get_note(note_id):
    """
    Get a note by ID
    ---
    tags:
      - Notes
    parameters:
      - name: note_id
        in: path
        type: integer
        required: true
        description: The ID of the note
    responses:
      200:
        description: The requested note
      404:
        description: Note not found
    """
    for note in notes:
        if note['id'] == note_id:
            return jsonify(note)
    return jsonify({'error': 'Note not found'}), 404

# Update a note
@app.route('/api/notes/<int:note_id>', methods=['PUT'])
def update_note(note_id):
    """
    Update a note by ID
    ---
    tags:
      - Notes
    parameters:
      - name: note_id
        in: path
        type: integer
        required: true
        description: The ID of the note
      - name: body
        in: body
        required: true
        schema:
          properties:
            title:
              type: string
            content:
              type: string
    responses:
      200:
        description: Note updated successfully
      404:
        description: Note not found
    """
    data = request.get_json()
    for note in notes:
        if note['id'] == note_id:
            if 'title' in data:
                note['title'] = data['title']
            if 'content' in data:
                note['content'] = data['content']
            return jsonify({'message': 'Note updated successfully'})
    return jsonify({'error': 'Note not found'}), 404

# Delete a note
@app.route('/api/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    """
    Delete a note by ID
    ---
    tags:
      - Notes
    parameters:
      - name: note_id
        in: path
        type: integer
        required: true
        description: The ID of the note
    responses:
      200:
        description: Note deleted and IDs updated
    """
    global notes
    notes = [note for note in notes if note['id'] != note_id]
    reindex_notes()
    return jsonify({'message': 'Note deleted and IDs updated successfully'})

if __name__ == '__main__':
    app.run(debug=True)
