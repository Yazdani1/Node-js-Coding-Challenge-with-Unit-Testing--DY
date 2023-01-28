const router = require("express").Router();
const { userRegistration, userLogin,getAllUser,getCurrentUserRole } = require("../controllers/user");

const {requireLogin,isAdmin} = require("../middleware/auth");

// user authentication


router.post("/registration", userRegistration);
router.post("/login", userLogin);

//user

// to get user list and only admin can access it

router.get("/alluser",requireLogin,isAdmin,getAllUser);

//to get current user  for admin access in frontend side..

router.get("/current-user-role",requireLogin,isAdmin,getCurrentUserRole);



module.exports = router;
