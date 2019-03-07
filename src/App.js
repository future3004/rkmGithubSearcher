import React, { Component } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css";
import Github from './Github';
import Header from './Components/Header';
import auth0 from 'auth0-js';
import Auth0Lock from "auth0-lock";

// class App extends Component {
//
//   constructor(props){
//     super(props);
//
//     this.state = {
//       idToken: '',
//       profile: {}
//     };
//     this.login = this.login.bind(this);
//     this.handleAuthentication = this.handleAuthentication.bind(this);
//     this.setSession = this.setSession.bind(this);
//   }
//
//   auth0 = new auth0.WebAuth({
//   domain: 'richardkm.auth0.com',
//   clientID: 'hWHv16MKA44KMsGH3nkctwWbpaW4gXM3',
//   redirectUri: 'http://localhost:3000',
//   responseType: 'token id_token',
//   scope: 'openid'
// });
//
// login() {
//   this.auth0.authorize();
// }
//
//   // static defaultProps = {
//   //   domain: 'richardkm.auth0.com',
//   //   clientID: 'hWHv16MKA44KMsGH3nkctwWbpaW4gXM3',
//   // }
//
//   handleAuthentication() {
//     this.auth0.parseHash((err, authResult) => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//
//       this.setSession(authResult);
//       this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
//         console.log('user info: ', user);
//     });
//   })
// }
//
// setSession(authResult) {
//  if (authResult && authResult.accessToken && authResult.idToken) {
//   let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
//   localStorage.setItem('access_token', authResult.accessToken);
//   localStorage.setItem('id_token', authResult.idToken);
//   localStorage.setItem('expires_at', expiresAt);
//   console.log(localStorage);
//  }
//  this.setState({
//    idToken: localStorage.getItem('id_token')
//   });
// }
//
//   componentWillMount(){
//     this.handleAuthentication();
//   }
//
//   // showLock(){
//   //   this.lock.show();
//   // }
//
//
//   render() {
//     return(
//       <div className="App" >
//
//         <Header onLogin={this.login}/>
//
//         <Github />
//
//       </div>
//     );
//   }
// }

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      idToken: '',
      //profile: {}
    };
    this.login = this.login.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
  //this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  auth0 = new auth0.WebAuth({
    domain: 'richardkm.auth0.com',
    clientID: 'hWHv16MKA44KMsGH3nkctwWbpaW4gXM3',
    redirectUri: 'https://infallible-hamilton-bfa3e4.netlify.com/',  // --> for production
    responseType: 'token id_token',
    scope: 'openid'
  });

  //redirectUri: 'http://localhost:3000'--> for dev, //https://infallible-hamilton-bfa3e4.netlify.com/ --> for production

  login() {
   this.auth0.authorize();
 }

 handleAuthentication() {
  this.auth0.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      //this.setSession(authResult);
      this.setProfile(authResult.idToken, authResult.user);
    } else if (err) {
      //history.replace('/home');
      console.log(err);
      //alert(`Error: ${err.error}. Check the console for further details.`);
    }
  });
}

  // static defaultProps = {
  //   clientID: 'hWHv16MKA44KMsGH3nkctwWbpaW4gXM3',
  //   domain: 'richardkm.auth0.com'
  // }

  componentWillMount(){
    // this.lock = new Auth0Lock(this.props.clientID, this.props.domain);
    //
    // this.lock.on('authenticate', (authResult) => {
    //   // console.log(authResult);
    //
    //   this.lock.getProfile(authResult.idToken, (error, profile) => {
    //     if(error){
    //       console.log(error);
    //       return;
    //     }
    //     // console.log(profile);
    //
    //     this.setProfile(authResult.idToken, profile);
    //
    //   });
    //
    // });
    this.handleAuthentication();
    this.getProfile();
  }

  setProfile(idToken, profile){
    localStorage.setItem('idToken', idToken);
    //localStorage.setItem('profile', JSON.stringify(profile));

    this.setState({
      idToken: localStorage.getItem('idToken'),
      //profile: JSON.parse(localStorage.getItem('profile'))
    });
  }

  getProfile(){
    if(localStorage.getItem('idToken') != null){
      this.setState({
        idToken: localStorage.getItem('idToken'),
      //  profile: JSON.parse(localStorage.getItem('profile'))
      }, () => {
        console.log(this.state);
      });
    }
  }


  // showLock(){
  //   this.lock.show();
  // }


  logout(){
    this.setState({
      idToken: '',
      //profile: ''
    }, () => {
      localStorage.removeItem('idToken');
      //localStorage.removeItem('profile');

    });
  }



  render() {
    let gitty;

    if(this.state.idToken){
      gitty = <Github />
    } else{
      gitty = "Click on Login to view Github Viewer"
    }

    return (
      <div className="App">
        <Header
          idToken={this.state.idToken}
          onLogout={this.logout.bind(this)}
          onLogin={this.login}
           />
         {gitty}
      </div>
    );
  }
}



export default App;
