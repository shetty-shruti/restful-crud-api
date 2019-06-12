const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email:String,
    phoneNumber:String
}, {
    timestamps: false
});

/**
Mongoose by default produces a collection name by passing the model name to the utils.toCollectionName method.
Pass the collectionName as the third argument to override this behavior*/
module.exports = mongoose.model('User', UserSchema,'Users'); 