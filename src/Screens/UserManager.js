import React, { useEffect } from "react";
import "../CSS/User.css";
import Navbar4 from "../Component/Navbar3";
import Footer from "../Component/Footer";
import Userlist from "../Component/Userlist";
import RedeemList from "../Component/RedeemList";
import ReportList from "../Component/ReportList";
import $ from "jquery";

function UserManager() {
  function animation() {
    const btns = document.querySelectorAll("[data-target-tab]");

    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btns.forEach((btn) => btn.classList.remove("active"));
        const items = document.querySelectorAll(".item");
        items.forEach((item) => item.classList.remove("active"));
        btn.classList.add("active");
        document.querySelector(btn.dataset.targetTab).classList.add("active");
      });
    });
  }

  useEffect(() => {
    animation();
    $(window).on("resize", function () {
      setTimeout(function () {
        animation();
      }, 500);
    });
  }, []);
  return (
    <div>
      <Navbar4 />
      <div className="bg-user">
        <div className="vertical-tab">
          <div className="row">
            <div className="col-3">
              <h3>MENU</h3>
              <div className="miniline"></div>
              <button className="btn" data-target-tab="#html">
                ข้อมูลผู้ใช้งาน
              </button>
              <button className="btn active" data-target-tab="#css">
                คำขอแลกของรางวัล
              </button>
              <button className="btn" data-target-tab="#js">
                รายงานปัญหา
              </button>
            </div>
          </div>
          <div className="Showpage">
            <div className="col-9">
              <div className="item" id="html">
                <h3>1</h3>
                <Userlist />
              </div>
              <div className="item active" id="css">
                <h3>2</h3>
                <RedeemList />
              </div>
              <div className="item" id="js">
                <h3>3</h3>
                <ReportList />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserManager;
