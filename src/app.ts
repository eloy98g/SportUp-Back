import express, { Application, json } from "express";

// Middlewares
import { corsMiddleware } from "./middlewares/cors";

// Routes
import { activityRouter } from "./routes/activityRouter";
import { userRouter } from "./routes/userRouter";
import { chatRouter } from "./routes/chatRouter";
import { sportRouter } from "./routes/sportRouter";
import { authRouter } from "./routes/authRouter";

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
