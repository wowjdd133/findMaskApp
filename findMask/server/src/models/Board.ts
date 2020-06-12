import mongoose from 'mongoose';
import moment from 'moment';

const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  title: String,
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  create_at: {
    type: Date,
    default: moment(),
  },
  update_at: {
    type: Date,
    default: moment(),
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: 'Comment'
  },
  view_cnt: {
    type: Number,
    default: 1
  }
});

export default mongoose.model('Board', BoardSchema);
