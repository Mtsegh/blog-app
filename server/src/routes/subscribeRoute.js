import express from "express";
import { getSubscribers, subscribe, unsubscribe } from "../controllers/subscribeController.js";

const router = express.Router();

router.post("/subscribe/:subscribeType",  subscribe);

router.post("/unsubscribe/:subscribeType", unsubscribe);

router.get("/get-subscribers/:subscribeType/:subscribeTo", getSubscribers);

export default router;