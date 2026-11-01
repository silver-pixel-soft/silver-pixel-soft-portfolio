import { asyncHandler } from "../utils/asyncHandler.ts";
import { ApiError } from "../utils/ApiError.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { type Request, type Response } from "express";
import { Review } from "../models/review.model.ts";
import { Tags } from "../models/tags.model.ts";
import mongoose from "mongoose";

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const writeReview = asyncHandler(async (req: Request, res: Response) => {
  try {
    const {
      overallReating,
      communication_transperincy,
      turnaround_speed,
      code_system_qualiy,
      value_of_money,
      fullname,
      role,
      project,
      email,
      product_link,
      avatar,
      service_caterogyrvice,
      outcome,
      review_heading,
      review_,
      tags_,
      tags
    } = req.body;

    const rawTagsInput = tags_ || tags;

    // Validating compulsory fields
    if (
      !overallReating ||
      !fullname ||
      !role ||
      !project ||
      !email ||
      !avatar ||
      !service_caterogyrvice ||
      !review_ ||
      !review_heading ||
      !rawTagsInput
    ) {
      throw new ApiError(400, "Fill the required fields");
    }

    // Normalize tags into an array of string tag names
    let rawTags: string[] = [];
    if (Array.isArray(rawTagsInput)) {
      rawTags = rawTagsInput
        .map((item: any) => {
          if (typeof item === "string") return item.trim();
          if (item && typeof item === "object" && typeof item.tag === "string") return item.tag.trim();
          return "";
        })
        .filter(Boolean);
    } else if (typeof rawTagsInput === "string") {
      rawTags = rawTagsInput
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean);
    }

    if (rawTags.length === 0) {
      throw new ApiError(400, "At least one valid tag is required");
    }

    // Deduplicate tags for this review
    const uniqueTags: string[] = [];
    for (const tag of rawTags) {
      if (!uniqueTags.some((existing) => existing.toLowerCase() === tag.toLowerCase())) {
        uniqueTags.push(tag);
      }
    }

    // Save all tags in the Tags model and collect their ObjectIds
    const tagIds = await Promise.all(
      uniqueTags.map(async (tagName: string) => {
        // Check if an existing tag document is referenced directly by ObjectId
        if (mongoose.isValidObjectId(tagName)) {
          const existingById = await Tags.findById(tagName);
          if (existingById) {
            return existingById._id;
          }
        }

        // Check if tag already exists in Tags collection (case-insensitive)
        let tagDoc = await Tags.findOne({
          tag: { $regex: new RegExp(`^${escapeRegex(tagName)}$`, "i") }
        });

        // Create new tag if it doesn't exist
        if (!tagDoc) {
          tagDoc = await Tags.create({ tag: tagName });
        }

        return tagDoc._id;
      })
    );

    // Saving review to DB referencing the tag IDs
    const reviewObject = await Review.create({
      overallReating,
      communication_transperincy,
      turnaround_speed,
      code_system_qualiy,
      value_of_money,
      fullname,
      role,
      project,
      email,
      product_link,
      avatar,
      service_caterogyrvice,
      outcome,
      review_heading,
      review_,
      tags_: tagIds
    });

    const populatedReview = await Review.findById(reviewObject._id).populate("tags_");

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          populatedReview || reviewObject,
          "Review created successfully"
        )
      );

  } catch (error: any) {
    throw new ApiError(error?.statusCode || 400, error?.message || "Failed to create Review");
  }
});

const getAllReview = asyncHandler(async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find().populate("tags_").sort({ createdAt: -1 });
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          reviews,
          "Reviews fetched successfully"
        )
      );
  } catch (error: any) {
    throw new ApiError(error?.statusCode || 400, error?.message || "Failed to fetch Reviews");
  }
})

export {
  writeReview,
  getAllReview
};
