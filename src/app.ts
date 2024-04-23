import express, { Application, json } from "express";

// Middlewares
import { corsMiddleware } from "./middlewares/cors.ts";

// Routes
import { activityRouter } from "./routes/activityRouter.ts";
import { userRouter } from "./routes/userRouter.ts";
import { chatRouter } from "./routes/chatRouter.ts";
import { sportRouter } from "./routes/sportRouter.ts";
import { authRouter } from "./routes/authRouter.ts";

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
