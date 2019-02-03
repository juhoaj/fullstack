import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Martti Tienari', number: '040-123456', id: 2 },
        { name: 'Arto Järvinen', number: '040-123456', id: 3 },
        { name: 'Lea Kutvonen', number: '040-123456', id: 4 }
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

    const handleNameChange = (event) => {
        // console.log(event.target.value)
        setNewName(event.target.value)
    } 

    const handleNumberChange = (event) => {
        // console.log(event.target.value)
        setNewNumber(event.target.value)
    } 

    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setSearch(event.target.value)
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
            <Input
                value={search}
                onChange={handleSearchChange}
            />
            <h3>lisää uusi</h3>
            <form onSubmit={addPerson}>
                <div>
                    <label>nimi:</label>
                    <Input
                        value={newName}
                        onChange={handleNameChange}
                    />
                    <br/>
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
            <h2>Numerot</h2>
            <Persons persons={persons.filter(elementti => elementti.name.includes(search))}/>
    </div>
    )

}

const Input = ({value, onChange}) => (
    <input
        value={value}
        onChange={onChange}
    />
)

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