import './Timer.css'

type TimerProps = {
    secondsLeft: number
}

function Timer({ secondsLeft }: TimerProps) {
    return (
        <div>
            <label className="text">Time Left</label>
            <label className="time">{secondsLeft}</label>
        </div>
    )
}

export default Timer;