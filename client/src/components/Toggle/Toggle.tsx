import * as React from 'react';

interface InjectedToggleProps {
  on: boolean;
  onToggle: () => void;
}

interface ToggleProps {
  children(props: InjectedToggleProps): JSX.Element;
}

interface ToggleState {
  isOn: boolean;
}

export default class Toggle extends React.Component<ToggleProps, ToggleState> {
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
