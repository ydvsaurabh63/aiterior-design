import express from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController.js';
import { protect } from '../middleware/authMiddleware.js';
import { singleUpload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getTestimonials)
  .post(protect, singleUpload('image'), createTestimonial);

router.route('/:id')
  .put(protect, singleUpload('image'), updateTestimonial)
  .delete(protect, deleteTestimonial);

export default router;
