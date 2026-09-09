import { useState } from "react";

interface JoinFormProps {
    onJoin: (username: string) => void;
}

function JoinForm({ onJoin }: JoinFormProps) {
    const [username, setUsername] = useState("")

    function handleJoin() {
        const trimmedUsername = username.trim();
        if (!trimmedUsername) {
            alert("Please enter a username!")
            return
        }

        onJoin(trimmedUsername);
        setUsername("");
    }

    return (

        <div className="userInput">
            <form id="JoinForm" onSubmit={(e) => {
                e.preventDefault();
                handleJoin();
            }}>
            <label>Enter Username: </label>
            <input placeholder="..." type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <button type="submit">Join Game</button>
            </form>
        </div>

    )
}

export default JoinForm;