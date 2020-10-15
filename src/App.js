import React, { useEffect, useState } from 'react';
import Login from './Components/LoginForm';
import History from './Components/History';
import Weather from './Components/Weather';


const users = {
  "frankchoongsaeng@gmail.com" : {
    password: "12345",
    history: []
  },
  "frankchoongsaeng@yahoo.com" : {
    password: "54321",
    history: []
  }
}

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  function userLoggedIn(loginStatus, userId=null) {
    setLoggedIn(loginStatus);

    if(userId) {
      setCurrentUser(userId);
    }
  }

  function handleDataChange(newWeatherData) {
    setWeatherData(newWeatherData);
    setSearchHistory(searchHistory.concat([newWeatherData]));
  }

  useEffect(()  => {
    if(loggedIn & currentUser) {
      setSearchHistory(users[currentUser]);
    }
  }, [loggedIn])

  useEffect(() => {
    
    console.log("history list has been updated: " + searchHistory)
    if(currentUser && loggedIn)
      users[currentUser].history = searchHistory;
  }, [searchHistory])

  return (
    <div className="app columns" >
      <div className="column main-section">
        <Weather onDataReady={ handleDataChange } />
      </div>

      <div className="column left-section is-centered is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
        { 
          loggedIn ? 
          <History setLoggedIn={userLoggedIn} historyList={searchHistory} /> :
          <Login setLoggedIn={userLoggedIn} users={users}/>
        }
      </div>
      
    </div>
  );
}

export default App;
