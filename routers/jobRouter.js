import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";
import { validateIdPrama, validateJobInput } from "../middleware/validationMiddleware.js";

// router.get('/', getAllJobs)
// router.post('/', getAllJobs)

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(getJob)
  .patch(validateJobInput,validateIdPrama,updateJob)
  .delete(validateIdPrama, deleteJob);

export default router;
