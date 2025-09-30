const mongoose = require('mongoose');

const userStatus = ['active', 'inactive', 'peding']

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    status: {
        type: String,
        enum: userStatus,
        default: 'active',
    }
},{
    timestamps: true,
});

// Add indexes for efficient searching and filtering
// This is a crnucial performance optimization for a large dataset
userSchema.index({name: 'text', email: 'text'});   //Text index for full-text search on the name field
userSchema.index({status: 1});     // B-tree index for filtering by status
// userSchema.index({email: 1});      // B-tree index for efficient email lookups

const User = mongoose.model('User', userSchema);

module.exports = {User, userStatus};

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     status: {
//         type: String,
//         enum: ['active', 'inactive', 'pending'],
//         default: 'active',
//     },
// }, {
//     timestamps: true,
// });

// // Add indexes for efficient searching and filtering
// // This is a crucial performance optimization for a large dataset
// userSchema.index({ name: 'text' });   // Text index for full-text search on the name field
// userSchema.index({ status: 1 });     // B-tree index for filtering by status
// userSchema.index({ email: 1 });      // B-tree index for efficient email lookups

// const User = mongoose.model('User', userSchema);

// module.exports = User;
