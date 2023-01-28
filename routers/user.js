const router = require("express").Router();
const { userRegistration, userLogin } = require("../controllers/user");

// user authentication


router.post("/registration", userRegistration);
router.post("/login", userLogin);



module.exports = router;
