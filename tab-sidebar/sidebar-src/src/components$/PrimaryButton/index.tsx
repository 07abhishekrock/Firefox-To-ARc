import { FlowProps } from 'solid-js';


const PrimaryButton = ({ children, onClick }: FlowProps & {
  onClick: ()=>void;
}) => {
  return <button class="custom_button custom_button__primary"
    onClick={onClick}
  >
    {children}
  </button>;
};

export default PrimaryButton;
