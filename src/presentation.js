// Import React
import React from 'react';

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  Notes,
  Image
} from 'spectacle';

// Import theme
import createTheme from 'spectacle/lib/themes/default';

// Require CSS
require('normalize.css');

const theme = createTheme(
  {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quartenary: '#CECECE'
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
        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            A Swarm of Processes
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            Simulating Ant Foraging Behavior with OTP
          </Text>
        </Slide>
        <Slide
          transition={['fade']}
          bgColor="tertiary"
          bgImage="./img/ant-1.jpg"
          bgDarken="0.5"
        >
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

        <Slide>
          <Heading size={3}>
            An ant is dumb. A colony is a smart, efficient, coordinated group.
          </Heading>
          <Heading size={4} margin="10px 0 0" textColor="tertiary">
            So how do they do it?
          </Heading>
          <Notes>
            "An ant is dumb. (Apologies to any ants in the room). A colony is a
            smart, efficient, coordinated group." So how do they do it?
          </Notes>
        </Slide>

        <Slide>
          <Heading>Pheromones</Heading>

          <Notes>
            The answer, in short, is pheromones. Now, ants are a diverse set of
            creatures, but one common strategy goes like this:
          </Notes>
        </Slide>

        <Slide>
          <Heading fit>Alice the Ant</Heading>
          <List>
            <ListItem bold>Wander the area</ListItem>
            <ListItem>Keep track where you are</ListItem>
            <ListItem>Come across food</ListItem>
            <ListItem>Grab some</ListItem>
            <ListItem>Head straight home</ListItem>
            <ListItem>Leave a pheromone trail behind</ListItem>
            <ListItem>Drop off food</ListItem>
            <ListItem>Consider going back for more</ListItem>
          </List>

          <Notes>
            Alice the ant - who, like all worker ants, is female - wanders the
            world in a semi-random way, searching for food.
          </Notes>
        </Slide>

        <Slide>
          <Heading fit>Alice the Ant</Heading>
          <List>
            <ListItem>Wander the area</ListItem>
            <ListItem bold>Keep track where you are</ListItem>
            <ListItem>Come across food</ListItem>
            <ListItem>Grab some</ListItem>
            <ListItem>Head straight home</ListItem>
            <ListItem>Leave a pheromone trail behind</ListItem>
            <ListItem>Drop off food</ListItem>
            <ListItem>Consider going back for more</ListItem>
          </List>

          <Notes>
            But where ever Alice goes, she's generally able to keep track of
            where she is. Scientists think that some ants can keep track of
            landmarks, and others actually count their steps and know their
            location by dead reckoning - they know this because some scientists
            attached tiny stilts to ant legs (don't ask me how, and tragically I
            couldn't find pictures). They found that the ants overshot their
            colony when returning to it, because their step counts were off.
          </Notes>
        </Slide>

        <Slide>
          <Heading fit>Alice the Ant</Heading>
          <List>
            <ListItem>Wander the area</ListItem>
            <ListItem>Keep track where you are</ListItem>
            <ListItem bold>Come across food</ListItem>
            <ListItem bold>Grab some</ListItem>
            <ListItem bold>Head straight home</ListItem>
            <ListItem>Leave a pheromone trail behind</ListItem>
            <ListItem>Drop off food</ListItem>
            <ListItem>Consider going back for more</ListItem>
          </List>

          <Notes>
            In any case, once an ant comes across food, they pick up a piece,
            and head back home. Since they know where they are, they're able to
            take a pretty direct path back.
          </Notes>
        </Slide>

        <Slide>
          <Heading fit>Alice the Ant</Heading>
          <List>
            <ListItem>Wander the area</ListItem>
            <ListItem>Keep track where you are</ListItem>
            <ListItem>Come across food</ListItem>
            <ListItem>Grab some</ListItem>
            <ListItem>Head straight home</ListItem>
            <ListItem bold>Leave a pheromone trail behind</ListItem>
            <ListItem>Drop off food</ListItem>
            <ListItem>Consider going back for more</ListItem>
          </List>

          <Notes>
            But when an ant is traveling with food, she leaves a pheromone trail
            behind her, which other ants can smell. For some ants, the mechanism
            is just the food weighing them down enough to make their stingers
            drag across the ground.
          </Notes>
        </Slide>

        <Slide>
          <Heading fit>Alice the Ant</Heading>
          <List>
            <ListItem>Wander the area</ListItem>
            <ListItem>Keep track where you are</ListItem>
            <ListItem>Come across food</ListItem>
            <ListItem>Grab some</ListItem>
            <ListItem>Head straight home</ListItem>
            <ListItem>Leave a pheromone trail behind</ListItem>
            <ListItem bold>Drop off food</ListItem>
            <ListItem bold>Consider going back for more</ListItem>
          </List>
          <Notes>
            In any case, once the ant drops the food off, she can head back out.
          </Notes>
        </Slide>

        <Slide>
          <Heading fit>Bobbie the Mediocre Scout</Heading>

          <List>
            <ListItem>
              - Also wandered into food - But it's further away - Bring it back
              - Leave a trail - Trail partially evaporates
            </ListItem>
          </List>
        </Slide>
      </Deck>
    );
  }
}
