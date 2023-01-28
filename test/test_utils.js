const axios = require("axios");
const API_URL = "http://localhost:8080/api";


// for header token

 const headerConfig = () => {
    return {
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q1MmU3NjlmNWNmYmJkZDIxOWEzODciLCJpYXQiOjE2NzQ5Mjk5NDksImV4cCI6MTY3NTAxNjM0OX0.Teul79fLnmuIFjHVmw_j-Vw2nmhligY4zFNgh9_vSH8"}`,
      },
    };
  };
  



const createPlayerList = async () => {

  const payload = {
    name: "Team Germany",
    jerseyNumber: 896

  };

  const response = await axios.post(API_URL + "/create-playerlist", payload,headerConfig());
  return response.data;
};



module.exports = {
  API_URL,
  createPlayerList,
  headerConfig
};