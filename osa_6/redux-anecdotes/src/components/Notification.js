import React from 'react';

const Notification = ({ store }) => {
    const styleShow = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    const styleHidden = {
        display: 'none'
    }
    return (
        <div style={ store.getState().notification ? styleShow : styleHidden }>
            {store.getState().notification}
        </div>
    )
}

export default Notification
