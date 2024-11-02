const osascript = require('node-osascript');
const fs = require('fs');
const path = require('path');
const darkWezTermTheme = "Catppuccin Frappe"
const lightWezTermTheme = "Catppuccin Latte"
const {exec} = require('child_process');

function checkAppearance() {
  osascript.execute(
      'tell application "System Events" to tell appearance preferences to get dark mode',
      function(err, result) {
        if (err)
          return console.error(err);
        console.log(result ? "Appearance is Dark" : "Appearance is Light");
        if (result) {
          changeToDarkWezTermTheme()
        } else {
          changeToLightWezTermTheme()
        }
      });
}

function changeToDarkWezTermTheme() {
  changeWezTermTheme(lightWezTermTheme, darkWezTermTheme)
}

function changeToLightWezTermTheme() {
  changeWezTermTheme(darkWezTermTheme, lightWezTermTheme)
}

function changeWezTermTheme(from, to) {
  console.log(`Changing WezTerm theme to: ${to}`);
  const command =
      `sed -i '' 's/${from}/${to}/' ~/.config/wezterm/wezterm.lua`;
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
