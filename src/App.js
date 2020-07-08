import React, { useState, useEffect, Component } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Body from './components/Body';
import axios from 'axios';

class App extends Component {
  /*
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data);
      console.log(data);
    });
  }, []);
  */
  
  
  render() {
    return (
      <React.Fragment>
      
        <header>
          <Header />
        </header>
        <main>
          <Body />
        </main>
        <footer className="page-footer ">
          <div className="container">
            <Footer />
          </div>
        
        </footer>
  
      </React.Fragment>
    
    );
  }
}

export default App;
