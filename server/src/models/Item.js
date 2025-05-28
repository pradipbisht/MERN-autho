const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  country: { type: String, required: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
  images: [{ type: String }],
  propertyType: {
    type: String,
    enum: ["apartment", "house", "condo", "land", "commercial"],
    required: true,
  },
  listedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  features: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ItemSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Item", ItemSchema);
