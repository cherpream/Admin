import React, { useState, useEffect } from "react";
import "../CSS/Mission.css";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../Database/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth } from "../Database/firebase";
//import { onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import MissionList from "../Component/MissionList.js";

function Addmission() {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [date, setDate] = useState("");
  const [misname, SetMisname] = useState("");
  const [miscoin, SetMiscoin] = useState("");
  const [nummis, SetNummis] = useState("");
  const navigate = useNavigate("");
  const [file, setFile] = useState([]);
  const [urlimg, SetUrl] = useState([]);
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  function onImageChange(e) {
    setImages([...e.target.files]);
    setFile(e.target.files[0]);
  }

  function handleUpload() {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
    if (!file) {
      alert("Please choose a file first!");
    }
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", () => {
      // download url
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        console.log(url);
        SetUrl(url);
      });
    });
  }

  //เพิ่มข้อมูล
  const add = async (e) => {
    e.preventDefault();
    try {
      const MissionRef = await addDoc(collection(db, "Mission"), {
        Name: misname,
        Coin: miscoin,
        NumOfTime: nummis,
        Date: date,
        urlimg,
      });
      alert("Add successfully");
      SetMisname("");
      SetMiscoin("");
      setDate("");
      SetNummis("");
      SetUrl("");
      /*navigate("/");*/
      console.log("doc Id", MissionRef.id);
      window.location.reload(false);
    } catch (e) {
      console.error("error adding", e);
    }
  };

  //แสดงอีเมลผู้เข้าใช้  const [user, loading, error] = useAuthState(auth);
  const [user] = useAuthState(auth);

  //logout
  function logout() {
    // Perform logout operation, for example by clearing local storage or sending a request to the server
    localStorage.removeItem("token");
    window.location.href = "/";
    alert("Log out successful");
    // eslint-disable-next-line no-unused-vars
  }

  /*useEffect(() => {
  db.collection('Mission').onSnapshot(snapshot => {
    setTodos(snapshot.docs.map(doc => ({id:doc.id, coin:doc.data().coin})))
  })
   
});*/

  return (
    <div>
      <Navbar />
      <div className="BG-1">
        <div className="Container-2">
          <div className="BOX-FORM1">
            <div className="TOPIC-FORM">Add Mission</div>
            <div className="COLUMN1">
              <div className="SUB-TOPIC">ชื่อของภารกิจ</div>
              <input
                type="text"
                placeholder="กรอกชื่อของภารกิจ"
                value={misname}
                onChange={(e) => SetMisname(e.target.value)}
              ></input>
            </div>
            <div className="COLUMN2"></div>
            <div className="COLUMN1">
              <div className="SUB-TOPIC">ภาพภารกิจ</div>
              <div className="form-photo ">
                <div className="ROW2">
                  <input
                    type="file"
                    className="input"
                    onChange={onImageChange}
                    accept="/image/*"
                  />
                  <button className="UPLOAD" onClick={handleUpload}>
                    +
                  </button>
                </div>
                {imageURLs.map((imageSrc) => (
                  <img src={imageSrc} />
                ))}
              </div>
            </div>

            <div className="ROW1">
              <div className="SUB-TOPIC">แต้มที่จะได้รับ</div>
              <input
                type="text"
                placeholder="กรอกแต้มที่จะได้รับ (ตัวเลข)"
                value={miscoin}
                onChange={(e) => SetMiscoin(e.target.value)}
              ></input>
              <div className="SUB-TOPIC">จำนวนครั้งที่ต้องทำ</div>
              <input
                type="text"
                placeholder="กรอกจำนวนครั้งที่ต้องทำ (ตัวเลข)"
                value={nummis}
                onChange={(e) => SetNummis(e.target.value)}
              ></input>
            </div>
            <div className="SUB-TOPIC">วันหมดเขต</div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></input>
            <button className="ADD-BUTTON" onClick={add}>
              ADD MISSION
            </button>
          </div>
          <div className="Container-3">
            <div className="Container-4">
              <div className="BOX-USERNAME">
                <img src="/images/icons/contact.png" alt="" />
                <label>ACCOUNT ADMIN :{user?.email}</label>
              </div>
              <div className="BOX-LOGOUT">
                <button onClick={logout}>
                  <img src="/images/icons/exit.png" alt="" />
                </button>
              </div>
            </div>
            <div className="BOX-ShowData">
              <div className="TOPIC-FORM">Mission Management</div>

              <MissionList />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Addmission;
