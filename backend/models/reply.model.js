import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.model.js";
import Post from "./post.model.js";

const Reply = sequelize.define('Reply', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.TEXT, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
  postId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Post, key: 'id' } }
}, { timestamps: true });

User.hasMany(Reply, { foreignKey: 'userId' });
Reply.belongsTo(User, { foreignKey: 'userId' });
Post.hasMany(Reply, { foreignKey: 'postId' });
Reply.belongsTo(Post, { foreignKey: 'postId' });

export default Reply; 