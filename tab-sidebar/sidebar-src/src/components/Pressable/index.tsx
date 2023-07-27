import React, { ReactNode } from 'react';


const Pressable = ({ children }: {children: ReactNode}) => {
  return <div className="grid place-items-center hover:bg-focusedClr2 rounded-sm">
    {children}
  </div>;
};

export default Pressable;
