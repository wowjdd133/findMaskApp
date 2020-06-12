import mongoose from 'mongoose';
import moment from 'moment';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: String,
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  create_at: {
    type: Date,
    default: moment(),
  },
  update_at: {
    type: Date,
    default: moment(),
  },
  recomments: {
    type: [Schema.Types.ObjectId],
    ref: 'Recomment'
  }
});

export default mongoose.model('Comment', CommentSchema);