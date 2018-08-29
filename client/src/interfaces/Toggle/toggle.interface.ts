interface InjectedToggleProps {
  on: boolean;
  onToggle: () => void;
}

export interface ToggleProps {
  children: (props: InjectedToggleProps) => JSX.Element;
}

export interface ToggleState {
  isOn: boolean;
}
