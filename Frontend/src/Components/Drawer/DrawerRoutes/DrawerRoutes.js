import PhotoCamera from "@mui/icons-material/PhotoCamera";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import AllInboxOutlinedIcon from "@mui/icons-material/AllInboxOutlined";
import { createElement } from "react";

export const ADMIN_ROUTES = [
  {
    path: "/admin/budget",
    name: "Budget",
    icon: createElement(WorkHistoryOutlinedIcon),
    activeIcon: createElement(WorkHistoryIcon),
  },
  {
    path: "/admin/project",
    name: "Project",
    icon: createElement(WorkHistoryOutlinedIcon),
    activeIcon: createElement(WorkHistoryIcon),
  },
  {
    path: "/admin/document",
    name: "Document Requested",
    icon: createElement(ShoppingBagOutlinedIcon),
    activeIcon: createElement(ShoppingBagIcon),
  },
  {
    path: "/admin/vacancies",
    name: "Vacancies",
    icon: createElement(CategoryOutlinedIcon),
    activeIcon: createElement(CategoryIcon),
  },
  {
    path: "/admin/news",
    name: "News",
    icon: createElement(ManageAccountsOutlinedIcon),
    activeIcon: createElement(ManageAccountsIcon),
  },
  {
    path: "/admin/vacancies/cv",
    name: "Received CV ",
    icon: createElement(ManageAccountsOutlinedIcon),
    activeIcon: createElement(ManageAccountsIcon),
  },
];
