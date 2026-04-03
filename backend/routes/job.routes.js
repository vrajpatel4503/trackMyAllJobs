import express from "express";
import { jobFieldValidator } from "../validations/job.validation.js";
import {
  addNewJobController,
  deletejobController,
  filterJobsController,
  getAllJobsController,
  getApplyMethodStatistics,
  getJobsStatistics,
  getJobStatsForChart,
  getMonthlyJobStats,
  getSingleJobController,
  updateJobDetailsController,
  updateStatusController,
} from "../controllers/job.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";
import { demoUserBlockMiddleware } from "../middleware/demoBlocker.middleware.js";

const router = express.Router();

// ---- Router :-  add new job -----
router.post(
  "/add/new/job",
  verifyUser,
  demoUserBlockMiddleware,
  jobFieldValidator,
  addNewJobController,
);

// ---- Router :-  update job -----
router.patch(
  "/update/job/:jobId",
  verifyUser,
  demoUserBlockMiddleware,
  updateJobDetailsController,
);

// ---- Router :-  get single job with jobId -----
router.get("/get/job/:jobId", verifyUser, getSingleJobController);

// ---- Router :-  get all job -----
router.get("/get/all/jobs", verifyUser, getAllJobsController);

// ---- Router :-  update status -----
router.patch(
  "/update/status/:jobId",
  verifyUser,
  demoUserBlockMiddleware,
  updateStatusController,
);

// ---- Router :-  delete job -----
router.delete(
  "/delete/job/:jobId",
  verifyUser,
  demoUserBlockMiddleware,
  deletejobController,
);

// ---- Router :- filter josb -----
router.get("/filter", verifyUser, filterJobsController);

// ---- Router :-  job statistics -----
router.get("/stats", verifyUser, getJobsStatistics);

// ---- Router :-  Apply method statistics -----
router.get("/jobs/apply-method-stats", verifyUser, getApplyMethodStatistics);

// ---- Router :-  get job stats for chart -----
router.get("/job-stats-chart", verifyUser, getJobStatsForChart);

// ---- Router :-  get monthly job status -----
router.get("/monthly-job-stats", verifyUser, getMonthlyJobStats);

export default router;
