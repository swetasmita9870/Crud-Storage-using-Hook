import React from 'react'
import {Button, Offcanvas } from 'react-bootstrap';
// import PositionCanvas from './PositionCanvas';
const OffCanvas = ({ props,deleteData, handlermodal, modalOpen }) => {
    const handleDelete = () => {
        deleteData(modalOpen.id)
        handlermodal()
    } 
    return (
        <div>
            <Offcanvas placement='bottom' show={modalOpen.show} onHide={handlermodal} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Are you sure Want to Delete?</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <p>If You Click On Delete The Data will Delete.</p>
               <div className='canvas-button'>
               <Button variant="warning" onClick={handlermodal}>Close</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
               </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default OffCanvas
