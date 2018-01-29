import React from 'react';

import { Heading, Notes, Slide, SlideSet } from 'spectacle';

import Steps from '../elements/Steps';

export default (
  <SlideSet>
    <Slide>
      <Heading>Phoenix 1.3 Contexts and You!</Heading>

      <Notes>
        Phoenix 1.3, as you've probably heard, introduces the concept of
        contexts as a way to organize your code. Instead of putting all your
        logic in a flat hierarchy of schemas and controllers, 1.3 encourages you
        to pull your business logic out into separate bundles of related
        structs, functions, and modules, called contexts. In Domain Driven
        Design, where the idea of bounded contexts comes from, they talk about a
        context having high cohesion - all the parts are related - and low
        coupling - contexts have limited dependency on other contexts. There's a
        lot more in Chris MacCord's 1.3 talk, and I'd encourage you to watch it
        if you haven't already.
      </Notes>
    </Slide>

    <Slide>
      <Heading fit>Defining our contexts</Heading>

      <Steps steps={['Ants', 'Worlds', 'Simulations']} />

      <Notes>
        In any case, following 1.3 best practices, we'll start with defining
        some contexts. Coming up with good contexts for your domain in
        definitely an art, and I often find it pretty challenging. But these are
        the three I came up with for this project: Ants, Worlds, and
        Simulations.
      </Notes>
    </Slide>

    <Slide>
      <Heading fit>Defining our contexts</Heading>

      <Steps steps={['Ants']} bold={[1]} />

      <Notes>
        Ants are definitely their own thing. The Ants context will have logic
        for choosing moves based on received locations, and keeping state -
        stuff that ants know how to do.
      </Notes>
    </Slide>

    <Slide>
      <Heading fit>Defining our contexts</Heading>

      <Steps steps={['Ants', 'Worlds']} bold={[2]} />

      <Notes>
        Outside of an ant's sight-line, there's the whole world. It knows about
        locations of food even if no ants do, and can report to an ant what's
        around it. That should definitely be kept separate from the ant code,
        and ants ought to only be able to query data from the world using a
        defined API. Perfect, that's another context.
      </Notes>
    </Slide>

    <Slide>
      <Heading fit>Defining our contexts</Heading>

      <Steps steps={['Ants', 'Worlds', 'Simulations']} bold={[3]} />

      <Notes>
        Finally, outside of the simulated world, there are the mechanics of
        running a simulation - spinning things up, shutting things down,
        assigning ID numbers, and gathering everything up to be displayed. We
        can keep the things we're simulating focused by taking the simulation
        itself into its own context.
      </Notes>
    </Slide>

    <Slide>
      <Heading fit>Defining our contexts</Heading>

      <Steps steps={['Ants', 'Worlds', 'Simulations', 'Shared']} bold={[4]} />

      <Notes>
        I also ended a shared context that holds a grab-bag of stuff used across
        contexts. That's maybe a code smell... or is it a code pheromone?
      </Notes>
    </Slide>

    <Slide>
      <Heading>...or is it a code pheromone?</Heading>

      <Notes>...or is it a code pheromone?</Notes>
    </Slide>

    <Slide>
      <Heading>No.</Heading>

      <Notes>Nope. Okay, moving on...</Notes>
    </Slide>
  </SlideSet>
);
