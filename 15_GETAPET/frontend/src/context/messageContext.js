import { createContext } from "react";

const messageContext = createContext({
  message: "",
  setMessage: (msg) => (this.message = msg),
});

export default messageContext;
