import React from 'react';
import Unauthenticated from '../Unauthenticated/Unauthenticated';
import AuthService from '../../services/AuthService'
import NotFound from '../NotFound/NotFound';

function userIsTeacherRedirect (Component) {
    const user = AuthService.getUser();
    return class extends React.Component {
      render() {
          if(!localStorage.getItem('access_token')){
              return <Unauthenticated />
          }else if(user.role === 0){
            return <NotFound/>
          }
          else{
              return <Component />
          }
      }
    }
  }
  export default userIsTeacherRedirect;