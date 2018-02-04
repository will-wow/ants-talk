# A Swarm of Processes: Simulating Ant Foraging Behavior with OTP

## Ants

(Image)

---

Today, we're going to talk about ants.

---

## Swarms of Ants

(Image)

---

Swarms of ants

---

## Also, Elixir things

* Processes
* GenServer
* Registry
* DynamicSupervisor
* Contexts
* Types

---

And, because you paid to go to an Elixir conference, we'll talk about

* Processes
* GenServers
* Registries
* DynamicSupervisors
* Contexts
* and Types

---

## But mostly ants

(PIC)

---

But mostly ants. Now, a great man once said:

---

(MIB PIC)

---

"A person is smart. People are dumb, panicky, dangerous animals and you know it."
Luckily, we're not talking about people today. We're talking about ants, and they're just the opposite

---

### "An ant is dumb. (Apologies to any ants in the room). A colony is a smart, efficient, dangerous, coordinated group and you know it."

---

"An ant is dumb. (Apologies to any ants in the room). A colony is a smart, efficient, dangerous, coordinated group and you know it."
So what do they have figured out?

---

## Pheromones

---

The answer, in short, is pheromones. Now, ants are a diverse set of creatures, but one common strategy goes like this:

---

## Alice the Scout

* Wander the area
* Keep track where you are
* Come across food
* Grab some
* Head straight home
* Leave a pheromone trail behind you
* Consider going back for more

---

Alice the ant - who, like all worker ants, is female - wanders the world in a semi-random way, searching for food. But where ever Alice goes, she's generally able to keep track of where she is. Scientists think that some ants can keep track of landmarks, and others actually count their steps and know their location by dead reckoning - they know this because some scientists attached tiny stilts to ant legs (don't ask me how, and tragically I couldn't find pictures). They found that the ants overshot their colony when returning to it, because their step counts were off.

In any case, eventually our intrepid friend Alice finds some food. Because she knows where she is she's able to take a pretty direct route back home to the colony. But on the way back, she leave a pheromone trail behind, which other ants can smell. At least one ant does this simply because the heavy food weighs them down enough that their stinger drags on the ground, leaving a trail.

## Bobbie the mediocre scout

* Also wandered into food
* But it's further away
* Bring it back
* Leave a trail
* Trail partially evaporates

## Eve the follower

* Wander the area
* Sense Bobbie's trail
* Consider following the trail, but it's too weak
* Find Alice's strong trail, decide to follow it
* Find food
* Bring it back, leaving even more pheromones
* Trail gets stronger

## Ants follow a simple list of instructions

```elixir
def wander do
  case surroundings do
    %Food{} -> go_to_food
    %Pheromone{strength: weak} -> wander
    %Pheromone{strength: strong} -> follow
    %Food{food: food} when food > 0 -> pick_up_and_go_home
    _ -> wander
  end
end
```

Something following simple conditional logic and doing interesting things should make a software developer go hmmm

## Ant Colony Optimization

It also made a mathematician go hmm

## Math is fine, but what about Elixir?

So I was reading about all these things, ants and pheromones and ACO.
I guess a mathematician's mind goes to Traveling Salesman, but as an Elixir dev my mind goes to processes
I realized that an ant acts a lot like a little independent process - it has a little bit of state (location and food), can get a little information about its enviornment,and makes simple logical choices as a function of those two pieces of state, plus some randomness. That led me to wonder:

## Why I got into this (probably not interesting)

So, where does Elixir fit in to all this? Well a few months ago, I
was in search of an OTP project. Like a lot of Elixir devs, I've
done a few Elixir projects - but professionally and personal
projects - but they're mostly just been pretty basic CRUD apps.
Taking input from a user, doing some validation, tossing in a
database, and searching for it later. Obviously there's a little
more to it than that, but certainly nothing you couldn't do with
Rails or something. Now I definitely like working in Elixir a lot
more - the pattern matching, immutable data, contexts, and typespecs
are all big quality of life improvements for me, and the performance
boost is sweet.<br />
But I wanted to dig into what makes the Erlang ecosystem really
special, and that's OTP.<br />So anyway I was reading about all this
Ant Colony Optimization (because that's how I roll on a Tuesday
night), and it got me thinking.

## Can you simulate an ant colony using Elixir processes with GenServer?

### (Spoiler alert: yup)

## Outlining contexts

* Following 1.3 and DDD best practices, I started with modeling my domain, and only later called into it with a simple controller to exposed it to a little react app (written in ReasonML, but that's a topic for another conference)

So following 1.3, what are the main contexts of the app, that are mostly self-contained chunks of logic?

I saw three main ones:

Ants - definitely their own thing. That'll have logic for choosing moves and keeping state - stuff that ants know how to do
Worlds - Outside of an ant's sight-line, there's a whole world. It knows about locations of food even if no ants do, and can report to an ant what's around it. That should definitely be kept separate from the ant code, and they ought to only be able to query data from it using a defined API. Perfect, that's another context.

Finally, outside of the simulated world, there are the mechanics of running a simulation - spinning things up, shutting things down, assigning ID numbers, and gathering everything up to be displayed. We can keep the things we're simulating focused by taking the simulation itself into its own context.

For completeness, I also have a shared context, that holds a grab-bag of stuff used across contexts. That's maybe a code smell... or is it a code pheromone?

No, it's a smell, but what are you going to do.

## Outlining types

Following DDD, the next thing I want to figure out is my data types. Then we can figure out how they get checked and transformed as the sim progresses.

Our main types are ants and tiles.

Ants know know their location, then last move, and if they have food.

```elixir
defmodule Ants.Ants.Ant
  @type t :: %Ant{
          x: integer,
          y: integer,
          food?: boolean
        }

  defstruct x: nil, y: nil, food?: false
end
```

Tiles can be of different types - land can have pheromones on it, food and home have food, and rocks don't have any special data.
The type of the overall Tile module - Tile.t - is one of the four tile types. This is known as a variant, sum type, or tagged union. Whatever you call it, it means you can pattern match on a Tile.t, and run different logic depending on if it's food or land or whatever. This is a foundational concept in typed functional programming languages with Haskell and OCaml

```elixir
defmodule Ants.Worlds.Tile do
  defmodule Land do
    @type t :: %Land{pheromone: float}
    defstruct pheromone: 0
  end

  defmodule Rock do
    @type t :: %Rock{}
    defstruct []
  end

  defmodule Home do
    @type t :: %Home{food: integer}
    defstruct food: 0
  end

  defmodule Food do
    @type t :: %Food{food: integer}
    defstruct food: 0
  end

  @type t :: Land.t() | Rock.t() | Home.t() | Food.t()
end
```

A couple other types - Points and Moves, both of which are defined as pairs of integers, round out our domain objects.
Points are x, y coordinates that start at 0, and Moves are changes to x and y that go from -1 to 1. Even though they're internally represented in the same way, they have different modules so we can have different functions to convert between them, and so that when we're destructing an {x, y}, it's clear what those numbers mean.

```elixir
defmodule Ants.Worlds.Point do
  @type x :: integer
  @type y :: integer
  @type t :: {x, y}
end

defmodule Ants.Ants.Move do
  @type dx :: integer
  @type dy :: integer
  @type t :: {dx, dy}
end
```

Now that we've got some types, we can sketch out how our system will work. For the most part we're not going to dive into the actual implementation of these modules. After all, you probably don't actually need to know how to code an ant simulation - because I've already got that on lock - but seeing how one goes about organizing a somewhat complex OTP app might be interesting.

Order:

* Worlds
  * somehow we have to take that list of tile types, and turn it into some data that we can efficiently read from and update
  * Rejected ideas:
    * big list - but random access is hard, and we don't do appends anyway
    * big tuple - it's fixed length, so random access is good. But then looping through and updating every pheromone would have to happen in a single process, which is lame
* Tiles: Instead, use GenServers - one process for each tile.
  * access each one by sim, x, y, so it's easy to find and update them in parallel
  * use via tuples && registry (explain that)
* TileSupervisor

  * spins up tiles by x, y

* Simulations

  * Start up a sim with a world
    * Show screencap of static world
  * Cool. Now let's get some ants to gather up this food

* Ant GenServer
* AntMove
  * with the actual selection being in TileSelector, show the formula from ACO
  * show simple formula for ToHome
  * show the selection of forward, food, or backward
* Ant Supervisor

* Simulations (2)

  * Add in ants startup
  * .turn
    * every turn, do steps from ACO

* Show final result

IT'S ALIVE! (frankenstein's monster gif)

So, amazingly, this actually works! The ants randomly walk around, and when they find food leave light pheromone trails behind.
Other ants are recruited by the trails, and they quickly form up to gather food, closet first. Pretty slick!

## What did we learn

* ants are cool
* you can manage large nested sets of processes with dynamicSupervisors and registries
* thinking about your domain in terms of types
