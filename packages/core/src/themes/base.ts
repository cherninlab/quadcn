/**
 * Base theme interface
 * This defines the structure of all themes in the system
 */
export interface BaseTheme {
  name: string;
  colors: {
    bg: {
      base: string;
      subtle: string;
      sunken: string;
      elevated: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      disabled: string;
      inverse: string;
    };
    border: {
      default: string;
      subtle: string;
      strong: string;
      focus: string;
    };
    accent: {
      default: string;
      subtle: string;
      muted: string;
      emphasis: string;
    };
    state: {
      info: { bg: string; text: string; border: string };
      success: { bg: string; text: string; border: string };
      warning: { bg: string; text: string; border: string };
      error: { bg: string; text: string; border: string };
    };
  };
}
