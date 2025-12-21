import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import blogRoutes from "./blog.routes.js";
import commentRoutes from "./comment.routes.js";
import categoryRoutes from "./category.routes.js";
import subscriberRoutes from "./subscriber.routes.js";

export default function registerRoutes(app) {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/blogs", blogRoutes);
  app.use("/api/comments", commentRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/subscribers", subscriberRoutes);
}
