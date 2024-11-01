const colorPicker = document.getElementById("textColorPick");
const canvasColor = document.getElementById("canvasColor");
const canvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clearBtn");
const saveButton = document.getElementById("saveBtn");
const retrieveBtn = document.getElementById('retrieveBtn');
const fontPicker = document.getElementById("fontSize");

const ctx = canvas.getContext('2d')

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// pick color from option
colorPicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fill = e.target.value;
});

// Start drawing when the mouse is pressed
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

// Draw when the mouse is moved
canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return; // Stop the function if the mouse is not pressed
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY]; // Update the last position
});

// Stop drawing when the mouse is released or leaves the canvas
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});
canvas.addEventListener('mouseout', () => {
    isDrawing = false;
});


// Changing Background Color
canvasColor.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, 800, 500);
});

//font size
fontPicker.addEventListener('change', (e) => {
    ctx.lineWidth = e.target.value;
});

//Clear the Canvas
clearButton.addEventListener('click', (e) => {
    // ctx.clearRect(0, 0, 800, 500);
    //can use any of these
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})


//Saving in Local Storagee

saveButton.addEventListener('click', (e) => {
    //save image to local storage
    localStorage.setItem('savedSignature', canvas.toDataURL());

    const link = document.createElement('a');
    link.download = 'signature.png'; // Filename for the downloaded image
    link.href = canvas.toDataURL('image/png'); // Convert the canvas content to a data URL
    link.click(); // Programmatically click the link to trigger the download
})

// Retrieving the Sign

retrieveBtn.addEventListener('click', () => {
    //get the same item saved above with same name
    const savedCanvas = localStorage.getItem('savedSignature');
    if (savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        img.onload = () => {
            // Clear the canvas before loading
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw the image on the canvas
            ctx.drawImage(img, 0, 0);
        };
    }
    else {
        alert('No saved signature found!');
    }
})