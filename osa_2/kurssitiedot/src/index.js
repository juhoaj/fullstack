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
        <Total parts = {course.parts}/>
    </div>
)


const Header = ({title}) => (
    <h1>{title}</h1>
)

const Parts = ({parts}) => parts.map(part =>
    <p key={part.id}>
        {part.name} {part.exercises}
    </p>
)


const Total = ({parts}) => {
    const summa = parts.reduce((a, b) => a + b.exercises, 0);
    console.log(summa)
    return (
        <p>yhteensä {summa} tehtävää</p>
    )
}




ReactDOM.render(<App />, document.getElementById('root'))