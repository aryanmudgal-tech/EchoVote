import { DataTypes } from "sequelize";
import sequelize from "../utils/database.js";
import User from "./user.model.js";
import Post from "./post.model.js";

const PostLike = sequelize.define('PostLike', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post,
      key: 'id'
    }
  }
}, {
  timestamps: true
});

// Add unique constraint to prevent multiple likes from the same user
PostLike.addHook('beforeCreate', async (postLike) => {
  const existingLike = await PostLike.findOne({
    where: {
      userId: postLike.userId,
      postId: postLike.postId
    }
  });
  if (existingLike) {
    throw new Error('User has already liked this post');
  }
});

export default PostLike; 