import React from 'react'
import ReactDOM from 'react-dom'


const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                exercises: 10,
                id: 1
            },
            {
                name: 'Tiedonvälitys propseilla',
                exercises: 7,
                id: 2
            },
            {
                name: 'Komponenttien tila',
                exercises: 14,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

const Course = ({course}) => (
    <div>
        {console.log('name', course.name)}
        <Header title = {course.name}/>
        <Parts parts ={course.parts}/>
    </div>
)


const Header = (props) => (
    <h1>{props.title}</h1>
)

const Parts = ({parts}) => parts.map(part =>
        <p key={part.id}>
            {part.name} {part.exercises}

        </p>
    
    
    )

/*
const Total = (props) => {
    return (
        <p>yhteensä {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} tehtävää</p>
    )
}
*/



ReactDOM.render(<App />, document.getElementById('root'))