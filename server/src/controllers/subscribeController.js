import Subscription from "../models/subscriptionModel.js";
import User from "../models/userModel.js";
import Topics from "../models/topicsModel.js";

export const subscribe = async (req, res) => {
    try {
        const { email, subscribeTo } = req.body;
        const { subscribeType } = req.params;
    
        if (!email) return res.status(400).json({ message: "Email is required" });
    
        // Validate target
        const model = subscribeType === "User" ? User : Topics;
        const target = await model.findById(subscribeTo);
        if (!target) return res.status(400).json({ message: "Invalid target" });
    
        // Create subscription (will fail if duplicate due to unique index)
        await Subscription.create({ email, subscribeType, subscribeTo });
    
        res.status(201).json({ message: "Subscribed successfully" });
    } catch (error) {
        if (error.code === 11000) {
          return res.status(400).json({ message: "Already subscribed" });
        }
        console.error("Subscribe error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const unsubscribe = async (req, res) => {
    try {
        console.log("Unsubscribe request:", req.params, req.body);

        const { email, subscribeTo } = req.body;
        const { subscribeType } = req.params;

        const result = await Subscription.findOneAndDelete({
            email,
            subscribeType,
            subscribeTo,
        });

        if (!result) {
            return res.status(404).json({ message: "Subscription not found" });
        }

        res.status(200).json({ message: "Unsubscribed successfully" });
    } catch (error) {
        console.error("Unsubscribe error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getSubscribers = async (req, res) => {
    try {
        const { subscribeType, subscribeTo } = req.params;
        const subscribers = await Subscription.find({ subscribeType, subscribeTo })
        .select("email -_id")
        .lean();
        
        console.log("Fetching subscribers for:", subscribers);
        res.status(200).json({ subscribers });
    } catch (error) {
        console.error("Get Subscribers error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};