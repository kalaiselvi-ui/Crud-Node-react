import React from 'react'
import { Button } from 'react-bootstrap'

const ButtonC = ({ color, bgColor, text, onClick }) => {
    return (
        <div className=''>
            <Button style={{
                color: color || '#fff',
                backgroundColor: bgColor || "#007bff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px"
            }} onClick={onClick}>{text}</Button>
        </div>
    )
}

export default ButtonC