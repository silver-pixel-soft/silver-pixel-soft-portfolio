import mongoose, { Schema, Document } from "mongoose";
interface Review extends Document {
  overallReating: Number,
  communication_transperincy: Number,
  turnaround_speed: Number,
  code_system_qualiy: Number,
  value_of_money: Number,
  fullname: string,
  role: string,
  project: string,
  email: string,
  product_link: string,
  avatar: string,
  service_caterogyrvice: string,
  outcome: string,
  review_heading: string,
  review_: string,
  tags_: mongoose.Types.ObjectId[]
}

const reviewSchema = new Schema<Review>(
  {
    overallReating: {
      type: Number,
      require: true
    },
    communication_transperincy: {
      type: Number,
      require: false
    },
    turnaround_speed: {
      type: Number,
      require: false
    },
    code_system_qualiy: {
      type: Number,
      require: false
    },
    value_of_money: {
      type: Number,
      require: false
    },
    fullname: {
      type: String,
      require: true
    },
    role: {
      type: String,
      require: true
    },
    project: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    product_link: {
      type: String,
      require: false
    },
    avatar: {
      type: String,
      require: true
    },
    service_caterogyrvice: {
      type: String,
      require: true
    },
    outcome: {
      type: String,
      require: false
    },
    review_heading: {
      type: String,
      require: true
    },
    review_: {
      type: String,
      require: true
    },
    tags_: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tags",
      }
    ]
  },
  {
    timestamps: true
  }
)

export const Review = mongoose.model<Review>("Review", reviewSchema);
