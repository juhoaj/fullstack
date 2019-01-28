import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad}) => {

    let total = good + neutral + bad
    let keskiarvo = (good-bad) / total
    let positiivisia = good / total * 100

    if (total === 0) {
        return (
            <p>Ei yhtään palautetta annettu</p>
        )
    }

    return (
        
        <div>
            <table>
                <tbody>
                    <Statistic name='hyvä' value={good}/>
                    <Statistic name='neutraali' value={neutral}/>
                    <Statistic name='huono' value={bad}/>
                    <Statistic name='yhteensä' value={total}/>
                    <Statistic name='keskiarvo' value={keskiarvo}/>
                    <Statistic name='positiivisia' value={positiivisia}/>
                </tbody>
            </table>
        </div>
    )
}

const Statistic = ({name, value}) => {
    return (
        <tr>
            <td>{name}:&nbsp;</td>
            <td>{value}</td>
        </tr>
    )
}

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
      {text}
    </button>
  )


const App = () => {
  // tallenna napit omaan tilaansa
  let [good, setGood] = useState(0)
  let [neutral, setNeutral] = useState(0)
  let [bad, setBad] = useState(0)

  return (
    <div>
        <h3>Anna palautetta</h3>
        <Button onClick={() => setGood(good + 1)} text='hyvä'/>
        <Button onClick={() => setNeutral(neutral + 1)} text='neutraali'/>
        <Button onClick={() => setBad(bad + 1)} text='huono'/>

        <h3>Statistiikka</h3>
        <Statistics 
            good={good}
            neutral={neutral}
            bad={bad}
        />     
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)