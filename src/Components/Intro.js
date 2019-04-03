import React, { Component } from 'react';
import Footer from './Footer';

class Intro extends Component {
  render() {
    return (
      <div>
        <h3 style={{marginTop: '50px'}}>Click on Login to search Github Users profile</h3>

       <div style={{height: '500px'}}></div>

       <Footer />

      </div>
    );
  }
}

export default Intro;
