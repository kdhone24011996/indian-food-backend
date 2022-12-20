import 'styled-components';
import { Theme } from '@mui/material/styles';
interface CustomTheme {
  bg?: {
    main: string;
    light: string;
  };
  text?: {
    main: string;
    light: string;
  };
  colors: any;
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

declare module '@mui/material/styles' {
  interface Theme extends CustomTheme {}
  interface Palette {
    neutral: {
      main: string;
      // light: string;
    };
    brown: {
      main: string;
      dark: string;
    };
  }
  interface PaletteOptions {}

  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }
  interface ThemeOptions extends CustomTheme {}
}
