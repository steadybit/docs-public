/*
 * Copyright 2020 chaosmesh GmbH. All rights reserved.
 */

import {ThemeProvider as EmotionThemeProvider} from "emotion-theming";
import * as React from "react";
import Header from './header';
import './styles.css';

export default function ThemeProvider({children, location}) {
  return (
    <div>
      <Header location={location}/>
      <EmotionThemeProvider theme={{}}>
        {children}
      </EmotionThemeProvider>
    </div>
  );
}
