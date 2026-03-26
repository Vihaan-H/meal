import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

const MealContext = createContext(null);

export const MealProvider = ({ children }) => {
  const { user } = useAuth();
  const [meals, setMeals] = useState([]);

  const fetchMeals = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("meal_plans")
      .select("*")
      .eq("user_id", user.id);

    setMeals(data || []);
  };

  const addMeal = async (meal) => {
    await supabase.from("meal_plans").insert([{ ...meal, user_id: user.id }]);
    fetchMeals();
  };

  const deleteMeal = async (id) => {
    await supabase.from("meal_plans").delete().eq("id", id);
    fetchMeals();
  };

  useEffect(() => {
    fetchMeals();
  }, [user]);

  return (
    <MealContext.Provider value={{ meals, addMeal, deleteMeal }}>
      {children}
    </MealContext.Provider>
  );
};

export const useMeals = () => useContext(MealContext);
