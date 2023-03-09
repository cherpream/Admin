import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Database/firebase";
import "../CSS/ReportList.css";
import Radio from "@mui/material/Radio";
import { red } from "@mui/material/colors";

function ReportList() {
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("a");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  //const navigate = useNavigate("");
  const fetchPost = async () => {
    await getDocs(collection(db, "Report")).then((querySnapshot) => {
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
    const reference = doc(db, "Mission", id);
    await deleteDoc(reference);
    alert("Document successfully deleted!");
    window.location.reload(false);
  };
  return (
    <div>
      <div className="topic3">
        <label>รายงานปัญหา</label>
      </div>
      <div className="scroll-container3">
        <ul className="list3">
          {data?.map((data, i) => (
            <span key={i}>
              <div className="item-box3">
                <h2>1</h2>
                <div className="Column-contain3">
                  <div className="topic-user3">
                    รายงานปัญหาผู้ใช้งาน: {data.userid} - {data.name}
                  </div>
                  <label>รายละเอียดปัญหา: {data.descript}</label>
                  <label>วันที่รายงาน: {data.Date}</label>
                </div>
                <div className="icon13">
                  <Radio
                    {...controlProps("a")}
                    sx={{
                      color: red[800],
                      "&.Mui-checked": {
                        color: red[600],
                      },
                    }}
                  />
                  <Radio {...controlProps("b")} color="warning" />
                  <Radio {...controlProps("c")} color="success" />
                </div>
              </div>
            </span>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ReportList;
