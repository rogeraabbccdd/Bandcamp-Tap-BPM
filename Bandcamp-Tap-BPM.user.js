// ==UserScript==
// @name         Bandcamp Tap BPM
// @version      1.0
// @description  Added a small TAP BPM dialog
// @author       You
// @match        https://*.bandcamp.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bandcamp.com
// @namespace    https://github.com/rogeraabbccdd/Bandcamp-Tap-BPM/
// @updateURL    https://raw.githubusercontent.com/rogeraabbccdd/Bandcamp-Tap-BPM/master/Bandcamp-Tap-BPM.user.js
// @downloadURL  https://raw.githubusercontent.com/rogeraabbccdd/Bandcamp-Tap-BPM/master/Bandcamp-Tap-BPM.user.js
// @grant        none
// ==/UserScript==

const html = `
<div
  class="ui-dialog ui-widget ui-widget-content ui-corner-all nu-dialog mailing-list-opt-in blank-title band"
  role="dialog"
  aria-labelledby="ui-id-5"
  style="position: fixed; bottom: 5px; left: 5px; top: unset; z-index: 99999; border: 1px solid black;"
>
  <div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
    <span id="ui-id-5" class="ui-dialog-title">
      TAP BPM
    </span>
  </div>
  <div
    class="ui-dialog-content ui-widget-content"
    style="width: auto; min-height: 28px; height: auto;"
    scrolltop="0"
    scrollleft="0"
  >
    <div class="heading">
      <h1 style="text-align: center" id="bpm-text-bpm">0</h1>
    </div>
    <div class="email-abuse">
      <p style="text-align: center" id="bpm-text-stars"></p>
    </div>
  </div>
  <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
    <div class="ui-dialog-buttonset">
      <button type="button" id="bpm-btn-start">TAP</button>
      <button type="button" id="bpm-btn-reset">RESET</button>
    </div>
  </div>
</div>;
`

const div = document.createElement('div')
document.body.appendChild(div)
div.outerHTML = html

let tapping = false
const beats = []

const textBPM = document.getElementById('bpm-text-bpm')
const textStars = document.getElementById('bpm-text-stars')
const btnStart = document.getElementById('bpm-btn-start')
const btnReset = document.getElementById('bpm-btn-reset')

if (btnStart) {
  btnStart.onclick = () => {
    tapping = !tapping
    if (tapping) beats.splice(0, beats.length)
    btnStart.innerText = tapping ? 'STOP' : 'START'
  }
}

if (btnReset) {
  btnReset.onclick = () => {
    beats.splice(0, beats.length)
    if (textBPM) textBPM.innerText = 0
    if (textStars) {
      textStars.innerHTML = ''
    }
  }
}

document.onkeydown = () => {
  if (tapping) {
    beats.push(Date.now())
    const n = beats.length
    const x = n - 1;
		const y = beats[n - 1] - beats[0];
    if (textBPM) textBPM.innerText = n > 2 ? (60000 * x / y).toFixed(2) : '0'
    if (textStars) {
      if (n % 16 === 0) textStars.innerHTML += '★<br>'
      else if (n % 4 === 0) textStars.innerHTML += '★&emsp;'
      else textStars.innerHTML += '★'
    }
  }
}
