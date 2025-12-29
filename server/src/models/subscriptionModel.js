import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  subscribeType: {
    type: String,
    enum: ["User", "Topics"],
    required: true,
  },
  subscribeTo: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "subscribeType", // can reference User or Topics dynamically
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

subscriptionSchema.index({ email: 1, subscribeTo: 1, subscribeType: 1 }, { unique: true });

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;