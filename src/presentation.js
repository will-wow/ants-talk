import React from 'react';

import {
  CodePane,
  Deck,
  Heading,
  Image,
  List,
  ListItem,
  Notes,
  Quote,
  S,
  Slide,
  Text
} from 'spectacle';

// Import theme
import createTheme from 'spectacle/lib/themes/default';

import AntSteps from './AntSteps';
import CiteLink from './CiteLink';

// Require CSS
require('normalize.css');

const theme = createTheme(
  {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quarternary: '#CECECE'
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica'
  }
);

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transitionDuration={500} theme={theme}>
        <Slide bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            A Swarm of Processes
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            Simulating Ant Foraging Behavior with OTP
          </Text>

          <Notes>
            Hi, I'm Will! I'm a developer at Carbon Five, here in our LA office.
            You already heard Andrew's pitch so I won't give you that again.
            Unless you want to work for us, in which case I totally will later.
            Anyway I'm also almost always at the Elixir LA meetups in Santa
            Monica, so if you want to chat and we don't get a chance here, maybe
            I'll see you there!
            <br />
            So! A swarm of processes...
          </Notes>
        </Slide>

        <Slide bgImage="./img/ant-1.jpg" bgDarken="0.5">
          <Heading size={2} textColor="primary">
            Ants
          </Heading>

          <Notes>Today, we're going to talk about ants.</Notes>
        </Slide>

        <Slide
          transition={['fade']}
          bgColor="tertiary"
          bgImage="./img/ants-line.jpg"
          bgDarken="0.5"
        >
          <Heading size={2} textColor="primary">
            Swarms of Ants
          </Heading>
          <Notes>Swarms of ants</Notes>
        </Slide>

        <Slide transition={['fade']} bgColor="primary" textColor="tertiary">
          <Heading size={2}>Also Elixir things</Heading>

          <List>
            <ListItem>Processes</ListItem>
            <ListItem>GenServer</ListItem>
            <ListItem>Registry</ListItem>
            <ListItem>DynamicSupervisor</ListItem>
            <ListItem>Contexts</ListItem>
            <ListItem>Types</ListItem>
          </List>

          <Notes>
            And, because you paid to go to an Elixir conference, we'll talk
            about some elixir stuff too, like:
            <ul>
              <li>Processes</li>
              <li>GenServers</li>
              <li>Registries</li>
              <li>DynamicSupervisors</li>
              <li>Contexts</li>
              <li>and Types</li>
            </ul>
          </Notes>
        </Slide>

        <Slide transition={['fade']} bgImage="./img/ant-2.jpg" bgDarken="0.5">
          <Heading size={2} textColor="primary">
            But mostly ants
          </Heading>
          <Notes>
            But mostly ants.<br />
            Now, a great man once said:
          </Notes>
        </Slide>

        <Slide>
          <Image src="./img/mib-people-are-dumb.gif" />
          <Notes>
            A person is smart. People are dumb, panicky, dangerous animals, and
            you know it.
            <br />
            <br />
            Luckily, we're not talking about people today. We're talking about
            ants, and they're just the opposite.
          </Notes>
        </Slide>

        <Slide bgColor="secondary">
          <Quote>
            An ant is dumb. A colony is a smart, efficient, coordinated group.
          </Quote>
          <Text size={4} margin="10px 0 0" textColor="tertiary">
            So how do they do it?
          </Text>
          <Notes>
            "An ant is dumb. (Apologies to any ants in the room). A colony is a
            smart, efficient, coordinated group." So how do they do it?
          </Notes>
        </Slide>

        <Slide>
          <Heading>Pheromones</Heading>

          <Notes>
            The answer, in short, is pheromones. Now, ants are a diverse set of
            creatures, but here's one common strategy:
          </Notes>
        </Slide>

        {AntSteps({
          name: 'Alice the Ant',
          image: './img/ant-1.jpg',
          bold: [1],
          notes: `
            Let's follow an Ant named Alice. Alice - who, like all worker ants, is
            female - wanders the world in a semi-random way, searching for food.
          `
        })}

        {AntSteps({
          name: 'Alice the Ant',
          image: './img/ant-1.jpg',
          bold: [2],
          notes: `
          But where ever Alice goes, she's generally able to keep track of where
          she is. Scientists think that some ants can keep track of landmarks,
          and others actually count their steps and know their location by dead
          reckoning. We know this because some scientists attached tiny stilts
          to ant legs (don't ask me how, and tragically I couldn't find
          pictures). They found that the ants overshot their colony when
          returning to it, because their step counts and distance were off.
          `
        })}

        {AntSteps({
          name: 'Alice the Ant',
          image: './img/ant-1.jpg',
          bold: [3, 4, 5],
          notes: `
            In any case, once Alice comes across food, she picks up a piece, and
            heads back home. Since she knows where she is, she's able to take a
            pretty direct path back.
          `
        })}

        {AntSteps({
          name: 'Alice the Ant',
          image: './img/ant-1.jpg',
          bold: [6],
          notes: `
            But when Alice is traveling with food, she leaves a pheromone
            trail behind her, which other ants can smell. For some ants, the
            mechanism is just the food weighing them down enough to make their
            stingers drag across the ground.
          `
        })}

        {AntSteps({
          name: 'Alice the Ant',
          image: './img/ant-1.jpg',
          bold: [7, 8],
          notes: `
            In any case, once Alice drops the food off, she can head back out.
          `
        })}

        {AntSteps({
          name: 'Bobbie the Mediocre Scout',
          image: './img/ant-2.jpg',
          notes: `
            Now let's follow Bobbie, another ant. She follows the same steps,
            but happens to find food that's twice as far out as Alice's. Still, she takes it back, leaving a pheromone trail behind her. 
          `
        })}

        <Slide>
          <Heading>Pheromones evaporate</Heading>

          <Notes>
            But there's an important caveat - pheromone trails evaporate over
            time. So because Bobbie's trip takes twice as long, Bobbie is laying
            down half the pheromones than Alice is for a given hour of
            collecting. And because the pheromones evaporate over time, Bobbie's
            trail will never get that strong.
          </Notes>
        </Slide>

        <Slide bgImage="./img/ant-3.jpg" bgDarken="0.5">
          <Heading fit>Eve the Follower</Heading>

          <List textColor="primary">
            <ListItem>Wander the area</ListItem>
            <ListItem>If pheromones found:</ListItem>
            <ListItem>Decide to follow them if they're strong</ListItem>
            <ListItem>Otherwise keep wandering</ListItem>
          </List>

          <Notes>
            This is important for our last ant, Eve. It turns out, there's
            another step in the ant algorithm Alice and Bobbie are following -
            if, while wandering, they come across a pheromone trail, they may
            decide to follow it to food, depending on how strong the trail is.
          </Notes>
        </Slide>
        <Slide>
          <Heading fit>Bringing to Together</Heading>
          <Image src="./img/aco-image.png" />

          <CiteLink href="https://en.wikipedia.org/wiki/File:Knapsack_ants.svg" />

          <Notes>
            Now we see how this comes together. If in Eve's wandering she comes
            across Bobbie's weak trail, she may choose to pass it by. But when
            she comes across Alice's strong trail, she knows there's food close
            by, and she's more likely to get on the trail. Over time, more and
            more ants make that same choice, and so eventually the colony forms
            up and quickly collects the closest food. Then, once the food has
            been collected, Alice's trail evaporates, and perhaps the ants will
            find Bobbie's trail and focus on it next.
          </Notes>
        </Slide>

        <Slide>
          <Heading>Recruitment Strategy</Heading>

          <Notes>
            This is known as a recruitment strategy - a way for members of a
            swarm to tell other members - "hey, I found something good, help me
            out."
          </Notes>
        </Slide>

        <Slide>
          <Heading>That's cool (maybe). So what?</Heading>

          <Notes>
            So that's more or less how ants work! Which is interesting, maybe.
            But as a developer, what's maybe more interesting is that what Alice
            and Eve and all were doing looked a lot like code.
          </Notes>
        </Slide>

        <Slide>
          <Heading fit>Alice in Pseudo Code</Heading>
          <CodePane lang="elixir" source={require('./code/pseudo-ant.ex')} />
          <Notes>
            In fact, it's pretty straightforward to translate our ant's
            instructions into some pseudo code like this. There are two main
            cases here - one where the ant doesn't have food, and one where she
            does. In the no food case, if Alice sees food she grabs it, if she
            sees a strong pheromone trail she gets on it, and if she sees a weak
            trail, or nothing, she carries on. <br />
            If Alice is carrying food, then she deposits pheromones and keeps
            going towards on toward home. When she gets home, she drops off the
            food and heads back out. Simple.
          </Notes>
        </Slide>

        <Slide>
          <Heading fit>Marco Dorigo: Ant Fan</Heading>
          <Image src="./img/marco-dorigo.jpg" margin="2rem auto" width="75%" />

          <Notes>
            As it turns out, we're not the first to notice that ants seem
            similar to computer programs. Back in '92, a man named Marco Dorigo
            (who as you can see is into both ants and robots, I can relate) came
            up with what he called the Ant System, for his PhD thesis. This was
            the start of what's now called Ant Colony Optimization, or ACO,
            which is a method of applying Alice's ant algorithm to tricky
            problems like the traveling salesman and knapsack problems.
          </Notes>
        </Slide>

        <Slide>
          <Heading fit>Ant Colony Optimization algorithm</Heading>
          <Image src="./img/aco-formula.svg" margin="2rem auto" width="75%" />

          <Notes>
            This is the general formula for ACO. There's a lot of greek in here,
            but really all it is, is:
          </Notes>
        </Slide>

        <Slide>
          <Heading fit>Ant Colony Optimization algorithm</Heading>
          <Image src="./img/aco-formula.svg" margin="2rem auto" width="75%" />

          <Text>
            <S type="underline">Pheromones * Desirability</S>
            <br />
            Sum(Pheromones * Desirability)
          </Text>

          <Notes>
            For a set of possible moves, the probability of picking one of them
            is the amount of pheromone deposited on the move, to the power of
            some influence factor (2.0 by default), times the desirability of
            the move (which might relate to distance in a traveling salesman
            problem, or value in a knapsack problem), also taken to some factor,
            divided by the sum of the value of all the other available moves.
          </Notes>
        </Slide>

        <Slide>
          <Heading fit>Traveling Salesman Problem</Heading>
          <Image src="./img/salesman.png" />
          <CiteLink href="https://en.wikipedia.org/wiki/File:Aco_TSP.svg" />

          <Notes>
            The traveling salesman problem is a classic hard problem in computer
            science. A traveling salesperson wants to visit a bunch of cities in
            the least time possible. How do they do that? Well it turns out
            there's no easy way to figure it out, but ACO is a pretty good
            approach.
          </Notes>
        </Slide>

        <Slide>
          <Heading fit>Traveling Salesman Problem: ACO Solution</Heading>
          <Image src="./img/aco-salesman.png" />
          <CiteLink href="https://en.wikipedia.org/wiki/File:Aco_TSP.svg" />

          <Notes>
            With Ant Colony Optimization, you have a bunch of ants randomly
            traverse a graph of cities, visiting each one once. Afterwards, each
            ant drops a pheromone trail on its path, with the strength of the
            trail corresponding to how short the trip was. Since the ants use
            the ACO algorithm to choose the moves, over multiple iterations the
            ants coalesce onto an optimal solution. Pretty smart ants!
          </Notes>
        </Slide>

        <Slide>
          <Heading fit>What about Elixir?</Heading>

          <Notes>
            So ACO is an interesting technique - but if you want to do that kind
            of number crunching, Elixir isn't really your ideal language. But a
            few months ago I was reading about ACO (because that's how I roll on
            a Tuesday night), and it got me thinking about something else:
          </Notes>
        </Slide>

        <Slide>
          <Heading fit>Ants seem familiar</Heading>
          <List>
            <ListItem bold>State: (location and has_food)</ListItem>
            <ListItem>Actions: (move, pheromones, food)</ListItem>
            <ListItem>Logic: (state, surroundings) -> state</ListItem>
          </List>
          <Notes>
            An ant's got a little bit of state - it knows its location and if it
            has food.
          </Notes>
        </Slide>

        <Slide>
          <Heading fit>Ants seem familiar</Heading>
          <List>
            <ListItem>State: (location and has_food)</ListItem>
            <ListItem bold>Actions: (move, pheromones, food)</ListItem>
            <ListItem>Logic: (state, surroundings) -> state</ListItem>
          </List>
          <Notes>
            It can take a limited set of actions, like moving, depositing
            pheromones, and grabbing and dropping off food.
          </Notes>
        </Slide>

        <Slide>
          <Heading fit>Ants seem familiar</Heading>
          <List>
            <ListItem>State: (location and has_food)</ListItem>
            <ListItem>Actions: (move, pheromones, food)</ListItem>
            <ListItem bold>Logic: (state, surroundings) -> state</ListItem>
          </List>
          <Notes>
            And the ACO algorithm to determine the ant's next state is just a
            function of the ant's current state and its surroundings, plus some
            randomness. And that means...
          </Notes>
        </Slide>

        <Slide bgImage="./img/actors.jpg" bgDarken="0.5">
          <Heading textColor="primary">Ants are like Actors!</Heading>
          <Notes>
            Ants are like Actors!
            <br />
            Not that kind, but they do fit pretty well into the Actor model that
            Erlang and Elixir use for concurrency. Which got me wondering...
          </Notes>
        </Slide>

        <Slide>
          <Heading size={3}>
            Can you simulate a foraging ant colony using Elixir processes with
            GenServer?
          </Heading>

          <Notes>
            Can you simulate a foraging ant colony using Elixir processes with
            GenServer?
          </Notes>
        </Slide>

        <Slide>
          <Heading fit>(Spoiler alert: yup)</Heading>

          <Notes>
            So the short answer is yes, don't worry, we'll see this actually
            work at the end of the talk. But that's not really the point here.
          </Notes>
        </Slide>

        <Slide>
          <Heading fit>Thinking in OTP</Heading>

          <Notes>
            The point is, if you're like me, you spend most of your time writing
            CRUD applications, even in Elixir, and don't actually explicitly
            drop into OTP that often. When I'm trying to solve a problem, my
            instinct is to reach for database tables and endpoints.<br />
            <br />
            So today, I want to walk you through a "sufficiently complex"
            example of how you might go about building a program where you're
            thinking in actors, supervisors, and data types instead. You might
            not be writing an ant simulation (because how could you compete with
            this one?), but maybe you'll be inspired for your next problem.
          </Notes>
        </Slide>
      </Deck>
    );
  }
}
