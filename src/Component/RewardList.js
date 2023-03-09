import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Database/firebase";
import "../CSS/RewardList.css";
import { useNavigate } from "react-router-dom";

function Rewardlist() {
  const [data, setData] = useState([]);
  const navigate = useNavigate("");
  const fetchPost = async () => {
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
  }, []);

  const Deleteitem = async (id) => {
    const reference = doc(db, "Reward", id);
    await deleteDoc(reference);
    alert("Document successfully deleted!");
    window.location.reload(false);
  };

  /* const Deleteitem = (id) => {
    db.collection("Reward")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });  
      console.log(id);
    await deleteDoc(collection(db, "Reward", `${id}`));
  };*/

  return (
    <div>
      <div className="scroll-container">
        <ul className="list">
          {data?.map((data, i) => (
            <span key={i}>
              <div className="item-box">
                <img src={data.urlimg} />
                <div className="Column-contain">
                  <label>
                    ชื่อของรางวัล:{data.uid} {data.Name}
                  </label>
                  <label>แต้มแลกของรางวัล: {data.Coin}</label>
                  <label>จำนวนของรางวัล: {data.NumOfTime}</label>
                </div>
                <div className="icon1">
                  <img
                    src="/images/icons/remove.png"
                    alt=""
                    onClick={() => Deleteitem(data.id)}
                  />
                </div>
              </div>
            </span>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Rewardlist;
