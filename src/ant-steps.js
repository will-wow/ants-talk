import React from 'react';

import { Slide, Heading, ListItem, List, Notes } from 'spectacle';

const isItemBold = boldItems => item => {
  if (!boldItems) return false;
  return boldItems.includes(item);
};

export default function AntSteps({ name, image, bold, notes }) {
  const isBold = isItemBold(bold);

  return (
    <Slide bgImage={image} bgDarken="0.5">
      <Heading fit>{name}</Heading>
      <List textColor="primary">
        <ListItem bold={isBold(1)}>Wander the area</ListItem>
        <ListItem bold={isBold(2)}>Keep track where you are</ListItem>
        <ListItem bold={isBold(3)}>Come across food</ListItem>
        <ListItem bold={isBold(4)}>Grab some</ListItem>
        <ListItem bold={isBold(5)}>Head straight home</ListItem>
        <ListItem bold={isBold(6)}>Leave a pheromone trail behind</ListItem>
        <ListItem bold={isBold(7)}>Drop off food</ListItem>
        <ListItem bold={isBold(8)}>Go back for more</ListItem>
      </List>

      <Notes>{notes}</Notes>
    </Slide>
  );
}
