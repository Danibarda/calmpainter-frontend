import './ShowingScreen.css'
import { useState, useEffect } from 'react';
import Timer from '../components/Timer';
import '../components/Timer.css'


function ShowingScreen() {

    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(() => {
        if (secondsLeft === 0) return;

        const timeout = setTimeout(() => {
            setSecondsLeft(secondsLeft - 1);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [secondsLeft]);

    return (
        <div className="container">
            <div className="timer">
                <Timer secondsLeft={secondsLeft} />
            </div>

            <h1>Picture to Draw</h1>

            <div className="grid">

            </div>
        </div>
    )
}

export default ShowingScreen
