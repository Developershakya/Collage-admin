const express = require('express');
const router = express.Router();
const stdController = require('../controllers/stdController');

router.post('/', stdController.addStudent);
router.get('/', stdController.getStudents);
router.get('/:id', stdController.getStudent);
router.put('/:id', stdController.updateStudent);
router.delete('/:id', stdController.deleteStudent);

module.exports = router;
