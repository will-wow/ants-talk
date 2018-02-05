import React from 'react';

import {
  CodePane,
  Heading,
  List,
  ListItem,
  Notes,
  Slide,
  SlideSet
} from 'spectacle';

import antGenServer from '../code/ant-gen-server.ex';
import dynamicSupervisor from '../code/dynamic-supervisor.ex';
import simpleOneForOneSupervisor from '../code/simple-one-for-one-supervisor.ex';
import simulationsSupervisorStart from '../code/simulations-supervisor-start.ex';
import simSupeVia from '../code/sim-supe-via.ex';

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
      bgImage="./img/ants-tree_sims-supe.png"
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
      bgImage="./img/ants-tree_sim-supe.png"
      bgSize="contain"
      bgRepeat="no-repeat"
    >
      <Notes>
        With that, we can start new SimulationSupervisors. Each
        SimulationSupervisor controls the supervisors for a given simulation, so
        they can all be taken down as one unit.
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
      <Heading>SimulationSupervisor.via</Heading>

      <CodePane lang="elixir" source={simSupeVia} />

      <Notes>
        By convention, a process module can include a function called via that
        returns its via tuple. Because I've collected the via-generating
        functions in a SimRegistry module, that's pretty simple.
      </Notes>
    </Slide>

    <Slide>
      <Heading>Ant GenServer</Heading>

      <CodePane lang="elixir" source={antGenServer} />

      <Notes>
        We've already got the structure of an ant figured out, so converting
        that Ant module into a GenServer is pretty straightforward. The ants
        will take external commands to move themselves, and once the move phase
        is complete for each ant, to deposit pheromones if the ant has food.
      </Notes>
    </Slide>

    <Slide>
      <Heading>ant_move(ant, surroundings)</Heading>

      <List>
        <ListItem>Given surroundings ([Tile.t])</ListItem>
        <ListItem>Rate each tile with ACO</ListItem>
        <ListItem>Make weighted random selection</ListItem>
      </List>

      <Notes>
        Before we figure out anything else, I think the first step is to see how
        an ant will move. Then we can decide how to structure the world to make
        that easy. Ants need to be able to get a list of their immediate
        surroundings, so they can rate each tile using the ant colony
        optimization formula, and then make a weighted random selection.
      </Notes>
    </Slide>
  </SlideSet>
);
