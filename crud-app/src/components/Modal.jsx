import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ButtonC from './Button';

const ModalC = ({ setShowModal, selectedStudent, handleSave }) => {

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        city: ''
    })

    useEffect(() => {
        if (selectedStudent) {
            setFormData(selectedStudent)
        } else {
            setFormData({ name: '', age: '', city: '' })
        }
    }, [selectedStudent])
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })

    }

    const handleSubmit = () => {
        handleSave(formData);
        setShowModal(false);
    }
    return (
        <div>
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
            >
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedStudent ? 'Update User' : 'Add User'}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder="Name"
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Age"
                                    name='age'
                                    value={formData.age}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="city"
                                    name='city'
                                    placeholder="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Form.Group>

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <ButtonC color={'#fff'} bgColor={'green'} text={selectedStudent ? 'Update User' : 'Save'} onClick={handleSubmit}></ButtonC>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </div>
    )
}

export default ModalC