import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import Upload from "./pages/Upload";
import Analysis from "./pages/Analysis";
import Dashboard from "./pages/Dashboard";
import Compare from "./pages/Compare";
import VoiceFeedback from "./pages/VoiceFeedback";
import InterviewQuestions from "./pages/InterviewQuestions";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/upload",
    Component: Upload,
  },
  {
    path: "/analysis",
    Component: Analysis
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/compare",
    Component: Compare,
  },
  {
    path: "/voice-feedback",
    Component: VoiceFeedback,
  },
  {
    path: "/interview-questions",
    Component: InterviewQuestions,
  },
]);