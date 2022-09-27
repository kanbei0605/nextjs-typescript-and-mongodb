import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

export const User: Model<IUser> =
  mongoose.models.User || model("User", UserSchema);
