import { asyncHandler } from "../utils/asyncHandler.ts";
import { ApiError } from "../utils/ApiError.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { type Request, type Response } from "express";
import { Enquary } from "../models/enquari.model.ts";
import { sendEmail } from "../utils/enquariMail.ts"

const enquaryController = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, serviceNeeded, budget, message } = req.body;
    if (!firstName || !lastName || !email || !serviceNeeded || !budget || !message) {
      throw new ApiError(400, "All fields are required");
    }

    // Saving Enquary in DB for Admins
    const enquary = await Enquary.create({
      firstName,
      lastName,
      email,
      serviceNeeded,
      budget,
      message
    });

    // Sending Mail to Company
    await sendEmail({
      firstName,
      lastName,
      email,
      serviceNeeded,
      budget,
      message
    })

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          enquary,
          "Enquary created successfully"
        )
      );
  } catch (error: any) {
    throw new ApiError(error?.statusCode || 400, error?.message || "Failed to create enquary");
  }
});

export { enquaryController };
