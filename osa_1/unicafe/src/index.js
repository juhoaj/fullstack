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
        <button onClick={() => setGood(good + 1)}>kasvata</button>
        <button onClick={() => setNeutral(neutral + 1)}>kasvata</button>
        <button onClick={() => setBad(bad + 1)}>kasvata</button>
        <h3>Statistiikka</h3>
        <p>hyvä: {good}</p>
        <p>neutraali: {neutral}</p>
        <p>huono: {bad}</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)