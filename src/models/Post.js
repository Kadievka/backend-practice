import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseDelete from "mongoose-delete";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.plugin(mongoosePaginate);
postSchema.plugin(mongooseDelete, {
  overrideMethods: true,
});

const Post = mongoose.model("Post", postSchema);

export default Post;
