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
            <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
            <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
            <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
        </div>
    )
}

const Total = (props) => {
    return (
        <p>yhteensä {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} tehtävää</p>
    )
}

const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const parts = [
        {
            name: 'Reactin perusteet',
            exercises: 10
        },
        {
            name: 'Tiedonvälitys propseilla',
            exercises: 7
        },
        {
            name: 'Komponenttien tila',
            exercises: 14
        }
    ]

    return (
        <div>
            <Header course={course}/>
            <Content parts ={parts} />
            <Total parts ={parts} />
      </div>
    )
}

/*
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
*/


ReactDOM.render(<App />, document.getElementById('root'))