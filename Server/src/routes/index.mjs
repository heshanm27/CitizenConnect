import ErrorHandlerMiddleware from "../middleware/error.middleware.mjs";
import NotFoundMiddleware from "../middleware/notfound.middleware.mjs";

export default function routes(app) {
  app.get("/", (req, res) => {
    res.status(200).json({
      server: "Server Is running",
    });
  });

  // app.use("/news");
  // app.use("/users");
  // app.use("/auth");
  // app.use("/project");
  // app.use("/budget");
  // app.use("/cv");
  // app.use("/certificate");
  // app.use("/vecancies");

  app.use(NotFoundMiddleware);
  app.use(ErrorHandlerMiddleware);
}
