import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  }
});

export const User: Model<IUser> =
  mongoose.models.User || model("User", UserSchema);
