import { Schema, model } from 'mongoose';
import { UserImp } from '../interfaces/auth.interface';
// import * as bcrypt from 'bcrypt';

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'Recipe'
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

// UserSchema.pre('save', function(next) {
//   if (!this.isModified('password')) {
//     return next();
//   } else {
//     bcrypt.genSalt(10, (err, salt) => {
//       if (err) return next(err);

//       bcrypt.hash(this.password, salt, (err, hash) => {
//         if (err) return next(err);

//         this.password = hash;
//         next();
//       });
//     });
//   }
// })

export default model<UserImp>('User', UserSchema);
