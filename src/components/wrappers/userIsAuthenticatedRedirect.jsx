import React from 'react';
import Unauthenticated from '../Unauthenticated/Unauthenticated';

function userIsAuthenticatedRedirect (Component) {
    return class extends React.Component {
      render() {
          if(!localStorage.getItem('access_token')){
              return <Unauthenticated />
          }
          else{
              return <Component />
          }
      }
    }
  }
  export default userIsAuthenticatedRedirect;