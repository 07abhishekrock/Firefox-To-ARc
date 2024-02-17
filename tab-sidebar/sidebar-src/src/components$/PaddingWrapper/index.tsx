import { FlowProps } from 'solid-js';


const PaddingWrapper = ({ children, grow }: FlowProps<{grow?: number}>) => {

  return <div class="padding-wrapper"
    style={
      {
        ['flex-grow']: grow,
        ['flex-shrink']: 0
      }
    }
  >
    {children}
  </div>;
};

export default PaddingWrapper;
