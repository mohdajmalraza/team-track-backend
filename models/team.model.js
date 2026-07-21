const mongoose = require("mongoose");

// Team Schema
const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    }, // Team names must be unique

    description: {
      type: String,
      trim: true,
    }, // Optional description for the team

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // members: [
    //   {
    //     user: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "User",
    //       required: true,
    //     },
    //     joinedAt: {
    //       type: Date,
    //       default: Date.now,
    //     },
    //   },
    // ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Team", teamSchema);
