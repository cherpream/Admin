import React, { useState, useEffect } from "react";
import "../CSS/UserList.css";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Database/firebase";

function Userlist() {
  const [data, setData] = useState([]);
  //const navigate = useNavigate("");
  const fetchPost = async () => {
    await getDocs(collection(db, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id,
      }));
      setData(newData);
      console.log(data, newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="userlist">
      <div className="topic1">
        <label>ข้อมูลผู้ใช้งาน</label>
      </div>
      <div className="tablecenter">
        <div className="top-table">
          <label>ภาพผู้ใช้งาน</label>
          <label>รหัสประจำตัว</label>
          <label>ชื่อ</label>
          <label>เบอร์โทรศัพท์</label>
          <label>คะแนน</label>
        </div>
        <div className="scroll-container">
          <ul className="list">
            {data?.map((data, i) => (
              <span key={i}>
                <div className="table">
                  <img src={data.pic} />
                  <label>{data.id}</label>
                  <label>{data.name}</label>
                  <label>{data.phone}</label>
                  <label>{data.coin}</label>
                </div>
              </span>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Userlist;
