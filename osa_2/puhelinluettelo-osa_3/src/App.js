import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import personService from './services/persons'
import './App.css';

const App = () => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [persons, setPersons] = useState([])
    const [search, setSearch] = useState('')
    const [message, setMessage] = useState(null)


    const handleSearchChange = (event) => {
        // console.log(event.target.value)
        setSearch(event.target.value)
    }

    const handleNameChange = (event) => {
        // console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        // console.log(event.target.value)
        setNewNumber(event.target.value)
    }



    const hook = () => {
        // console.log('effect')
        personService
            .getAll()
            .then(initialPersons => {
                // console.log('promise fulfilled')
                setPersons(initialPersons)
            })
    }
    useEffect(hook, [])



    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
            // id: persons.length + 1,
        }
        if (persons.filter(elementti => elementti.name === newName).length > 0) {
            window.alert(`${newName} on jo luettelossa`)
        } else {
            personService
                .create(personObject)
                .then(returnedNote => {
                    setPersons(persons.concat(returnedNote))
                })
            setMessage(
                `${newName} lisätty`
            )
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
        setNewName('')
        setNewNumber('')
    }

    const deletePerson = (id, name) => {
        if (window.confirm("Poistetaanko " + name)) {
            personService
                .remove(id)
                .then(
                    // setPersons(persons.splice(id, 1))
                    hook
                )
                setMessage(
                    `${name} poistettu`
                )
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
        }
    }

    return (
        <div>
            <Notification message={message} />
            <h2>Puhelinluettelo</h2>
            <Input
                value={search}
                onChange={handleSearchChange}
                label='rajaa näytettäviä'
            />
            <h2>Numerot</h2>
            <h3>lisää uusi</h3>
            <AddPerson
                persons={persons}
                setPersons={setPersons}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
                addPerson={addPerson}

            />

            <Persons
                persons={persons.filter(elementti => elementti.name.toUpperCase().includes(search.toUpperCase()))}
                deletePerson={deletePerson}
            />
        </div>
    )
}

const Input = ({ value, onChange, label }) => (
    <div>
        <label>{label} </label>
        <input
            value={value}
            onChange={onChange}
        />
    </div>

)

const Persons = ({ persons, deletePerson }) => persons.map(person =>
    <Person
        key={person.id}
        person={person}
        deletePerson={deletePerson}
    />
)

const AddPerson = ({ newName, handleNameChange, newNumber, handleNumberChange, addPerson }) => {
    return (
        <form onSubmit={addPerson}>
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


const Person = ({ person, deletePerson }) => {

    const deleteEvent = (event) => {
        event.preventDefault()
        deletePerson(person.id, person.name)
    }

    return (
        <p>
            {person.name}, {person.number} <button onClick={deleteEvent}>poista</button>
        </p>
    )

}

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="notification">
            {message}
        </div>
    )
}


export default App