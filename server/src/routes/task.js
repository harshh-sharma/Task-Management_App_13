const {Router} = require("express");
const isAuthenticated = require("../middlewares/auth");
const {createTask, updateTask, deleteTask, getAllTask, getSpecificTask} = require("../controllers/task");

const router = Router();

router.use(isAuthenticated);

router.route("/").post(createTask)
                 .get(getAllTask);

router.route("/:id").delete(deleteTask)
                    .put(updateTask)
                    .get(getSpecificTask)
                    

module.exports = router;