import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas',
          number: '123',
          id: 1
        }
    ])
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

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
        }

        /*
        console.log(persons.forEach(e => {
            console.log(e.name, 'tallessa')
            e.name === newName
            ? console.log('sama')
            : console.log('ei')
        }))
        */

        persons.filter(elementti => elementti.name === newName).length > 0
            ? window.alert(`${newName} on jo luettelossa`)
            : setPersons(persons.concat(personObject))
        
        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <form onSubmit={addPerson}>
                <div>
                    <label>nimi:</label>
                    <input
                        value={newName}
                        onChange={handleNameChange}
                    />
                    <br/>
                    <label>numero:</label>
                    <input
                        value={newNumber}
                        onChange={handleNumberChange}
                    />
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
            <h2>Numerot</h2>
            <Persons persons={persons}/>
    </div>
    )

}

const Persons = ({ persons }) => persons.map(person =>
    <Person 
        key={person.id}
        person = {person}
    />
)

const Person  = ({ person }) => (
    <p>
        {person.name}, {person.number}
    </p>
)

export default App