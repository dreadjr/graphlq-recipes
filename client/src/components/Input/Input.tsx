import * as React from 'react';

interface InputProps {
  type?: string;
  name: string;
  placeholder: any;
  value: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

export default (props: InputProps) => (
  <input
    type={props.type}
    placeholder={props.placeholder}
    value={props.value}
    name={props.name}
    onChange={props.onChange}
  />
);
