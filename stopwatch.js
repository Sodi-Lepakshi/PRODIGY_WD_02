let timer;
let running = false;
let startTime;
let elapsedTime = 0;

function startStop() {
    const button = document.getElementById('startStop');
    if (running) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        button.textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 1000);
        button.textContent = 'Pause';
    }
    running = !running;
}

function reset() {
    clearInterval(timer);
    running = false;
    elapsedTime = 0;
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('startStop').textContent = 'Start';
    document.getElementById('laps').innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = formatTime(Date.now() - startTime + elapsedTime);
        const lapDiv = document.createElement('div');
        lapDiv.textContent = lapTime;
        document.getElementById('laps').appendChild(lapDiv);
    }
}

function updateDisplay() {
    const currentTime = Date.now();
    const timeElapsed = currentTime - startTime + elapsedTime;
    document.getElementById('display').textContent = formatTime(timeElapsed);
}

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number.toString().padStart(2, '0');
}
