"use strict";

window.addEventListener("DOMContentLoaded", initColorPicker);

const colorPicker = document.querySelector(".js-color-picker");
const colorHex = document.querySelector(".js-color-hex");
const colorRgb = document.querySelector(".js-color-rgb");
const colorHsl = document.querySelector(".js-color-hsl");
const colorBox = document.querySelector(".js-color-box");

function initColorPicker() {
    colorPicker.addEventListener("input", userChangedColor);
}

function userChangedColor(event) {
    const pickedColor = event.target.value.toUpperCase();

    updateColorBox(pickedColor);
    updateHexColor(pickedColor);
    updateRgbColor(pickedColor);
    updateHslColor(pickedColor);

    convertHexToRgb(pickedColor);
    convertHexToHsl(pickedColor);
}

function updateColorBox(color) {
    colorBox.style.backgroundColor = color;
}

function updateHexColor(color) {
    colorHex.textContent = color;
}

function updateRgbColor(color) {}

function updateHslColor(color) {}

function convertHexToRgb(hexColor) {
    const red = parseInt(hexColor.substring(1, 3), 16);
    const green = parseInt(hexColor.substring(3, 5), 16);
    const blue = parseInt(hexColor.substring(5, 7), 16);

    colorRgb.textContent = `${red}, ${green}, ${blue}`;
}

function convertHexToHsl(hexColor) {
    let r = parseInt(hexColor.substring(1, 3), 16);
    let g = parseInt(hexColor.substring(3, 5), 16);
    let b = parseInt(hexColor.substring(5, 7), 16);

    r /= 255;
    g /= 255;
    b /= 255;

    let h, s, l;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);

    if (max === min) {
        h = 0;
    } else if (max === r) {
        h = 60 * (0 + (g - b) / (max - min));
    } else if (max === g) {
        h = 60 * (2 + (b - r) / (max - min));
    } else if (max === b) {
        h = 60 * (4 + (r - g) / (max - min));
    }

    if (h < 0) {
        h = h + 360;
    }

    l = (min + max) / 2;

    if (max === 0 || min === 1) {
        s = 0;
    } else {
        s = (max - l) / Math.min(l, 1 - l);
    }
    // multiply s and l by 100 to get the value in percent, rather than [0,1]
    s *= 100;
    l *= 100;

    colorHsl.textContent = `${h.toFixed(0)}, ${s.toFixed(0)}%, ${l.toFixed(0)}%`;
}
