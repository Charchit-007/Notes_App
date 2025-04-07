import json
from Notes_app import app  # main Flask app file

def test_create_note():
    tester = app.test_client()
    response = tester.post(
        '/api/notes',
        data=json.dumps({'title': 'Test Note', 'content': 'Hello test'}),
        content_type='application/json'
    )
    assert response.status_code == 201
    assert response.json['title'] == 'Test Note'

def test_get_notes():
    tester = app.test_client()
    response = tester.get('/api/notes')
    assert response.status_code == 200
    assert isinstance(response.json, list)

def test_update_note():
    tester = app.test_client()
    # First create a note
    tester.post('/api/notes', data=json.dumps({
        'title': 'Old Title', 'content': 'Old content'
    }), content_type='application/json')

    # Now update it
    response = tester.put(
        '/api/notes/1',
        data=json.dumps({'title': 'New Title'}),
        content_type='application/json'
    )
    assert response.status_code == 200
    assert b'updated successfully' in response.data

def test_delete_note():
    tester = app.test_client()
    # Create a note to delete
    tester.post('/api/notes', data=json.dumps({
        'title': 'To Delete', 'content': 'Delete me'
    }), content_type='application/json')

    # Delete it
    response = tester.delete('/api/notes/1')
    assert response.status_code == 200
    assert b'deleted' in response.data
