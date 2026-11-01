import mongoose, { Schema, Document } from "mongoose";

interface Tag extends Document {
  tag: string;
}

const tagsSchema = new Schema<Tag>(
  {
    tag: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

export const Tags = mongoose.model<Tag>("Tags", tagsSchema);
