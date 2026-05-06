import axios from "axios";

const AUTH_URL =
  "http://20.207.122.201/evaluation-service/auth";

const credentials = {
    email: "gokulraj.v.2023.cse@ritchennai.edu.in",
    name: "Gokulraj V",
    rollNo: "2117230020052",
    accessCode: "BTCDqT",
    clientID: "44a8b644-1767-4fec-a6f5-44f85acb596d",
    clientSecret: "mVvzRTeyMgUUsUkb"

};

export const getAuthToken = async () => {
  try {
    const response = await axios.post(
      AUTH_URL,
      credentials
    );

    return response.data.access_token;

  } catch (error) {
    console.log(error.message);
  }
};