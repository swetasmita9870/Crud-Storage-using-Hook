import React from 'react'

const Card = ({setModalOpen,elem,editData}) => {
  return (
      
    <div className="eachItems">
      <p className='innerdata'>Name: {elem.name.uname}</p>
      <p className='innerdata'>RollNumber: {elem.name.roll}</p>
      <p className='innerdata'>Subject: {elem.name.subject}</p>
      <p className='innerdata'>Storage: {elem.name.select}</p>
      <div className="Action">
        <button
          className="edit"
          title="Edit Item"
          onClick={() => editData(elem.id)}
        >
          Edit
        </button>
        <button
          className="delete"
          title="Delete Item"
          onClick={() => setModalOpen({show:true,id:elem.id})}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card
