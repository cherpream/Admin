import React, { useState, useEffect } from "react";
import "../CSS/Reward.css";
import Navbar2 from "../Component/Navbar";
import Footer from "../Component/Footer";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, storage } from "../Database/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth } from "../Database/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Rewardlist from "../Component/RewardList";

function RewardManager() {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [rewname, SetRewname] = useState("");
  const [rewcoin, SetRewcoin] = useState("");
  const [numrew, SetNumrew] = useState("");
  const navigate = useNavigate("");
  // const [reward, setReward] = useState([]);
  const [file, setFile] = useState([]);
  const [urlimg, SetUrl] = useState([]);
  const [data, setData] = useState([]);

  /*const fetchPost = async () => {
    await getDocs(collection(db, "Reward")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(newData);
      console.log(data, newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);*/

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
    const storageRef = ref(storage, `${file.name}`);
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
      const RewardRef = await addDoc(collection(db, "Reward"), {
        Name: rewname,
        Coin: rewcoin,
        NumOfTime: numrew,
        urlimg,
      });
      alert("Add successfully");
      SetRewname("");
      SetRewcoin("");
      SetNumrew("");
      SetUrl("");
      console.log("doc Id", RewardRef.id);
      window.location.reload(false);
    } catch (e) {
      console.error("error adding", e);
    }
  };

  return (
    <div>
      <Navbar2 />
      <div className="BG-1">
        <div className="Container-2">
          <div className="BOX-FORM1">
            <div className="TOPIC-FORM">Add Reward</div>
            <div className="COLUMN1">
              <div className="SUB-TOPIC">ชื่อของรางวัล</div>
              <input
                type="text"
                placeholder="กรอกชื่อของรางวัล"
                value={rewname}
                onChange={(e) => SetRewname(e.target.value)}
              ></input>
            </div>
            <div className="COLUMN2"></div>
            <div className="COLUMN1">
              <div className="SUB-TOPIC">ภาพของรางวัล</div>
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
              <div className="SUB-TOPIC">แต้มแลกรางวัล</div>
              <input
                type="text"
                placeholder="กรอกแต้มแลกรางวัล (ตัวเลข)"
                value={rewcoin}
                onChange={(e) => SetRewcoin(e.target.value)}
              ></input>
              <div className="SUB-TOPIC">จำนวนของรางวัล</div>
              <input
                type="text"
                placeholder="กรอกจำนวนของรางวัล (ตัวเลข)"
                value={numrew}
                onChange={(e) => SetNumrew(e.target.value)}
              ></input>
            </div>
            <button className="ADD-BUTTON" onClick={add}>
              ADD REWARD
            </button>
          </div>
          <div className="Container-3">
            <div className="Container-4">
              <div className="BOX-ShowDatas">
                <div className="TOPIC-FORM">Reward Management</div>
                <Rewardlist />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RewardManager;
