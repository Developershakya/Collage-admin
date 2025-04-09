const express = require('express');
const {
  addCourse,
  getCourses,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

const router = express.Router();

router.post('/add', addCourse);             // ➕ Create
router.get('/', getCourses);                // 📃 Read all
router.put('/update/:id', updateCourse);    // ✏️ Update
router.delete('/delete/:id', deleteCourse); // ❌ Delete

module.exports= router;
