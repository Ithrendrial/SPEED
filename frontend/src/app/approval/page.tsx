"use client";
import style from "../../styles/ApprovalPage.module.css";
import React, { useState } from "react";
import axios from "axios";
import { BiPlusMedical } from "react-icons/bi";
import { useLocation } from "react-router-dom";

const Approval: React.FC = () => {
  function rejectOnClick() {
    const queryParams = new URLSearchParams(window.location.search);
    const articleId = queryParams.get("id");
    const updatedStatus = {
      moderator_status: "unmoderated",
    };
    axios
      .patch(`https://speed-backend-seven.vercel.app/articles/${articleId}`, updatedStatus)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function acceptOnClick() {
    const queryParams = new URLSearchParams(window.location.search);
    const articleId = queryParams.get("id");
    const updatedStatus = {
      moderator_status: "moderated",
    };
    axios
      .patch(`https://speed-backend-seven.vercel.app/articles/${articleId}`, updatedStatus)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div> Approval</div>
      <div className={style.centered_div}>
        <button onClick={() => rejectOnClick()}>Reject</button>
        <br></br>
        <button onClick={() => acceptOnClick()}>Approve</button>
      </div>
    </div>
  );
};

export default Approval;
