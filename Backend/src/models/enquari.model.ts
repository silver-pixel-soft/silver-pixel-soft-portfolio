import mongoose, { Schema, Document } from "mongoose";

// Interface for enquary Document
interface EnquaryDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  serviceNeeded: string;
  budget: string;
  message: string;
}

const enquarySchema = new Schema<EnquaryDocument>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    serviceNeeded: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Export enquary model
export const Enquary = mongoose.model<EnquaryDocument>("Enquary", enquarySchema);