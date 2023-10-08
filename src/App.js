import { useDispatch, useSelector } from "react-redux";
import "./App.css";

import SideBar from "./Components/SideBar/SideBar";
import { mailActions } from "./Store/ComposeMails";
import { useCallback, useEffect } from "react";

function App() {
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  //-----------------------------------------FETCH FOR SENT BOX--------------------------------//

  const fetchfunctionHandler = useCallback(async () => {
    const editEmail = email.replace(/[@.]/g, "");

    try {
      const response = await fetch(
        `https://mailbox-client-477fb-default-rtdb.firebaseio.com/composeMail/${editEmail}/sent.json`
      );

      if (!response.ok) {
        throw new Error("Something gone wrong");
      }
      const data = await response.json();

      if (!data) {
        console.log("cleared");
        dispatch(mailActions.clearAllMails());
      }

      if (data) {
        const allMails = Object.keys(data).map((key) => ({
          name: key,
          ...data[key],
        }));
        // console.log(allMails);
        dispatch(mailActions.replaceMails({ sentMailMsg: allMails }));
        dispatch(mailActions.updateTotalMsgInSent(allMails.length));
      }
    } catch (error) {
      alert(error.message);
    }
  }, [email, dispatch]);

  //---------------------------------FETCH FOR INBOX--------------------------//

  const fetchMailDataForInbox = useCallback(async () => {
    const editEmail = email.replace(/[@.]/g, "");
    try {
      const response = await fetch(
        `https://mailbox-client-477fb-default-rtdb.firebaseio.com/composeMail/${editEmail}/inbox.json`
      );

      if (!response.ok) {
        const errmsg = "Something went wrong";
        throw new Error(errmsg);
      }
      const data = await response.json();

      // console.log(data);

      if (!data) {
        dispatch(mailActions.clearAllMails());
      }

      if (data) {
        const allMails = Object.keys(data).map((key) => ({
          name: key,
          ...data[key],
        }));
        // console.log(allMails);
        const unreadMails = allMails.filter((mail) => !mail.isRead);

        dispatch(mailActions.addReceivedMails({ receivedMailmsg: allMails }));
        dispatch(mailActions.updateUnreadMsgCount(unreadMails.length));
      }
    } catch (error) {
      alert(error.message);
    }
  }, [email, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchfunctionHandler();
      fetchMailDataForInbox();

      const fetchfunctionHandlerId = setInterval(fetchfunctionHandler, 30000);
      const fetchMailDataForInboxId = setInterval(fetchMailDataForInbox, 30000);

      return () => {
        clearInterval(fetchfunctionHandlerId);
        console.log("cleared Interval");
        clearInterval(fetchMailDataForInboxId);
      };
    } else{
      dispatch(mailActions.clearAllMails());
    }
  }, [isLoggedIn, dispatch, fetchfunctionHandler, fetchMailDataForInbox]);

  return (
    <div id="app" className="App">
      <SideBar />
    </div>
  );
}

export default App;
