import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from "./form";
import { BrowserView, MobileView} from 'react-device-detect';
// import ModalView from "./ModalView";
import ModalView1 from "./ModalView1";
import OffCanvas from "./OffCanvas";
// import PositionCanvas from "./PositionCanvas";

//***********get datafrom cookie **********************************/
const getCookies = ()=>{
  const detail = document.cookie
  if(detail){
      const cookiedata = JSON.parse(detail.split("=")[1]);
  return cookiedata
  }
}

//***************************getitem from Storages *************************/

const getLocalItems = () => {
  let allData = []
const localData = localStorage.getItem("UserDetail");
const sessionData = sessionStorage.getItem('UserDetail')
const cookiedata = getCookies()
// console.log("seesion", sessionData)
if (localData) {
    allData = [...allData, ...JSON.parse(localData)];
   if (sessionData) {
    // console.log('sessionData')
  allData = [...allData, ...JSON.parse(sessionData)];
  if(cookiedata){
    allData = [...allData, ...cookiedata];
  }}}
return allData
};

function Hookcounter() {
  let allRollNo = []
  const initialValue = {
    uname: "",
    roll: "",
    subject: "",
    select: "",
  };
  const [userDetail, setUserDetail] = useState(initialValue);
  const [userData, setUserData] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditData, setIsEditData] = useState(null);
  const [toggleEdit,setToggleEdit] = useState(false)

  const[modalOpen, setModalOpen] = useState({show:false,id:''})
  const handlermodal = () =>{
      setModalOpen(prev=>({...prev,show:!prev.show}))
  }
  // const [modalOpen, setModalOpen] = useState(false);
  const { uname, roll, subject, select } = userDetail;


  useEffect(() => {
    if(userData.length > -1){
  const localData = userData.filter((id)=> id.name.select === 'Local Storage')
  const sessionData = userData.filter((id)=> id.name.select === 'Session Storage')
  localStorage.setItem("UserDetail",JSON.stringify(localData))
  sessionStorage.setItem("UserDetail",JSON.stringify(sessionData))
  setCookies(userData);
  }}, [userData]);

//**************************set data in cookies Storage********************** */
  const setCookies=(userData)=>{
    let cookieData = userData.filter((id) => id.name.select === "Cookies Storage")
    let setCookie = JSON.stringify(cookieData);
    document.cookie = `user=` + setCookie;
    }
//***************************submit data in the storage */
  const submitHandler = (e) => {
    e.preventDefault();
    allRollNo = userData?.map((elem) => elem.name.roll)
    const isRollno = allRollNo.includes(roll)
    if(isRollno && !toggleEdit){
      toast.error('Roll already exist',{
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    if (!uname || !roll || !subject || !select) {
      toast.error("Fill The above data", {
        position: toast.POSITION.TOP_CENTER
      });
      
    } else if (userDetail && !toggleSubmit) {
      setUserData(
        userData.map((elem) => {
          if (elem.id === isEditData) {
            return { ...elem, name: userDetail };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setUserDetail(initialValue);
      setIsEditData(null);
    } else {
      const allUserDetail = {
        id: new Date().getTime().toString(),
        name: userDetail,
      };
      setUserData([...userData, allUserDetail]);
      setUserDetail(initialValue);
      
    }
    // console.log(userDetail);
  };
  // ************ onchange handler function *********************** */
  const handleUserDetail = (e) => {
    setUserDetail((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // console.log(userDetail)
  // *******************DELETE DATA***************//

  const deleteData = (index) => {
    const updatedData = userData.filter((elem) => {
      return index !== elem.id;
    });
    setUserData(updatedData);
    setToggleSubmit(true);
    setUserDetail(initialValue);

    // setModalOpen(true)
  };

  // ****************************** edit data *****************************************************

  const editData = (id) => {
    let newEditData = userData.find((elem) => {
      return elem.id === id;
    });
    setToggleEdit(true)
    setToggleSubmit(false);
    setUserDetail(newEditData.name);
    setIsEditData(id);
  };

  //useEffect hook add data to local storage

  return (
    <>
    <div>
      <Form  setModalOpen={setModalOpen} editData={editData}   
      handleUserDetail={handleUserDetail} submitHandler={submitHandler}
      userData={userData} uname={uname} roll={roll}
      select={select} subject={subject}
      toggleSubmit={toggleSubmit} />
      {/* <ModalView1 handlermodal={handlermodal} deleteData={deleteData} modalOpen={modalOpen}/> */}
      {/* <OffCanvas handlermodal={handlermodal} deleteData={deleteData} modalOpen={modalOpen}/> */}
      {/* <PositionCanvas/> */}
      <BrowserView>
      <ModalView1 handlermodal={handlermodal} deleteData={deleteData} modalOpen={modalOpen}/>
      </BrowserView>
<MobileView>
<OffCanvas handlermodal={handlermodal} deleteData={deleteData} modalOpen={modalOpen}/>
</MobileView>
    </div>
    <ToastContainer/>
    </>
    
    
  );
}

export default Hookcounter;
