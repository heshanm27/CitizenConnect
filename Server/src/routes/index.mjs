import fileUpload from "express-fileupload";
import ErrorHandlerMiddleware from "../middleware/error.middleware.mjs";
import NotFoundMiddleware from "../middleware/notfound.middleware.mjs";
import AuthRoute from "./auth.routes.mjs";
import BudgetRoute from "./budget.routes.mjs";
import CertificateRoute from "./certificate.routes.mjs";
import CvRoute from "./cv.routes.mjs";
import NewsRoute from "./news.routes.mjs";
import ProjectRoute from "./project.routes.mjs";
import UserRoute from "./user.routes.mjs";
import VacanciesRoute from "./vacancies.routes.mjs";
import OtpRoute from "./otp.routes.mjs";

export default function routes(app) {
  const basePath = "/api/v1";
  console.log("filehome rou", process.env.CLOUDINARY_NAME);
  app.get("/", (req, res) => {
    res.status(200).json({
      server: "Server Is running",
    });
  });
  app.get(`${basePath}/`, (req, res) => {
    res.status(200).json({
      server: "Server Is running",
    });
  });
  app.use(
    fileUpload({
      useTempFiles: true,
    })
  );
  app.use(`${basePath}/news`, NewsRoute);
  app.use(`${basePath}/users`, UserRoute);
  app.use(`${basePath}/auth`, AuthRoute);
  app.use(`${basePath}/project`, ProjectRoute);
  app.use(`${basePath}/budget`, BudgetRoute);
  app.use(`${basePath}/cv`, CvRoute);
  app.use(`${basePath}/certificate`, CertificateRoute);
  app.use(`${basePath}/vacancies`, VacanciesRoute);
  app.use(`${basePath}/otp`, OtpRoute);

  app.use(NotFoundMiddleware);
  app.use(ErrorHandlerMiddleware);
}
