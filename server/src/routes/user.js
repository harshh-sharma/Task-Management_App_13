const {Router} = require("express");
const isAuthenticated = require("../middlewares/auth");
const { register, login, profile } = require("../controllers/auth");

const router = Router();

console.log("comibg");

router.post('/register', register);
router.post('/login', login);
router.get('/profile', isAuthenticated, profile);

module.exports = router;