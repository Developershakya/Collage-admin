import express from 'express';
import {
  addCourse,
  getCourses,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js';

const router = express.Router();

router.post('/add', addCourse);             // ➕ Create
router.get('/', getCourses);                // 📃 Read all
router.put('/update/:id', updateCourse);    // ✏️ Update
router.delete('/delete/:id', deleteCourse); // ❌ Delete

module.exports= router;
