// src/constants/menuConfig.js
export const menuConfig = [
  {
    key: "home",
    label: "Home",
    path: "/",
    subItems: [],
  },
  {
    key: "mytimesheet",
    label: "My Timesheet",
    path: "/mytimesheet",
    subItems: [
      { key: "submitTimesheet", label: "Submit Timesheet", path: "/mytimesheet/submit" },
      // Add more sub-items if needed
    ],
  },
  {
    key: "leadersview",
    label: "Leaders View",
    path: "/leadersview",
    subItems: [],
  },
  {
    key: "managerview",
    label: "Manager View",
    path: "/managerview",
    subItems: [
      { key: "viewTeamTimesheets", label: "View Team Timesheets", path: "/managerview/view-team-timesheets" },
      { key: "approveTimesheets", label: "Approve Timesheets", path: "/managerview/approve-timesheets" },
      // Add more sub-items if needed
    ],
  },
  {
    key: "allocations",
    label: "Allocations",
    path: "/allocations",
    subItems: [
      { key: "bizopsdashboard", label: "Overview", path: "/allocations/bizopsdashboard" },
      { key: "employees", label: "Employees", path: "/allocations/employees" },
      { key: "projects", label: "Projects", path: "/allocations/projects" },
    ],
  },
  // Add more main menu items as needed
];
