type TimerProps = {
    secondsLeft: number
}

function Timer({ secondsLeft }: TimerProps) {
    return (
        <div>
            <label>Time Left</label>
            <label>{secondsLeft}</label>
        </div>
    )
}

export default Timer;