import express from "express";
import { jobFieldValidator } from "../validations/job.validation.js";
import {
  addNewJobController,
  deletejobController,
  filterJobsController,
  getAllJobsController,
  getApplyMethodStatistics,
  getJobsStatistics,
  getSingleJobController,
  updateJobDetailsController,
  updateStatusController,
} from "../controllers/job.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";

const router = express.Router();

// ---- Router :-  add new job -----
router.post("/add/new/job", verifyUser, jobFieldValidator, addNewJobController);

// ---- Router :-  update job -----
router.patch("/update/job/:jobId", verifyUser, updateJobDetailsController);

// ---- Router :-  get single job with jobId -----
router.get("/get/job/:jobId", verifyUser, getSingleJobController);

// ---- Router :-  get all job -----
router.get("/get/all/jobs", verifyUser, getAllJobsController);

// ---- Router :-  update status -----
router.patch("/update/status/:jobId", verifyUser, updateStatusController);

// ---- Router :-  delete job -----
router.delete("/delete/job/:jobId", verifyUser, deletejobController);

// ---- Router :- filter josb -----
router.get("/filter", verifyUser, filterJobsController);

// ---- Router :-  job statistics -----
router.get("/jobs/statistics", verifyUser, getJobsStatistics);

// ---- Router :-  Apply method statistics -----
router.get(
  "/applymethod/statistics",
  verifyUser,
  getApplyMethodStatistics,
);

export default router;
