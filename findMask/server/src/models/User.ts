import mongoose from 'mongoose';
import moment from 'moment';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
   type: String,
   trim: true,
  },
  password: {
    type:String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  gender: String,
  create_at: {
    type: Date,
    default: moment(),
  },
  boards: {
    type: [Schema.Types.ObjectId],
    ref:"Board"
  }
})

UserSchema.plugin(uniqueValidator);

export default mongoose.model('User',UserSchema);