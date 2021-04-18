import React from 'react';
import { AuthkProvider } from './authk';

const AppProvider: React.FC = ({ children }) => (
  <AuthkProvider>{children}</AuthkProvider>
);

export default AppProvider;
