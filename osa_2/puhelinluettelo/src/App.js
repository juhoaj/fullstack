import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import personService from './services/persons'

const App = () => {

    const [persons, setPersons] = useState([])
    const [search, setSearch] = useState('')

    const hook = () => {
        console.log('effect')
        personService
            .getAll()
            .then(initialPersons => {
                // console.log('promise fulfilled')
                setPersons(initialPersons)
            })
    }

    useEffect(hook, [])



    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setSearch(event.target.value)
    }



    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <Input
                value={search}
                onChange={handleSearchChange}
            />
            <h3>lisää uusi</h3>
            <AddPerson 
                persons={persons} 
                setPersons={setPersons}
            />
            <h2>Numerot</h2>
            <Persons persons={persons.filter(elementti => elementti.name.toUpperCase().includes(search.toUpperCase()))} />
        </div>
    )
}

const Input = ({ value, onChange }) => (
    <input
        value={value}
        onChange={onChange}
    />
)

const Persons = ({ persons }) => persons.map(person =>
    <Person
        key={person.id}
        person={person}
    />
)

const AddPerson = ({persons, setPersons}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (event) => {
        // console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        // console.log(event.target.value)
        setNewNumber(event.target.value)
    }
    const addEvent = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
            // id: persons.length + 1,
        }

        persons.filter(elementti => elementti.name === newName).length > 0
            ? window.alert(`${newName} on jo luettelossa`)
            : personService
                .create(personObject)
                .then(returnedNote => {
                    setPersons(persons.concat(returnedNote))
                })
        setNewName('')
        setNewNumber('')
    }

    return (
        <form onSubmit={addEvent}>
            <div>
                <label>nimi:</label>
                <Input
                    value={newName}
                    onChange={handleNameChange}
                />
                <br />
                <label>numero:</label>
                <Input
                    value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

const DeletePerson = ({id}) => {
    const deleteEvent = (event) => {
        event.preventDefault()
        if (window.confirm("Poistetaanko")) {
            personService
                .remove(id)
                .then(
                    // setPersons(persons.splice(id, 1))
                )
        }
    }
    return (
        <button onClick={deleteEvent}>poista</button>
    )
}

const Person = ({ person }) => {
    
    return (
        <p>
            {person.name}, {person.number} <DeletePerson id={person.id}/>
        </p>
    )
    // 
}



export default App