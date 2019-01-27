import React from 'react'
import ReactDOM from 'react-dom'



const Hello = (props) => {
    const { name, age } = props
    const bornYear = () => new Date().getFullYear() - age
  
    return (
      <div>
        <p>Hello {name}, you are {props.age} years old</p>
        <p>So you were probably born {bornYear()}</p>
      </div>
    )
  }

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
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
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
    }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

/*
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
*/

ReactDOM.render(<App />, document.getElementById('root'))