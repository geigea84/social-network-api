const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/social-network", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //(node:7584) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
    useCreateIndex: true
});

mongoose.set("debug", true);

module.exports = mongoose.connection;