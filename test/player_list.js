const expect = require("chai").expect;
const { before } = require("mocha");
const axios = require("axios");
let chai = require("chai");
let should = chai.should();

const { API_URL, createPlayerList,headerConfig } = require("./test_utils");


let newplayer = undefined;


before(async () => {

    newplayer = await createPlayerList();


});


/****************************************/
/******* Create Player List   ***********/
/****************************************/

describe("Create player list",function(){

    it("Create player list with correct payload",async()=>{

        const payload = {
            name: "England",
            jerseyNumber: 207
        };
    
        const response = await axios.post(API_URL + "/create-playerlist", payload,headerConfig());

        expect(response.status).to.be.equal(201);
        expect(response.data).to.be.an("object");
        
    });

});





/****************************************/
/*********Get  Player List   *************/
/****************************************/



describe("Get player list",function(){

    it("Get each team player lists",async()=>{

        const res = await axios.get(API_URL + "/get-player-list",headerConfig());
        expect(res.status).to.be.equal(200);
        expect(res.data).to.be.an("array");

    });

});

/****************************************/
/******   Delete Single Player **********/
/****************************************/


describe("Delete player",function(){

    it("Delete single player",async()=>{
        const response = await axios.delete(API_URL + "/delete-player/" + newplayer._id,headerConfig());
        expect(response.status).to.be.equal(200);
        expect(response.data).to.be.an("object");
    });


});



