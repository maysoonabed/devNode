import mongoose from "mongoose";

const schemaUser = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  firstName: String,
  middleName: String,
  lastName: String,
  fullName: String,
});

schemaUser.pre("save", function (next) {
  let fullName = [this.firstName, this.middleName, this.lastName]
    .filter(Boolean)
    .join(" ");
  this.fullName = fullName;
  next();
});

schemaUser.post("save", function (doc, next) {
  // send doc to elasticsearch
  next();
});

/*schemaUser.virtual('age').get(function() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    age = currentYear - this.date_of_birth;
    return age;
  });*/
export default mongoose.model("User", schemaUser);
