import { FlowProps } from 'solid-js';


const HeaderButton = ({ children }: FlowProps) => {
  return <button class="headerButton">
    {children}
  </button>;
};

export default HeaderButton;
