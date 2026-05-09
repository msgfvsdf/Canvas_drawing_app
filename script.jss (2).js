const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const lineWidthInput = document.getElementById('lineWidth');
const clearBtn = document.getElementById('clearBtn');

// Set canvas size
canvas.width = window.innerWidth * 0.8;
canvas.height = 600;

let painting = false;

function startPosition(e) {
    painting = true;
    draw(e); // Allows for single dots
}

function finishedPosition() {
    painting = false;
    ctx.beginPath(); // Resets the path so lines don't connect weirdly
}

function draw(e) {
    if (!painting) return;

    // Styling the "ink"
    ctx.lineWidth = lineWidthInput.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colorPicker.value;

    // Get correct mouse coordinates relative to canvas
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Event Listeners
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);

// Clear Functionality
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});