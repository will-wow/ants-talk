def ant_move(ant = %Ant{food?: false}) do
  cond do
    see_food? -> grab_food(ant)
    see_strong_pheromone? -> move_to_pheromone(ant)
    see_weak_pheromone? -> ant_move(ant)
    true -> ant_move(ant)
  end
end

def ant_move(ant = %Ant{food?: true}) do
  if at_home do
    ant
    |> drop_off_food()
    |> ant_move()
  else
    ant
    |> deposit_pheromone()
    |> ant_move()
  end
end