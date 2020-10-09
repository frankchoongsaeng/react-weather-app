import React from 'react';

function History(props) {
    return (
        <div className="columns login">
            <div className="column ">

                <div className="card">
                    <div className="content">
                        <h1>History</h1>
                        <ul>
                            {
                                props.historyList.map((item) => <li>{item}</li>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default History;