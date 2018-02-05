all_coords()
|> Task.async_stream(fn {x, y} ->
  decay_pheromones(sim, x, y)
end)
|> Enum.map(fn {:ok, tile} -> tile end)