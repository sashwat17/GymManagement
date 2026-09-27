import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { TrainerLayout } from "./components/TrainerLayout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Workouts } from "./pages/Workouts";
import { Profile } from "./pages/Profile";
import { Notifications } from "./pages/Notifications";
import { TrainerDashboard } from "./pages/trainer/TrainerDashboard";
import { TraineeManagement } from "./pages/trainer/TraineeManagement";
import { WorkoutAssignment } from "./pages/trainer/WorkoutAssignment";
import { WorkoutManagement } from "./pages/trainer/WorkoutManagement";
import { TrainerProfile } from "./pages/trainer/TrainerProfile";
import { TrainerNotifications } from "./pages/trainer/TrainerNotifications";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "workouts", Component: Workouts },
      { path: "profile", Component: Profile },
      { path: "notifications", Component: Notifications },
    ],
  },
  {
    path: "/trainer",
    Component: TrainerLayout,
    children: [
      { index: true, Component: TrainerDashboard },
      { path: "trainees", Component: TraineeManagement },
      { path: "assign", Component: WorkoutAssignment },
      { path: "workouts", Component: WorkoutManagement },
      { path: "profile", Component: TrainerProfile },
      { path: "notifications", Component: TrainerNotifications },
    ],
  },
]);
