import { Paper, ThemeProvider, createTheme } from "@mui/material";
import Home from "../Pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import CustomDrawer from "../Components/Drawer/CustomDrawer";
import BudgetDashBoard from "../Pages/Admin/BudgetDashBoard";
import DocumentDashBoard from "../Pages/Admin/DocumentDashBoard";
import EmployemntDashBoard from "../Pages/Admin/EmployemntDashBoard";
import NewsDashBoard from "../Pages/Admin/NewsDashBoard";
import NotFound from "../Pages/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Vacancies from "../Pages/Vacancies/Vacancies";
import News from "../Pages/News/News";
import Budgets from "../Pages/BudgetAllocation/BudgetAllocation";
import Documents from "../Pages/Documents/Documents";

function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<CustomDrawer />}>
              <Route path="/admin/budget" element={<BudgetDashBoard />} />
              <Route path="/admin/document" element={<DocumentDashBoard />} />
              <Route path="/admin/vacancies" element={<EmployemntDashBoard />} />
              <Route path="/admin/news" element={<NewsDashBoard />} />
              <Route path="/admin/vacancies/cv" element={<NewsDashBoard />} />
            </Route>
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<Home />} />
          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="/vacancies/:id" element={<Home />} />
          <Route path="/budget" element={<Budgets />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
