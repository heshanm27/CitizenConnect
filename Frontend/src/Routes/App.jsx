import { ThemeProvider, createTheme } from "@mui/material";
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

function App() {
  const theme = createTheme({});
  return (
    <ThemeProvider theme={theme}>
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
        <Route path="/news" element={<Home />} />
        <Route path="/news/:id" element={<Home />} />
        <Route path="/vacancies" element={<Vacancies />} />
        <Route path="/vacancies/:id" element={<Home />} />
        <Route path="/budget" element={<Home />} />
        <Route path="/document" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
