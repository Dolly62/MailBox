import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import classes from "./EntireMsg.module.css";

const EntireMsg = () => {
  const { msgName } = useParams();
  const receivedMailmsg = useSelector(
    (state) => state.composeMail.receivedMailmsg
  );
  // console.log(receivedMailmsg);
  const detailedMsg = receivedMailmsg.find((mail) => mail.name === msgName);
  // console.log("get");

  if (!detailedMsg) {
    return <p>Mail not found</p>;
  }

  return (
    <div className={classes.container} key={detailedMsg.name}>
      <div className={classes.row}>★{detailedMsg.from}★</div>
      <div className={classes.row}>{detailedMsg.composeSubject}</div>
      <div className={classes.row} style={{ color: "grey" }}>
        {detailedMsg.textArea}
      </div>
    </div>
  );
};

export default EntireMsg;
