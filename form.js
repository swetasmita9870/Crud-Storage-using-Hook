import React from 'react'
import Card from './Card'
import formlogo from './form.png'

const Form = ({setModalOpen,editData,deleteData,handleUserDetail,submitHandler,userData,uname,roll,select,subject,toggleSubmit})=> {
    
  return (
    <div>
      <div>
        <h1 className="heading">STORGE VALIDATION FORM</h1>
          <div className='LogoBox'>
          <img className='logo' src={formlogo} alt="form"/>
          </div>
        <div className="container">
          <form autoComplete="off">
            <div className="inputfield">
              <input
                value={uname}
                name="uname"
                onChange={handleUserDetail}
                placeholder="Enter Your Name ✍️"
                type="text"
              />
            </div>
            <div className="inputfield">
              <input
                value={roll}
                name="roll"
                onChange={handleUserDetail}
                placeholder="Enter RollNumber ✍️"
                type="number"
              />
            </div>
            <div className="inputfield">
              <input
                value={subject}
                name="subject"
                onChange={handleUserDetail}
                placeholder="Enter Subject✍️"
                type="text"
              />
            </div>
            <div className="inputfield">
              <select value={select}  name="select" onChange={handleUserDetail}>
                <option>Select Option</option>
                <option >Local Storage</option>
                <option >Session Storage</option>
                <option >Cookies Storage</option>
              </select>
            </div>
            <div className="inputfield">
              {toggleSubmit ? (
                <button className="submit" onClick={submitHandler}>
                  Submit
                </button>
              ) : (
                <button className="save" onClick={submitHandler}>
                  Save
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="showItems">
          {userData?.map((elem) => {
            return <Card key={elem.id} setModalOpen={setModalOpen} elem={elem} userData={userData} editData={editData} deleteData={deleteData}/>
          })}
        </div>
      </div>
    </div>
  )
}

export default Form
