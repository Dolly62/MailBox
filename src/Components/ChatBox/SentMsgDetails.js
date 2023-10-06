import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import classes from "./EntireMsg.module.css";

const SentMsgDetails = () => {
  const { messageName } = useParams();
  const sentMailMsg = useSelector((state) => state.composeMail.sentMailMsg);
  // console.log("get");
  // console.log(sentMailMsg);

  const msgDetails = sentMailMsg.find((mail) => mail.name === messageName);

  if (!msgDetails) {
    return <p>Mail not found</p>;
  }

  return (
    <div className={classes.container} key={msgDetails.name}>
      <div className={classes.row}>★{msgDetails.composeEmail}★</div>
      <div className={classes.row}>{msgDetails.composeSubject}</div>
      <div className={classes.row} style={{ color: "grey" }}>
        {msgDetails.textArea}
      </div>
    </div>
  );
};

export default SentMsgDetails;
