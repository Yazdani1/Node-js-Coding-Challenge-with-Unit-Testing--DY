const expect = require("chai").expect;
const { before } = require("mocha");
const axios = require("axios");
let chai = require("chai");

const { API_URL } = require("./test_utils");

/****************************************/
/********* User Registration  ***********/
/****************************************/

describe("User registration", function () {

    it("Create user account with correct payload", async () => {
      const payload = {
        teamname: "Argentina",
        email: "afsdfdsfdsf65655@gmail.com",
        password: "123456",
      };

      const response = await axios.post(API_URL + "/registration", payload);
      expect(response.status).to.be.equal(201);
      expect(response.data).to.be.an("object");
    });

  it("Create user account without adding teamname ", async () => {
    try {
      const payload = {
        email: "dsfds7878@gmail.com",
        password: "123566456",
      };

      const response = await axios.post(API_URL + "/registration", payload);

      expect(response.status).not.to.be.equal(201);
      console.log(response.status);
      expect(response.data).to.be.an("object");
    } catch (error) {
      if (error.response) {
        expect(error.response.status).not.to.be.equal(201);
      } else {
        throw error;
      }
    }
  });

  it("Create user account without adding email ", async () => {
    try {
      const payload = {
        teamname: "gffg",
        password: "123456",
      };

      const response = await axios.post(API_URL + "/registration", payload);

      expect(response.status).not.to.be.equal(201);
      expect(response.data).to.be.an("object");
    } catch (error) {
      if (error.response) {
        expect(error.response.status).not.to.be.equal(201);
      } else {
        throw error;
      }
    }
  });

  it("Create user account without adding password ", async () => {
    try {
      const payload = {
        teamname: "Belgium",
        email: "uiiui78@gmail.com",
      };

      const response = await axios.post(API_URL + "/registration", payload);

      expect(response.status).not.to.be.equal(201);
      expect(response.data).to.be.an("object");
    } catch (error) {
      if (error.response) {
        expect(error.response.status).not.to.be.equal(201);
      } else {
        throw error;
      }
    }
  });
});

/****************************************/
/********* User Login        ***********/
/****************************************/

describe("User login", function () {
  it("Login with correct payload", async () => {
    const payload = {
      email: "a@gmail.com",
      password: "123456",
    };

    const response = await axios.post(API_URL + "/login", payload);
    expect(response.status).to.be.equal(200);
    expect(response.data).to.be.an("object");
  });

  it("Login without adding email", async () => {
    try {
      const payload = {
        password: "123456",
      };

      const response = await axios.post(API_URL + "/login", payload);

      expect(response.status).not.to.be.equal(200);
      expect(response.data).to.be.an("object");
    } catch (error) {
      if (error.response) {
        expect(error.response.status).not.to.be.equal(201);
      } else {
        throw error;
      }
    }
  });

  it("Login without adding password", async () => {
    try {
      const payload = {
        email: "a@gmail.com",
      };

      const response = await axios.post(API_URL + "/login", payload);
      expect(response.status).not.to.be.equal(200);
      expect(response.data).to.be.an("object");
    } catch (error) {
      if (error.response) {
        expect(error.response.status).not.to.be.equal(201);
      } else {
        throw error;
      }
    }
  });
});
