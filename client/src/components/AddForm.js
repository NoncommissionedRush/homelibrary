import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { addBook } from '../actions/bookActions.js';

function AddForm({ addBook }) {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        note: '',
    });

    const { title, author, note } = formData;
    const [error, setError] = useState(false);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        const result = addBook(formData);
        setError(!result);
        setFormData({
            title: '',
            author: '',
            note: '',
        });
    }

    return (
        <Form className="mb-5" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Názov knihy</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Názov knižky sem"
                    value={title}
                    onChange={handleChange}
                    style={error ? { borderColor: '#ff2e2e' } : null}
                />
                {error && (
                    <Form.Text style={{ color: '#ff2e2e' }}>
                        Title is required
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="author">
                <Form.Label>Meno autora</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Meno autora sem"
                    value={author}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="note">
                <Form.Label>Poznámka</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Poznámka sem"
                    value={note}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Uložiť
            </Button>
        </Form>
    );
}

export default connect(null, { addBook })(AddForm);
