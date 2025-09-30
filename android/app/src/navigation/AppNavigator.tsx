import React from 'react';
import {ProtectedNav} from './ProtectedNav';
import {AuthNav} from './AuthNav';
import {AuthContext} from './AppContext';

export const AppNavigator = () => {
  const {isAuthenticated} = React.useContext(AuthContext);

  return <>{isAuthenticated ? <ProtectedNav /> : <AuthNav />}</>;
};
