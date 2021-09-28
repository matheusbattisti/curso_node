import { useState, useEffect, useContext } from "react";

import styles from "./Message.module.css";

/* contexts */
import messageContext from "../../context/messageContext";

function Message({ type }) {
  //   const [visible, setVisible] = useState(false);

  //   console.log(message);

  //   useEffect(() => {
  //     if (!message) {
  //       setVisible(false);
  //       return;
  //     }

  //     setVisible(true);

  //     const timer = setTimeout(() => {
  //       setVisible(false);
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }, [message]);

  const MessageContext = useContext(messageContext);

  return (
    <div className={`${styles.message} ${styles[type]}`}>
      {MessageContext.message}
    </div>
  );
}

export default Message;
