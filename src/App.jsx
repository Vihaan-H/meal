import { useAuth } from "./context/AuthContext";
import MealPlanner from "./components/MealPlanner";

export default function App() {
  const { user } = useAuth();

  if (!user) {
    return <hanko-auth />;
  }

  return <MealPlanner />;
}
