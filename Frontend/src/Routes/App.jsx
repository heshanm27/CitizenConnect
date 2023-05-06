import { Paper, ThemeProvider, createTheme } from "@mui/material";
import Home from "../Pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import CustomDrawer from "../Components/Drawer/CustomDrawer";
import BudgetDashBoard from "../Pages/Admin/BudgetDashBoard";
import DocumentDashBoard from "../Pages/Admin/DocumentDashBoard";
import NewsDashBoard from "../Pages/Admin/NewsDashBoard";
import NotFound from "../Pages/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Vacancies from "../Pages/Vacancies/Vacancies";
import News from "../Pages/News/News";
import Budgets from "../Pages/BudgetAllocation/BudgetAllocation";
import Documents from "../Pages/Documents/Documents";
import ProjectDashBoard from "../Pages/Admin/ProjectDashBoard";
import CvDashBoard from "../Pages/Admin/CvDashBoard";
import VacanciesDashBoard from "../Pages/Admin/VacanciesDashBoard";
import SignIn from "../Pages/SignIn/SignIn";
import ApplyVacancies from "../Pages/Vacancies/ApplyVacancies";
import VacanciesView from "../Pages/Vacancies/VacanciesView";
import NewsViews from "../Pages/News/NewsViews";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Routes>
          {/* <Route element={<ProtectedRoute />}> */}
          <Route element={<CustomDrawer />}>
            <Route path="/admin/budget" element={<BudgetDashBoard />} />
            <Route path="/admin/project" element={<ProjectDashBoard />} />
            <Route path="/admin/document" element={<DocumentDashBoard />} />
            <Route path="/admin/vacancies" element={<VacanciesDashBoard />} />
            <Route path="/admin/news" element={<NewsDashBoard />} />
            <Route path="/admin/:id/cv" element={<CvDashBoard />} />
            <Route path="/admin/:id/cv/:cv" element={<CvDashBoard />} />
          </Route>
          {/* </Route> */}

          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<SignIn />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsViews />} />
          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="/vacancies/:id" element={<VacanciesView />} />
          <Route path="/vacancies/:id/apply" element={<ApplyVacancies />} />
          <Route path="/budget" element={<Budgets />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
