import { FlowProps } from 'solid-js';


const PaddingWrapper = ({ children }: FlowProps) => {

  return <div class="padding-wrapper">
    {children}
  </div>;
};

export default PaddingWrapper;
