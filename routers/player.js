const router = require("express").Router();
const {requireLogin,isAdmin} = require("../middleware/auth");

const { createPlayerList,getPlayers,deletePlayer } = require("../controllers/player");

// user authentication

// to create player list
router.post("/create-playerlist",requireLogin, createPlayerList);

// to get player lists

router.get("/get-player-list",requireLogin,getPlayers);


// to delete player list

router.delete("/delete-player/:id",requireLogin,deletePlayer);



module.exports = router;
