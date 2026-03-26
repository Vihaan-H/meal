import { useMeals } from "../context/MealContext";
import { useState } from "react";

export default function MealPlanner() {
  const { meals, addMeal, deleteMeal } = useMeals();
  const [text, setText] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h1>Meal Planner</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter meal"
      />

      <button onClick={() => addMeal({ recipe: text, day: "Mon", meal_type: "Dinner" })}>
        Add
      </button>

      <ul>
        {meals.map((m) => (
          <li key={m.id}>
            {m.recipe}
            <button onClick={() => deleteMeal(m.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
