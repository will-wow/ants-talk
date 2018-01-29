import React from "react";

import {
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  Notes,
  Image,
  CodePane
} from "spectacle";

// Import theme
import createTheme from "spectacle/lib/themes/default";

import AntSteps from "./antSteps";

// Require CSS
require("normalize.css");

const theme = createTheme(
  {
    primary: "white",
    secondary: "#1F2022",
    tertiary: "#03A9FC",
    quarternary: "#CECECE"
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica"
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
        </Slide>

        <Slide bgImage="./img/ant-1.jpg" bgDarken="0.5">
          <Heading size={2} textColor="primary">
            Ants
          </Heading>

          <Notes>Today, we're going to talk about ants.</Notes>
        </Slide>

        <Slide
          transition={["fade"]}
          bgColor="tertiary"
          bgImage="./img/ants-line.jpg"
          bgDarken="0.5"
        >
          <Heading size={2} textColor="primary">
            Swarms of Ants
          </Heading>
          <Notes>Swarms of ants</Notes>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary" textColor="tertiary">
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

        <Slide transition={["fade"]} bgImage="./img/ant-2.jpg" bgDarken="0.5">
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
          name: "Alice the Ant",
          image: "./img/ant-1.jpg",
          bold: [1],
          notes: `
            Let's follow an Ant named Alice. Alice - who, like all worker ants, is
            female - wanders the world in a semi-random way, searching for food.
          `
        })}

        {AntSteps({
          name: "Alice the Ant",
          image: "./img/ant-1.jpg",
          bold: [2],
          notes: `
          But where ever Alice goes, she's generally able to keep track of where
          she is. Scientists think that some ants can keep track of landmarks,
          and others actually count their steps and know their location by dead
          reckoning. We know this because some scientists attached tiny stilts
          to ant legs (don't ask me how, and tragically I couldn't find
          pictures). They found that the ants overshot their colony when
          returning to it, because their step counts were off.
          `
        })}

        {AntSteps({
          name: "Alice the Ant",
          image: "./img/ant-1.jpg",
          bold: [3, 4, 5],
          notes: `
            In any case, once Alice comes across food, she picks up a piece, and
            heads back home. Since she knows where she is, she's able to take a
            pretty direct path back.
          `
        })}

        {AntSteps({
          name: "Alice the Ant",
          image: "./img/ant-1.jpg",
          bold: [6],
          notes: `
            But when a Alice is traveling with food, she leaves a pheromone
            trail behind her, which other ants can smell. For some ants, the
            mechanism is just the food weighing them down enough to make their
            stingers drag across the ground.
          `
        })}

        {AntSteps({
          name: "Alice the Ant",
          image: "./img/ant-1.jpg",
          bold: [7, 8],
          notes: `
            In any case, once Alice drops the food off, she can head back out.
          `
        })}

        {AntSteps({
          name: "Bobbie the Mediocre Scout",
          image: "./img/ant-2.jpg",
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
            <br />
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
          <CodePane lang="elixir" source={require("./code/pseudo-ant.ex")} />
          <Notes>
            In fact, it's pretty straightforward to translate our ant's
            instructions into some pseudo code like this. There are two main
            cases here - one where the ant doesn't have food, and one where she
            does. In the no food case, if Alice sees food she grabs it, if she
            sees a strong pheromone trail she gets on it, and if she sees a weak
            trail, or nothing, she carries on. <br />
            If Alice is carrying food, then she deposits pheromones and carries
            on toward home. When she gets home, she drops off the food and heads
            back out.
          </Notes>
        </Slide>
      </Deck>
    );
  }
}
