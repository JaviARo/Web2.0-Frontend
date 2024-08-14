import axios from "axios";

const sendMessage = (name:string, email:string, message:string) => {
  return axios.post(process.env.REACT_APP_ENDPOINT + "/messages/create", {
    name, email, message
  });
}

export default sendMessage;