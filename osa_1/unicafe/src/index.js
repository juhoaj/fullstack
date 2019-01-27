import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {

}

const Statistic = (props) => {

}

const Button = (props) => {
    
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <h3>Anna palautetta</h3>
        <button onClick={() => setGood(good + 1)}>hyvä</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutraali</button>
        <button onClick={() => setBad(bad + 1)}>huono</button>
        <h3>Statistiikka</h3>
        <tr>
            <td>hyvä: </td>
            <td>{good}</td>
        </tr>
        <tr>
            <td>neutraali: </td>
            <td>{neutral}</td>
        </tr>
        <tr>
            <td>huono: </td>
            <td>{bad}</td>
        </tr>      
        <tr>
            <td>yhteensä: </td>
            <td>{good+neutral+bad}</td>
        </tr>    
        <tr>
            <td>keskiarvo: </td>
            <td>{((good*1)+(bad*-1))/(good+neutral+bad)}</td>
        </tr>  
        <tr>
            <td>positiivisia: </td>
            <td>{good/(good+neutral+bad)*100}%</td>
        </tr>     
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)