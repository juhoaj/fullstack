import React from 'react';
import { connect } from 'react-redux'

const Notification = ( props ) => {
    const styleShow = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    const styleHidden = {
        display: 'none'
    }
    return (
        <div style={ props.notification ? styleShow : styleHidden }>
            {props.notification}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification