import { Schema, model } from "mongoose";
import { ACCOUNT_STATUS, USER_ROLE } from "../constants/users.constant";
import IUser from "../interfaces/user.interface";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name"],
    },
    age: {
      type: Number,
      required: [true, "Please tell us your age"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please tell us your email"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: 0,
    },
    passwordChangedAt: {
      type: Date,
      default: null,
    },
    photo: String,
    role: {
      type: String,
      enum: {
        values: Object.values(USER_ROLE),
        message: "Role is either: user or admin. Your role is {VALUE}",
        default: USER_ROLE.user,
      },
    },
    userStatus: {
      type: String,
      enum: {
        values: Object.values(ACCOUNT_STATUS),
        message: "User Status is either: active or inactive. Your status is {VALUE}",
        default: ACCOUNT_STATUS.active,
      },
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model<IUser>("User", userSchema);
export default User;
