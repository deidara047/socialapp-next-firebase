import dynamic from 'next/dynamic';
import React from 'react';
import { ReactElement } from 'react';

const NoSsr = ({ children }: {children: ReactElement}) => <>{children}</>;

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});