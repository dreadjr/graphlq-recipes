import * as React from 'react';
import Toggle from './Toggle';

export default class ToggleTest extends React.Component {
  public render() {
    return (
      <>
        <Toggle>
          {({ on, onToggle }: any) => (
            <>
              {on && <h1 style={{ color: 'green' }}>Show Me</h1>}
              <button onClick={onToggle}>Show / Hide</button>
            </>
          )}
        </Toggle>
        <Toggle>
          {({ on, onToggle }) => (
            <>
              {on && <h1 style={{ color: 'blue' }}>I'm a different H1!</h1>}
              <button onClick={onToggle}>Show Different H1</button>
            </>
          )}
        </Toggle>
      </>
    );
  }
}
