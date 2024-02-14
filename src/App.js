import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import { ParallaxProvider, Parallax } from 'react-scroll-parallax'; // Import Parallax along with ParallaxProvider
import SMSForm from './SMSForm';
// import { useParallax } from 'react-scroll-parallax';

// const ComponentWithParallax = () => {
//   const { ref } = useParallax({ speed: 10 });
//   return <div ref={ref} className="my-thing" />;
// };

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <ParallaxProvider> */}
            <SMSForm />
          {/* </ParallaxProvider> */}
        </header>
      </div>
    );
  }
}

export default App;
