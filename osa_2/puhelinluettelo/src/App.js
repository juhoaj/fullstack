import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import personService from './services/persons'
import './App.css';

const App = () => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [persons, setPersons] = useState([])
    const [search, setSearch] = useState('')
    const [message, setMessage] = useState('hep')


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
        }        
        setNewName('')
        setNewNumber('')
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
                hook={hook}
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

const Persons = ({ persons, hook }) => persons.map(person =>
    <Person
        key={person.id}
        person={person}
        hook={hook}
    />
)

const AddPerson = ({persons, newName, handleNameChange, newNumber, handleNumberChange, addPerson}) => {
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

const DeletePerson = ({id, hook}) => {
    const deleteEvent = (event) => {
        event.preventDefault()
        if (window.confirm("Poistetaanko")) {
            personService
                .remove(id)
                .then(
                    // setPersons(persons.splice(id, 1))
                    hook
                )
        }
    }
    return (
        <button onClick={deleteEvent}>poista</button>
    )
}

const Person = ({ person, hook }) => {
    
    return (
        <p>
            {person.name}, {person.number} <DeletePerson id={person.id} hook={hook} />
        </p>
    )
    // 
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