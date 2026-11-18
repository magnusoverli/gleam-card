/** Shared, overridable visual tokens for every Gleam card's shadow root. */
export const foundationStyles = `
  :host {
    color-scheme: dark;
  }
  button, input, select, summary { -webkit-tap-highlight-color: transparent; }
  :is(button, input, select, summary):focus-visible {
    outline: 2px solid var(--gleam-focus, #7eeaff);
    outline-offset: 3px;
  }
`;
