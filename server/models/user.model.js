const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new Schema({
  username: String,
  gender:{ type: String, require: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  birthday: { type: Date, require: true },
  photo: String,
});

// methods
UserSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update.password !== '') {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(update.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }
        update.password = hash;
        next();
      });
    });
  } else {
   next();
  }
 })

UserSchema.methods.comparePassword = function (password, next) {
  let user = this;
  return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model("User", UserSchema);
