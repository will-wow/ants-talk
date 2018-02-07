import React from 'react';

import {
  Heading,
  Image,
  Link,
  List,
  ListItem,
  Notes,
  Quote,
  Slide,
  SlideSet,
  Text
} from 'spectacle';

export default (
  <SlideSet>
    <Slide bgColor="primary">
      <Heading size={1} fit caps lineHeight={1} textColor="secondary">
        A Swarm of Processes
      </Heading>
      <Text margin="1px 0 0" textColor="tertiary" size={1} fit bold>
        Simulating Ant Foraging Behavior with OTP
      </Text>

      <Text margin="2rem 0 0">
        <Link href="https://github.com/will-wow/ants">
          github.com/will-wow/ants
        </Link>
      </Text>

      <Notes>
        Hi, I'm Will! I'm a developer at Carbon Five, here in our LA office. You
        already heard Andrew's pitch so I won't give you that again. Unless you
        want to work with or for us, in which case I totally will later. Anyway
        I'm also almost always at the Elixir LA meetups in Santa Monica, so if
        you want to chat and we don't get a chance here, maybe I'll see you
        there!
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
        And, because you paid to go to an Elixir conference, we'll talk about
        some elixir stuff too, like:
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
        A person is smart. People are dumb, panicky, dangerous animals, and you
        know it.
        <br />
        <br />
        Luckily, we're not talking about people today. We're talking about ants,
        and they're just the opposite.
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
  </SlideSet>
);
