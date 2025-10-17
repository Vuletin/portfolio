// Glitchy scanline effect

document.addEventListener("DOMContentLoaded", () => {
const container = document.querySelector(".scanline-container");

function createScanline() {
    const line = document.createElement("div");
    line.classList.add("scanline");

    line.style.height = `${Math.random() > 0.8 ? 3 : 1}px`; // 30% chance thicker

    // Randomize animation speed & delay
    const duration = (Math.random() * 3 + 2).toFixed(2); // 3s–5s
    const delay = (Math.random() * 5).toFixed(2);        // 0–5s

    line.style.animationDuration = `${duration}s`;
    line.style.animationDelay = `${delay}s`;

    container.appendChild(line);

    // Remove old scanlines after some time so container doesn’t fill up
    setTimeout(() => line.remove(), duration * 1000 + 2000);
}

// Keep generating glitchy scanlines
setInterval(createScanline, 2000); // every ~2s a new one
});

// Floating 0s and 1s

document.addEventListener("DOMContentLoaded", function () {
const container = document.getElementById("char-zone");
const chars = ["0","1"];

function spawnChar() {
    const char = document.createElement("div");
    char.className = "floating-char";
    char.textContent = chars[Math.floor(Math.random() * chars.length)];

    const mainHeight = container.offsetHeight;
    const mainWidth = container.offsetWidth;

    // define left/right zones relative to main
    const leftZone = { x: [630, -270], y: [60, mainHeight - 60] };
    const rightZone = { x: [mainWidth - 630, mainWidth + 270], y: [60, mainHeight - 60] };
    const zones = [leftZone, rightZone];

    const zone = zones[Math.floor(Math.random() * zones.length)];
    const x = Math.floor(Math.random() * (zone.x[1] - zone.x[0])) + zone.x[0];
    const y = Math.floor(Math.random() * (zone.y[1] - zone.y[0])) + zone.y[0];

    char.style.left = x + "px";
    char.style.top = y + "px";

    container.appendChild(char);

    // remove after fade
    setTimeout(() => char.remove(), 6000);
}

// spawn one every 500–1000ms
setInterval(spawnChar, 100);
});

// ✅ Custom JS for typing effect

document.addEventListener("DOMContentLoaded", function () {
const typedElements = document.querySelectorAll(".typed");

typedElements.forEach((typedEl, idx) => {
    const text = typedEl.dataset.text;
    let i = 0;

    function typeNextChar() {
    if (i < text.length) {
        typedEl.setAttribute("data-typed", text.substring(0, i+1));
        typedEl.textContent = text.substring(0, i+1);
        i++;
        setTimeout(typeNextChar, 5); // adjust typing speed
    }
    }

    // Delay each typed block so they don't all start at once
    setTimeout(typeNextChar, idx * 1000);
});
});