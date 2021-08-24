var router = require('express').Router();

const taskController = require('../controllers/task.controller');

router.post("/", taskController.create);
router.put("/:id", taskController.update);
router.get("/show_user_tasks/:id", taskController.findAll);
router.get("/:id", taskController.findOne);
router.delete("/:id", taskController.delete);

module.exports = router;