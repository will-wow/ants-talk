import React from 'react';

import { Deck } from 'spectacle';

// Import theme
import createTheme from 'spectacle/lib/themes/default';

import IntroSlides from './sections/IntroSlides';
import AliceBobbieEveSlides from './sections/AliceBobbieEveSlides';
import AcoSlides from './sections/AcoSlides';
import OtpIntroSlides from './sections/OtpIntroSlides';

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
        {IntroSlides}
        {AliceBobbieEveSlides}
        {AcoSlides}
        {OtpIntroSlides}
      </Deck>
    );
  }
}
