const mongoose = require("mongoose");

const PRIORITY_MAP = {
  High: 1,
  Medium: 2,
  Low: 3,
};

// Task Schema
const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    }, // Refers to Project model

    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    }, // Refers to Team model

    owners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      }, // Refers to User model (owners)
    ],

    tags: [{ type: String }], // Array of tags

    timeToComplete: { type: Number, required: true }, // Number of days to complete the task

    dueDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["To Do", "In Progress", "Completed", "Blocked"], // Enum for task status
      default: "To Do",
    }, // Task status

    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Low",
    },

    priorityLevel: {
      type: Number,
      default: 3,
    },

    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

// Automatically update the `updatedAt` field whenever the document is updated
// taskSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// Automatically update the `priorityLevel` field whenever the document is updated
taskSchema.pre("save", function () {
  if (this.isModified("priority")) {
    this.priorityLevel = PRIORITY_MAP[this.priority];
  }

  // next();
});

// taskSchema.pre("findOneAndUpdate", function (next) {
//   const update = this.getUpdate();

//   if (update.priority) {
//     update.priorityLevel = PRIORITY_MAP[update.priority];
//   }

//   next();
// });

module.exports = mongoose.model("Task", taskSchema);
