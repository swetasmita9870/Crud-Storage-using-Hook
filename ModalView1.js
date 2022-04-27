import React from 'react'
import { Button, Modal } from 'react-bootstrap'
const ModalView1 = ({ props,deleteData, handlermodal, modalOpen }) => {
    const handleDelete = () => {
        deleteData(modalOpen.id)
        handlermodal()
    }

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalOpen.show} onHide={handlermodal}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Are Sure Want To Delete ?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="warning" onClick={handlermodal}>Close</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
            {/* <Modal show={modalOpen.show}  onHide={handlermodal}>
            <Modal.Header>Are You Sure Want To Delete!</Modal.Header>
            <Modal.Footer>
                <Button variant="warning" onClick={handlermodal}>Close</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
        </Modal> */}
        </div>
    )
}

export default ModalView1
