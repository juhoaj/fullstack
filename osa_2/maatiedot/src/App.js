import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'

const App = () => {
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])
    /*
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    */
    

   const hook = () => {
    // console.log('effect')
    axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            // console.log('promise fulfilled')
            setCountries(response.data)
        })
    }

    useEffect(hook, [])


    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setSearch(event.target.value)
    }
    /*
    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
        }

        persons.filter(elementti => elementti.name === newName).length > 0
            ? window.alert(`${newName} on jo luettelossa`)
            : setPersons(persons.concat(personObject))

        setNewName('')
        setNewNumber('')
    }
    */

    return (
        <div>
            <h2>maat</h2>
            <Input
                label='find countries'
                value={search}
                onChange={handleSearchChange}
            />
            <SearchResults
                results={countries.filter(e => e.name.toUpperCase().includes(search.toUpperCase()))}
            />

            
        </div>
    )
}


const SearchResults = ({results}) => {
    if (results.length === 0) {
        return (
            <p>No matches found</p>
        )
    } else if (results.length > 10) {
        return (
            <p>Too many matches, please spacify</p>
        )
    } else {
        return (
            <CountryList
                countries = {results}
            />
        )
    }
}

const CountryList = ({ countries }) => {
    if (countries.length === 1) {
        return (
            countries.map(country =>
                <Country
                    key={country.numericCode}
                    country={country}
                />
            )
        )
    } else {
        return (
            countries.map(country =>
                <CountryRow
                    key={country.numericCode}
                    country={country}
                />
            )
        )
    }
}

const CountryRow = ({country}) => (
    <p>{country.name}</p>
)

const Country = ({country}) => (
    <div key={country.numericCode}>
        <h2>{country.name}</h2>
        <p>capital: {country.capital}<br/>
        population: {country.population}</p>
        <h3>languages</h3>
        <List content={country.languages}/>
        <img src={country.flag} className="flag" alt="flag" />
    </div>
)

const Input = ({ value, onChange, label }) => (
    <div>
        <label>{label} </label>
        <input
            label={label}
            value={value}
            onChange={onChange}
        />
    </div>
)


const List = ({ content }) => (
    <ul>
        {content.map(item =>
            <ListItem
                content={item.name}
            />
            
        )}
    </ul>
)

const ListItem = ({content}) => (
    <li>{content}</li>
    
)

export default App