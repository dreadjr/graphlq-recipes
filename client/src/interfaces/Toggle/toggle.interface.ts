interface InjectedToggleProps {
  on: boolean;
  onToggle: () => void;
}

interface ToggleChildrenProps {
  children(props: InjectedToggleProps): JSX.Element;
}

export type ToggleProps = InjectedToggleProps & ToggleChildrenProps;

export interface ToggleState {
  isOn: boolean;
}
