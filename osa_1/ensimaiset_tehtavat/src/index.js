import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <p> {props.part} {props.exercises} </p>
    )
}

const Content = (props) => {
    return (
        console.log(props, "jee"),
        <div>
            <Part part={props.part1} exercises={props.exercises1} />
            <Part part={props.part2} exercises={props.exercises2} />
            <Part part={props.part3} exercises={props.exercises3} />
        </div>
    )
}

const Total = (props) => {
    return (
        <p>yhteensä {props.sum} tehtävää</p>
    )
}

const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const part1 = {
        name: 'Reactin perusteet',
        exercises: 10
    }
    const part2 = {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
    }
    const part3 = {
        name: 'Komponenttien tila',
        exercises: 14
    }

    return (
        <div>
            <Header course={course}/>
            <Content 
                part1={part1.name}  
                exercises1={part1.exercises}  
                part2={part2.name}  
                exercises2={part2.exercises}  
                part3={part3.name}  
                exercises3={part3.exercises}  
            />
            <Total sum ={part1.exercises + part2.exercises + part3.exercises} />
        </div>
    )
}

/*
const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const part1 = 'Reactin perusteet'
    const exercises1 = 10
    const part2 = 'Tiedonvälitys propseilla'
    const exercises2 = 7
    const part3 = 'Komponenttien tila'
    const exercises3 = 14

    return (
        <div>
            <Header course={course}/>
            <Content 
                part1={part1}  
                exercises1={exercises1}  
                part2={part2}  
                exercises2={exercises2}  
                part3={part3}  
                exercises3={exercises3}  
            />
            <Total sum ={exercises1 + exercises2 + exercises3} />
        </div>
    )
}
*/

ReactDOM.render(<App />, document.getElementById('root'))