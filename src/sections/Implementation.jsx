import React from 'react';

import { CodePane, Heading, Notes, Slide, SlideSet } from 'spectacle';

import Steps from '../elements/Steps';

import antGenServer from '../code/ant-gen-server.ex';
import dynamicSupervisor from '../code/dynamic-supervisor.ex';
import simpleOneForOneSupervisor from '../code/simple-one-for-one-supervisor.ex';
import simulationsSupervisorStart from '../code/simulations-supervisor-start.ex';
import simSupeVia from '../code/sim-supe-via.ex';
import tileTask from '../code/tile-task.ex';
import tileGenServer from '../code/tile-gen-server.ex';
import antMove from '../code/ant-move.ex';

const summarySteps = [
  'Skynet will run on the BEAM',
  'Ants are cool',
  'DynamicSupervisors and Registries',
  'Type your structs, name them `t`',
  'Think with processes'
];

export default (
  <SlideSet>
    <Slide>
      <Heading>Implementation</Heading>

      <Notes>
        Now that we've got some types, we can sketch out how our system will
        work. For the most part we're not going to dive into the actual
        implementation of these modules. After all, you probably don't actually
        need to know how to code an ant simulation - because I've already got
        that on lock - but seeing how one goes about organizing a somewhat
        complex OTP app might be interesting.
      </Notes>
    </Slide>

    <Slide
      bgImage="./img/ant-tree_sims-supe.png"
      bgSize="contain"
      bgRepeat="no-repeat"
    >
      <Notes>
        So here's the supervision tree for the application. I want to be able to
        run multiple simulations at once, so the two top-level processes are a
        SimId Agent that keeps track of the ids of the different running
        simulations, and a SimulationsSupervisor, a DynamicSupervisor that can
        spin up many child SimulationSupervisors, and restart them when they
        have errors.
      </Notes>
    </Slide>

    <Slide>
      <Heading fit>:simple_one_for_one Supervisor</Heading>
      <CodePane lang="elixir" source={simpleOneForOneSupervisor} />

      <Notes>
        A quick note on DynamicSupervisors - they're a new addition in Elixir
        1.6, and replace the old :simple_one_for_one Supervisors. Both allow a
        supervisor to supervise many children, created at runtime. But the old
        :simple_one_for_one supervisors had sort of awkward syntax, and could
        only supervise a single type of child, declared in the init phase.
      </Notes>
    </Slide>

    <Slide>
      <Heading fit>DynamicSupervisor</Heading>

      <CodePane lang="elixir" source={dynamicSupervisor} />

      <Notes>
        In contrast, the new DynamicSupervisors have a nicer syntax, and can
        supervise multiple types of children, since they don't declare the child
        type until the start_child call.
      </Notes>
    </Slide>

    <Slide>
      <Heading fit>Naming Processes</Heading>

      <CodePane lang="elixir" source={simulationsSupervisorStart} />

      <Notes>
        Whatever sort of dynamic supervisor you use though, there's a problem -
        naming. To work with an Erlang process, you need to know its name or
        pid. That's easy for processes you only have one instance of, since you
        can give it a global name, often the name of its module, like with the
        SimulationsSupervisor. But for a process you're going to have a bunch
        of, like an Ant, that doesn't work. Instead, we'll need a Registry, and
        a Via Tuple.
      </Notes>
    </Slide>

    <Slide>
      <Heading>Registry</Heading>

      <CodePane
        lang="elixir"
        source="{:via, Registry, {RegistryModule, data}"
      />

      <Notes>
        You can do a few things with registries, but the one that matters here
        is naming processes. Using the Registry, we can construct a via tuple,
        which is a data structure that can uniquely identify a process. That
        way, even if a process is dynamically started, and later throws and
        error and is restarted, getting a new pid, you can still pass messages
        to it. A via tuple has this structure - a three-tuple of the via atom,
        the registry module, and then some identifying tuple that starts with
        the name of a registry you've started. I like to collect all my
        via-tuple-generating functions into one module, so they can share logic.
      </Notes>
    </Slide>

    <Slide
      bgImage="./img/ant-tree_sim-supe.png"
      bgSize="contain"
      bgRepeat="no-repeat"
    >
      <Notes>
        With that, we can start new SimulationSupervisors. Each
        SimulationSupervisor controls the supervisors for a given simulation,
        (super well-named), so they can all be taken down as one unit.
      </Notes>
    </Slide>

    <Slide>
      <Heading fit>SimulationSupervisor Via Tuple</Heading>

      <CodePane
        lang="elixir"
        source="{:via, Registry, {SimRegistry, {sim, :sim}}}"
      />

      <Notes>
        SimulationSupervisors can be referred to by their via tuple, which
        includes the SimRegistry, the simulation's ID, and an atom identifying
        it as a sim.
      </Notes>
    </Slide>

    <Slide>
      <Heading fit>SimulationSupervisor.via</Heading>

      <CodePane lang="elixir" source={simSupeVia} />

      <Notes>
        By convention, a process module can include a function called via that
        returns its via tuple. Because I've collected the via-generating
        functions in a SimRegistry module, that's pretty simple.
      </Notes>
    </Slide>

    <Slide
      bgImage="./img/ant-tree_tile.png"
      bgSize="contain"
      bgRepeat="no-repeat"
    >
      <Notes>
        For each simulation, we have a TileSupervisor that supervises a bunch of
        tiles - 400, for a 20 by 20 grid. Each tile is a GenServer, that holds
        our Tile.t data in state, and can be told to add pheromones or remove
        food from its state.
      </Notes>
    </Slide>

    <Slide>
      <Heading fit>Tile :via tuple</Heading>

      <CodePane
        lang="elixir"
        source="{:via, Registry, {SimRegistry, {sim, :tile, x, y}}}"
      />

      <Notes>
        The via tuple for the tiles includes the x, y coordinates of the tile.
        That's important, because it means that, for an ant at some set of
        coordinates, we can easily look up all the tiles around it, without
        having to loop through a big list.
      </Notes>
    </Slide>

    <Slide>
      <Heading>Updates in Tasks</Heading>

      <CodePane lang="elixir" source={tileTask} />

      <Notes>
        Putting tiles in their own processes also lets us run fetches and
        updates concurrently, which on a multi-core processor could be nice. So
        at the end of a turn, when we want to run the Ant Colony Optimization
        decay function on any pheromone trails, we're able to use elixir's Task
        module to spread out the work, and return when all the requests are
        done.
      </Notes>
    </Slide>

    <Slide>
      <Heading>Tile GenServer Methods</Heading>

      <CodePane lang="elixir" source={tileGenServer} />

      <Notes>
        Once we've got a hold of all the tiles, we can send deposit and
        decay_pheromones to land, take_food to food, and deposit_food to home.
        If say a food tile receives a decay_pheromones message, it pattern
        matches its state, and knows to ignore the message. That way we can just
        send decay_pheromones to every tile without worrying about errors.
      </Notes>
    </Slide>

    <Slide
      bgImage="./img/ant-tree_ant.png"
      bgSize="contain"
      bgRepeat="no-repeat"
    >
      <Notes>
        We also have a process for each ant. But since there's nothing
        identifying about an ant - they move around, so they don't have stable
        x, y coordinates - we need a little AntId Agent to assign each ant an
        ID, and loop through all the IDs when telling ants to move or deposit
        pheromones.
      </Notes>
    </Slide>

    <Slide>
      <Heading>Ant GenServer</Heading>

      <CodePane lang="elixir" source={antGenServer} />

      <Notes>
        The Ant GenServers, like Tiles, keep an Ant.t in memory. They can take
        external commands to move themselves, and, after the move phase, to
        deposit pheromones if the ant has food.
      </Notes>
    </Slide>

    <Slide>
      <Heading fit>Looking around</Heading>

      <CodePane lang="elixir" source={antMove} />

      <Notes>
        To decide where to move, each ant asks the Worlds context for its
        surroundings, which is a list of tiles. The ant does a weighted random
        selection from that list, based on the amount of pheromones on each
        tile, and picks up food if it can. If the ant already has food, since it
        knows where it it, it just got back a square towards home. Since the
        Tile GenServer logic is in the Worlds context, the Ants are able to work
        with tiles without needing to know how they're persisted. So if we
        decided to store tiles in a map, or a database, the Ants context
        wouldn't need to change.
      </Notes>
    </Slide>

    <Slide bgImage="./img/ant-tree.png" bgSize="contain" bgRepeat="no-repeat">
      <Notes>
        Those are the highlight! With this simple supervision tree, we're able
        to spin up 100 ants and 400 tiles, and have them work together in a fun
        way. One thing I found interesting about programming in this
        process-heavy way is that it started feeling a little like OOP. I had
        what were essentially a bunch of instances of ant and tile classes, each
        with its own state, and methods I could call to update them. Is that a
        good or bad thing? It definitely felt more Object Oriented than most
        elixir code I've written. I'm not sure if that's a good thing or a bad
        thing, but it's certainly A thing. Anyway, now that we've gone through
        building this thing, let's see it in action!
      </Notes>
    </Slide>

    <Slide bgImage="./img/ants.gif" bgSize="contain" bgRepeat="no-repeat">
      <Notes>
        And there they go! You can see that the ants scatter around the world at
        first, and a few ants find all the food options. But because the closest
        is a faster trip, the pheromones build up quickly, and pretty soon the
        ants all focus on it. Once they're done, the pheromone trail dies down,
        they disperse, and focus on the further food. Those are some clever
        robo-ants!
      </Notes>
    </Slide>

    <Slide>
      <Heading>What did we learn?</Heading>

      <Notes>So, what did we learn here?</Notes>
    </Slide>

    <Slide bgImage="./img/elixir-terminator.jpg" bdDarken="0.5">
      <Steps textColor="primary" steps={summarySteps} bold={1} />

      <Notes>
        Skynet will run on the BEAM, based on how smart those ants are.
      </Notes>
    </Slide>

    <Slide bgImage="./img/ant-1.jpg" bgDarken="0.5">
      <Steps textColor="primary" steps={summarySteps} bold={2} />
      <Notes>Ants are pretty cool.</Notes>
    </Slide>

    <Slide>
      <Steps steps={summarySteps} bold={3} />
      <Notes>
        DynamicSupervisors and Registries are useful for handing large numbers
        of processes.
      </Notes>
    </Slide>

    <Slide bgImage="./img/mr-t.jpg" bgDarken="0.5">
      <Steps textColor="primary" steps={summarySteps} bold={4} />
      <Notes>
        It's useful to declare the types of your data structures, including
        structs - and you can name the main type in a module T.
      </Notes>
    </Slide>

    <Slide>
      <Steps steps={summarySteps} bold={5} />
      <Notes>
        Try thinking in terms of processes instead of tables. It might or might
        not work, but it's a good starting place.
      </Notes>
    </Slide>

    <Slide>
      <Heading>Thanks!</Heading>
    </Slide>
  </SlideSet>
);
