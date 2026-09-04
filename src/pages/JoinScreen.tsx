import './JoinScreen.css'

function JoinScreen() {
    return (
        <div className="container">

            <h1>Calm Painter</h1>

            <div className="userInput">
                <label>Username:</label>
                <input type="text" placeholder="..."></input>
                <button>Join Game</button>
            </div>

            <div className="players">
                <div className="playerList">
                    <label>Players: 4/4</label>
                    <ul>
                        <li><span className="dot red"></span> Dali</li>
                        <li><span className="dot blue"></span> van Gogh</li>
                        <li><span className="dot green"></span> Monet</li>
                        <li><span className="dot yellow"></span> Picasso</li>
                    </ul>
                </div>
                <button>Start Game</button>
            </div>
        </div>
    )
}

export default JoinScreen