import React, { useState } from 'react';

function Login({users, setLoggedIn}) {

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [isLoginError, setIsLoginError] = useState(false);

    function handleUserLogin() {
        let [loggedInStatus, userId] = [null, null];
        if(users[username].password == password) {
            setUsername("");
            setPassword("");
            loggedInStatus = true;
            userId = username;
        } else {
            setIsLoginError(true);
        }
        setLoggedIn(loggedInStatus, userId)
    }

    function hideError() {
        setIsLoginError(false)
    }

    return (
        <div className="columns login">
            <div className="column ">

                <div className="card">
                    <div className="card-image">
                        <figure className="image is-3by1">
                        <img src="https://www.fultonschools.org/cms/lib/GA50000114/Centricity/Domain/1391/weatherbanner.png" alt="Placeholder" />
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                            <img src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698841-icon-114-lock-512.png" alt="Placeholder" /> 
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-2">Login</p>
                        </div>
                        </div>

                        <div className="content">
                            <div className="field">
                                <p className="control has-icons-left has-icons-right">
                                    <input className="input" type="email" placeholder="email" onChange={(e) => setUsername(e.target.value)} value={username}/>
                                    <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>
                                    </span>
                                    <span className="icon is-small is-right">
                                    <i className="fas fa-check"></i>
                                    </span>
                                </p>
                            </div>
                            <div className="field">
                                <p className="control has-icons-left">
                                    <input className="input" type="password" placeholder="Password" value={password} onChange={ (e) => setPassword(e.target.value) }/>
                                    <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                    </span>
                                </p>
                            </div>
                            
                            <div className="field">
                                <p className="control">
                                    <button onClick={handleUserLogin} className="button mt-3 is-fullwidth is-success">Login</button>
                                </p>
                            </div>
                            <div className="notification is-danger" style={{ display: isLoginError ? "block" : "none"}}>
                                <button className="delete" onClick={hideError}></button>
                                Username or password was incorrect
                            </div>
                            <p className="mt-6 is-italic has-text-centered"> Don't have an account? <a href="google.com">Sign Up here</a>. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;