import { Router } from 'express';
import {
  addStudent,
  getMyStudents,
  updateMyStudent,
  deleteMyStudent
} from '../../controllers/Students/student.controller';
import { authenticate } from '../../middlewares/Authentication/auth.middleware';

const router = Router();

// All routes below require authentication
router.use(authenticate);

// POST /api/students        → Add student
router.post('/addStudent', addStudent);

// GET /api/students         → Get all students of logged-in user
router.get('/getMyStudents', getMyStudents);

// PUT /api/students/:studentId   → Update student
router.put('/updateMyStudent/:studentId', updateMyStudent);

// DELETE /api/students/:studentId → Delete student
router.delete('/deleteMyStudent/:studentId', deleteMyStudent);

export default router;
