import express from "express";
import { subscribe, unsubscribe } from "../controllers/subscribeController.js";

const router = express.Router();

router.post("/subscribe/:param",  subscribe);

router.get("/unsubscribe/:param", unsubscribe);

export default router;