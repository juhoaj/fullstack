import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas',
         id: 1
        }
    ])
    const [newName, setNewName] = useState('')

    const handlePersonChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    } 

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            id: persons.length + 1,
        }

        setPersons(persons.concat(personObject))
        setNewName('')
    }

    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <form onSubmit={addPerson}>
                <div>
                    nimi:
                    <input
                        value={newName}
                        onChange={handlePersonChange}
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
        {person.name}
    </p>
)

export default App