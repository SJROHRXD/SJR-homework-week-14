const User = require("./User");
const Comment = require("./Comment");
const Post = require("./Post");

User.hasMany(Post, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

Post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: "CASCADE"
});

Post.belongsTo(User, {
    foreignKey: "user_id"
});

Comment.belongsTo(User, {
    foreignKey: "user_id"
});

Comment.belongsTo(Post, {
    foreignKey: "post_id",
});

// Use the ON DELETE CASCADE option to specify whether you want rows deleted in a child table when corresponding rows are deleted in the parent table.
// If you do not specify cascading deletes, the default behavior of the database server prevents you from deleting data in a table if other tables reference it.

module.exports = { User, Comment, Post };