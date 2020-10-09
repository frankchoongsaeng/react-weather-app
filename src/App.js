import React, { useState } from 'react';
import Login from './Components/LoginForm';
import History from './Components/History';
import Weather from './Components/Weather';

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="app columns" >

      <div className="column main-section" style={{backgroundColor: "red"}}>
        <Weather onDataReady={ () => setWeatherData({'weather': 'sunny'}) } />
      </div>

      <div style={{ backgroundColor: "blue" }}className="column left-section is-centered is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
        { 
          loggedIn ? 
          <History historyList={["one", "two", "three", "four"]}/> :
          <Login onLogin={() => setLoggedIn(!loggedIn)}/>
        }
      </div>
      
    </div>
  );
}

export default App;
