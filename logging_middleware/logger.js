import axios from "axios";
import { getAuthToken } from "./auth.js";

const LOG_API =
  "http://20.207.122.201/evaluation-service/logs";

export const Log = async (
  stack,
  level,
  packageName,
  message
) => {

  try {

    const token = await getAuthToken();

    const response = await axios.post(
      LOG_API,
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {

    console.log(
      "Logger Error:",
      error.response?.data || error.message
    );
    console.log("Request payload:", { stack, level, packageName, message });
  }
};