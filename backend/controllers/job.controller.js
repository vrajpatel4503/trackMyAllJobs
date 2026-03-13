import Job from "../models/job.models.js";
import jobModel from "../models/job.models.js";
import userModel from "../models/user.models.js";

// ------ Controller :- add a new job  ------
export const addNewJobController = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const {
      companyName,
      positionApplied,
      companyCity,
      applyMethod,
      hrEmail,
      jobLink,
      workMode,
      appliedDate,
      status,
    } = req.body;

    const newJob = new jobModel({
      user: userId,
      companyName,
      positionApplied,
      companyCity,
      applyMethod,
      hrEmail,
      jobLink,
      workMode,
      appliedDate,
      status,
    });

    const savedJob = await newJob.save();

    await userModel.findByIdAndUpdate(userId, {
      $push: { jobs: savedJob._id },
    });

    res.status(201).json({
      success: true,
      message: "Job added successfully.",
      job: savedJob,
    });

    // try part end
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add job. Please try again later.",
    });
  }
};

// ------ Controller :- edit job details  ------
export const updateJobDetailsController = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { jobId } = req.params;

    const existingJob = await jobModel.findOne({ _id: jobId, user: userId });

    if (!existingJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    const validateApplyMethod = [
      "email",
      "website",
      "linkedin",
      "naukri",
      "indeed",
      "referral",
      "other_job_portal",
    ];

    const validWorkModes = ["onsite", "remote", "hybrid"];

    const validStatus = [
      "applied",
      "interview",
      "rejected",
      "offer",
      "no_response",
    ];

    // validate applyMethod
    if (
      req.body.applyMethod &&
      !validateApplyMethod.includes(req.body.applyMethod)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid apply method",
      });
    }

    // Validate workMode
    if (req.body.workMode && !validWorkModes.includes(req.body.workMode)) {
      return res.status(400).json({
        success: false,
        message: "Invalid work mode",
      });
    }

    // Validate status
    if (req.body.status && !validStatus.includes(req.body.status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    // Only update field that are provided
    existingJob.companyName = req.body.companyName ?? existingJob.companyName;

    existingJob.positionApplied =
      req.body.positionApplied ?? existingJob.positionApplied;

    existingJob.companyCity = req.body.companyCity ?? existingJob.companyCity;

    existingJob.applyMethod = req.body.applyMethod ?? existingJob.applyMethod;

    existingJob.hrEmail = req.body.hrEmail ?? existingJob.hrEmail;

    existingJob.jobLink = req.body.jobLink ?? existingJob.jobLink;

    existingJob.workMode = req.body.workMode ?? existingJob.workMode;

    existingJob.appliedDate = req.body.appliedDate ?? existingJob.appliedDate;

    existingJob.status = req.body.status ?? existingJob.status;

    const updatedJob = await existingJob.save();

    return res.status(200).json({
      success: true,
      message: "Job details updated successfully.",
      job: updatedJob,
    });

    // try part end
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to edit job details. Please try again later.",
    });
  }
};

// ------ Controller :- get single job with jobId  ------
export const getSingleJobController = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { id: userId } = req.user;

    const job = await jobModel.findOne({ _id: jobId, user: userId });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    const linkBasedMethods = [
      "linkedin",
      "naukri",
      "indeed",
      "website",
      "other_job_portal",
      "referral",
    ];

    const jobObj = job.toObject();

    const formattedJob = {
      ...jobObj,
      showEmail: job.applyMethod === "email",
      showJobLink: linkBasedMethods.includes(job.applyMethod),
    };

    return res.status(200).json({
      success: true,
      job: formattedJob,
    });

    // try part end
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch job details.",
    });
  }
};

// ------ Controller :- get all job  ------
export const getAllJobsController = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const jobs = await jobModel.find({ user: userId }).sort({
      appliedDate: -1,
    });

    return res.status(200).json({
      success: true,
      jobs,
    });

    // try part end
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch job entries.",
    });
  }
};

// ------ Controller :- update status  ------
export const updateStatusController = async (req, res) => {
  try {
    const { id } = req.user;
    const { status } = req.body;
    const { jobId } = req.params;

    const validStatus = [
      "applied",
      "interview",
      "rejected",
      "offer",
      "no_response",
    ];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const job = await jobModel.findByIdAndUpdate(
      { _id: jobId, user: id },
      { status },
      { new: true },
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: false,
      message: "Job status updated successfully",
      job,
    });

    // try part end
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update Status.",
    });
  }
};

// ------ Controller :- delete job  ------
export const deletejobController = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { jobId } = req.params;

    const deletedJob = await jobModel.findByIdAndDelete({
      _id: jobId,
      user: userId,
    });

    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found or already deleted.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job removed successfully.",
    });

    // try part end
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete job. Please try again later.",
    });
  }
};

// ------ Controller :- filter jobs  ------
export const filterJobsController = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const { status, workMode, applyMethod } = req.query;

    const filter = { user: userId };

    //  ---------- status filter ----------

    if (status) {
      const validStatuses = [
        "applied",
        "interview",
        "rejected",
        "offer",
        "no_response",
      ];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid job status",
        });
      }

      filter.status = status;
    }

    // ---------- work mode filter ----------

    if (workMode) {
      const validWorkModes = ["onsite", "remote", "hybrid"];

      if (!validWorkModes.includes(workMode)) {
        return res.status(400).json({
          success: false,
          message: "Invalid work mode",
        });
      }
      filter.workMode = workMode;
    }

    // ---------- apply method filter ----------
    if (applyMethod) {
      const validApplyMethods = [
        "email",
        "website",
        "linkedin",
        "naukri",
        "indeed",
        "referral",
        "other_job_portal",
      ];

      if (!validApplyMethods.includes(applyMethod)) {
        return res.status(400).json({
          success: false,
          message: "Invalid apply method",
        });
      }
      filter.applyMethod = applyMethod;
    }

    const jobs = await jobModel.find(filter).sort({ appliedDate: -1 });

    return res.status(200).json({
      success: true,
      jobs,
    });

    // try part end
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to filter jobs",
    });
  }
};

// ---------- Controller :-  get Jobs Statistics ----------

export const getJobsStatistics = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalJobs = await jobModel.countDocuments({ user: userId });

    const totalAppliedJobs = await jobModel.countDocuments({
      user: userId,
      status: "applied",
    });

    const totalInterviews = await jobModel.countDocuments({
      user: userId,
      status: "interview",
    });

    const totalRejected = await jobModel.countDocuments({
      user: userId,
      status: "rejected",
    });

    const totalOffer = await jobModel.countDocuments({
      user: userId,
      status: "offer",
    });

    const totalNoResponse = await jobModel.countDocuments({
      user: userId,
      status: "no_response",
    });

    return res.status(200).json({
      success: true,
      stats: {
        totalJobs,
        totalAppliedJobs,
        totalInterviews,
        totalRejected,
        totalOffer,
        totalNoResponse,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in fetching statistics",
    });
  }
};

export const getApplyMethodStatistics = async (req, res) => {
  try {
    const applyMethodStatistics = await jobModel.aggregate([
      {
        $group: {
          _id: "$applyMethod",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          applyMethod: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      stats: applyMethodStatistics,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
    });
  }
};
