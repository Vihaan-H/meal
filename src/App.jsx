import { useAuth } from "./context/AuthContext";
import MealPlanner from "./components/MealPlanner";

export default function App() {
  const { user, login, logout } = useAuth();

  if (!user) {
    if (window.hankoEnabled) {
      return <hanko-auth />;
    }

    return (
      <div style={{ padding: 24 }}>
        <h1>Meal Planner (Fallback Auth)</h1>
        <p>Hanko is not configured or failed to initialize, so fallback auth is active.</p>
        <button
          onClick={() =>
            login({ id: "fallback", name: "Fallback User", email: "demo@example.com" })
          }
        >
          Login as demo user
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>Welcome, {user.name ?? user.email ?? "User"}</span>
        <button onClick={logout}>Logout</button>
      </div>
      <MealPlanner />
    </div>
  );
}
