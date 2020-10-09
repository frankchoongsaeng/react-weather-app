import React from 'react';

const user = {
    0 : {
        username: "frankchoongsaeng",
        password: "12345",
    },
}

function Login(props) {
    return (
        <div className="columns login">
            <div className="column ">

                <div className="card">
                    <div className="card-image">
                        <figure className="image is-3by1">
                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4">Login</p>
                            <p className="subtitle is-6">Login to store your search history</p>
                        </div>
                        </div>

                        <div className="content">
                            <div className="field">
                                <p className="control has-icons-left has-icons-right">
                                    <input className="input" type="email" placeholder="Email" />
                                    <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>
                                    </span>
                                    <span className="icon is-small is-right">
                                    <i className="fas fa-check"></i>
                                    </span>
                                </p>
                            </div>
                            <div classNameName="field">
                                <p className="control has-icons-left">
                                    <input className="input" type="password" placeholder="Password" />
                                    <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                    </span>
                                </p>
                            </div>
                            
                            <div className="field">
                                <p className="control">
                                    <button onClick={()=> props.onLogin(true)} className="button mt-3 is-fullwidth is-success">Login</button>
                                </p>
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