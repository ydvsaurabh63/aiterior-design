import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry
} from '../controllers/enquiryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createEnquiry)
  .get(protect, getEnquiries);

router.route('/:id')
  .put(protect, updateEnquiryStatus)
  .delete(protect, deleteEnquiry);

export default router;
