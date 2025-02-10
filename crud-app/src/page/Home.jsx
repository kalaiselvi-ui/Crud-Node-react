import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import ButtonC from '../components/Button'

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [students, setStudents] = useState([])
    const [filteredStudents, setFilteredStudents] = useState(null)
    const [studentData, setStudentData] = useState({ name: "", age: "", city: "" })


    const getAllStudents = async () => {
        await axios.get('http://localhost:8000/student').then((res) => {
            setStudents(res.data);
            setFilteredStudents(res.data)
        })
    }

    useEffect(() => {
        getAllStudents();
    }, []);

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filteredStudents = students.filter((student) => student.name.toLowerCase().includes(searchText) || student.city.toLowerCase().includes(searchText));
        setFilteredStudents(filteredStudents);
    }

    const handleAdd = async () => {
        setStudentData({ name: "", age: "", city: "" })
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false);
        getAllStudents();
    }

    const handleData = (e) => {
        const { name, value } = e.target;
        setStudentData({
            ...studentData,
            [name]: value
        })
    }


    const handleEdit = (student) => {
        setShowModal(true);
        setStudentData(student);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (studentData.id) {
            await axios.patch(`http://localhost:8000/student/${studentData.id}`, studentData).then((res) => {
                console.log(res);
            })
        } else {
            await axios.post("http://localhost:8000/student", studentData).then((res) => {
                console.log(res);
                setStudentData(res);
            })
        }
        setShowModal(false);
        setStudentData({ name: "", age: "", city: "" })
        getAllStudents();
    }

    const handleDelete = async (id) => {
        const isConfirmaed = window.confirm("Are you sure you want to delete student?")
        if (isConfirmaed) {
            await axios.delete(`http://localhost:8000/student/${id}`).then((res) => {
                setStudents(res.data)
                setFilteredStudents(res.data);
            })
        }

    }
    return (
        <>
            <div className='crud_app'>
                <h1>CRUD Application with React and Node.js</h1>
                <hr />
                <div className='search_field'>
                    <input type="search" placeholder='Search Text Here' onChange={handleSearch} />
                    <Button onClick={handleAdd}> Add Record</Button>
                </div>
                <form className='student_form'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>City</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredStudents && filteredStudents.map((student, index) => (
                                    <tr key={student.id}>
                                        <td>{index + 1}</td>
                                        <td>{student.name}</td>
                                        <td>{student.age}</td>
                                        <td>{student.city}</td>
                                        <td style={{ display: 'flex', justifyContent: 'center' }}><ButtonC color={'#fff'} bgColor={'blue'} text={'Edit'} onClick={() => handleEdit(student)} /></td>
                                        <td><ButtonC color={'#fff'} bgColor={'red'} text={'Delete'} onClick={() => handleDelete(student.id)} /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </form>

            </div>

            {showModal && (
                <div className='modal'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h2>{studentData ? 'Update Record' : 'User Record'}</h2>
                            <span className='close' onClick={handleClose}>&times;</span>
                        </div>
                        <div className='input-group'>
                            <label htmlFor="name">Name</label>
                            <input type="text" placeholder='Name' id='name' name='name' value={studentData.name} onChange={handleData} />
                        </div>
                        <div className='input-group'>
                            <label htmlFor="age">Age</label>
                            <input type="number" placeholder='Age' id='age' name='age' value={studentData.age} onChange={handleData} />
                        </div>
                        <div className='input-group'>
                            <label htmlFor="city">City</label>
                            <input type="text" placeholder='City' id='city' name='city' value={studentData.city} onChange={handleData} />
                        </div>
                        <ButtonC color={'white'} bgColor={'green'} text={studentData ? 'Update User' : 'Add User'} onClick={handleSubmit} />

                    </div>
                </div>
            )}

        </>

    )
}

export default Home