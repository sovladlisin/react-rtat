import React from 'react'

const alertStyle = {
    backgroundColor: '#151515',
    color: 'black',
    padding: '10px',
    textTransform: 'uppercase',
    borderRadius: '0px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
    fontFamily: 'Arial',
    width: '300px',
    boxSizing: 'border-box'
}

const buttonStyle = {
    marginLeft: '20px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#FFFFFF'
}

const CustomAlert = ({ message, options, style, close }) => {
    return (
        <div className="alert">
            {options.type === 'info' && <div><i class="fas fa-info"></i></div>}
            {options.type === 'success' && <div><i class="fas fa-check-circle"></i></div>}
            {options.type === 'error' && <div><i class="fas fa-exclamation-triangle"></i></div>}
            <p>{message}</p>
            <button onClick={close}>
                <div><i class="fas fa-times"></i></div>
            </button>
        </div>
    )
}

export default CustomAlert