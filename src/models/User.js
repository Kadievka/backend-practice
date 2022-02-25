import mongoose from "mongoose";
import mongooseBcrypt from "mongoose-bcrypt";
import mongoosePaginate from "mongoose-paginate";
import mongooseDelete from "mongoose-delete";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    jwtAuthorization: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongooseBcrypt);
userSchema.plugin(mongoosePaginate);
userSchema.plugin(mongooseDelete, {
  overrideMethods: true,
});

const User = mongoose.model("User", userSchema);

export default User;
