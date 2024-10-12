const osascript = require('node-osascript');
const fs = require('fs');
const path = require('path');
const darkAlacrittyTheme = "catppuccin_frappe"
const lightAlacrittyTheme = "ashes_light"
const {exec} = require('child_process');

function checkAppearance() {
  osascript.execute(
      'tell application "System Events" to tell appearance preferences to get dark mode',
      function(err, result) {
        if (err)
          return console.error(err);
        console.log(result ? "Appearance is Dark" : "Appearance is Light");
        if (result) {
          changeToDarkAlacrittyTheme()
        } else {
          changeToLightAlacrittyTheme()
        }
      });
}

function changeToDarkAlacrittyTheme() {
  changeAlacrittyTheme(lightAlacrittyTheme, darkAlacrittyTheme)
}

function changeToLightAlacrittyTheme() {
  changeAlacrittyTheme(darkAlacrittyTheme, lightAlacrittyTheme)
}

function changeAlacrittyTheme(from, to) {
  console.log(`Changing Alacritty theme to: ${to}`);
  const command =
      `sed -i '' 's/${from}/${to}/' ~/.config/alacritty/alacritty.toml`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error changing theme: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Theme changed successfully`);
  });
}

// Set up interval to check periodically
setInterval(checkAppearance, 5000); // Check every 5 seconds
