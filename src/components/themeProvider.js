/*
 * Copyright 2020 chaosmesh GmbH. All rights reserved.
 */

import {ThemeProvider as EmotionThemeProvider} from "emotion-theming";
import * as React from "react";
import './styles.css';

export default function ThemeProvider({children}) {
  return (
    <EmotionThemeProvider theme={{}}>
      {children}
    </EmotionThemeProvider>
  );
}
