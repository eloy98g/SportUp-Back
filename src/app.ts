import express, { Application, json } from "express";

// Middlewares
import { corsMiddleware } from "./middlewares/cors.js";

// Routes
import { activityRouter } from "./routes/activityRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { chatRouter } from "./routes/chatRouter.js";
import { sportRouter } from "./routes/sportRouter.js";
import { authRouter } from "./routes/authRouter.js";

const app: Application = express();
export const PORT = process.env.PORT || 1234;

app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by");

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/activity", activityRouter);
app.use("/chat", chatRouter);
app.use("/sport", sportRouter);

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
