import * as React from 'react';

import {
  ToggleProps,
  ToggleState
} from '../../interfaces/Toggle/toggle.interface';

export class Toggle extends React.Component<ToggleProps, ToggleState> {
  public state: ToggleState = {
    isOn: false
  };

  public onToggleHandler = () => {
    this.setState(prevState => ({
      isOn: !prevState.isOn
    }));
  };

  public render() {
    const { children } = this.props;
    const { isOn } = this.state;

    return children({
      on: isOn,
      onToggle: this.onToggleHandler
    });
  }
}
