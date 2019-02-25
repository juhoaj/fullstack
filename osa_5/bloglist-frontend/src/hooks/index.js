import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }


    function reset() {
        setValue('')
    }

    return {
        type,
        value,
        onChange,
        reset
    }
}