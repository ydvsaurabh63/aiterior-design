import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';
import { projectUpload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, projectUpload, createProject);

router.route('/:id')
  .get(getProjectById)
  .put(protect, projectUpload, updateProject)
  .delete(protect, deleteProject);

export default router;
