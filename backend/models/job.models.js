import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    positionApplied: {
      type: String,
      required: true,
      trim: true,
    },

    companyCity: {
      type: String,
      trim: true,
    },

    applyMethod: {
      type: String,
      enum: [
        "email",
        "website",
        "linkedin",
        "naukri",
        "indeed",
        "referral",
        "other_job_portal",
      ],
      required: true,
    },

    hrEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },

    jobLink: {
      type: String,
      trim: true,
    },

    workMode: {
      type: String,
      enum: ["onsite", "remote", "hybrid"],
      required: true,
      default: "onsite",
    },

    appliedDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: [
        "applied",
        "interview",
        "rejected",
        "offer",
        "no_response",
      ],
      default: "applied",
    },
  },
  { timestamps: true },
);

const Job = mongoose.model("job", jobSchema);
export default Job;
