import express from "express";
import { subscribe, unsubscribe } from "../controllers/subscribeController.js";

const router = express.Router();

router.post("/subscribe/:subscribeType",  subscribe);

router.get("/unsubscribe/:subscribeType", unsubscribe);

export default router;