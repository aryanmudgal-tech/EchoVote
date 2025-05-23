import Reply from "../models/reply.model.js";
import User from "../models/user.model.js";

export const createReply = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;
    const { postId } = req.params;
    const reply = await Reply.create({ content, userId, postId });
    const replyWithUser = await Reply.findByPk(reply.id, { include: [{ model: User, attributes: ['email'] }] });
    res.status(201).json(replyWithUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRepliesForPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const replies = await Reply.findAll({
      where: { postId },
      include: [{ model: User, attributes: ['email'] }],
      order: [['createdAt', 'ASC']]
    });
    res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 