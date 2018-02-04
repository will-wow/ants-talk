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

    <Slide>
      <Heading>ant_move(ant, surroundings)</Heading>

      <List>
        <ListItem>Given surroundings ([Tile.t])</ListItem>
        <ListItem>Rate each tile</ListItem>
        <ListItem>Make weighted random selection with ACO</ListItem>
      </List>

      <Notes>
        Before we figure out anything else, I think the first step is to see how
        an ant will move. Then we can decide how to structure the world to make
        that easy.
      </Notes>
    </Slide>
  </SlideSet>
);
