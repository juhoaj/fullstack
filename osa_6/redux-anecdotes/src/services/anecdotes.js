import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getOne = async (id) => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async content => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async (id, content, votes) => {
    console.log('------------------------',id, content, votes)
    const urli = baseUrl.concat('/', id) 
    console.log('------------------------',urli)
    const response = await axios.put(id, {id:id, content:content, votes:votes})
    return response.data
}



export default { getAll, createNew, update, getOne }