import mongoose from 'mongoose';
import moment from 'moment';

const Schema = mongoose.Schema;

const RecommentSchema = new Schema({
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  },
  create_at: {
    type: Date,
    default: moment(),
  },
  update_at: {
    type: Date,
    default: moment(),
  },
})

export default mongoose.model('Recomment', RecommentSchema);