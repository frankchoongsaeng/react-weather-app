import React from 'react';

function History(props) {

    function logOut() {
        props.setLoggedIn(false)
    }

    function handleHistorySelect(historyIndex) {
        alert("that functionality is coming soon");
    }

    console.log(props.historyList);

    return (
        
        <div className="history-list-container">
            <div className="history-list-header">
                <h2>History</h2>
                <p className="info">Select a history to view it's data</p>
            </div>
            <div className="history-list-body">

                {props.historyList.map( (item, index) => {
                    
                    return(
                        <div onClick={() => handleHistorySelect(index)} className="history-list-item" key={index}>
                            <p className="history-list-item-time">
                                <date>{item.location.localtime}</date>
                                <location>{item.location.name}</location>
                            </p>
                            <p className="history-list-item-icon">
                                <i className="wi wi-day-cloudy"></i>
                            </p>
                            <p className="history-list-item-temperature">{item.current.temperature}</p>
                        </div>
                    );
                })}

                
            </div>
            <div className="history-list-footer has-text-centered">
                <a className="is-link" onClick={logOut}>Log out</a>
            </div>
        </div>
    );
}

export default History;