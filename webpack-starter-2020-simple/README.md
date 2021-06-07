# webpack starterkit - UPDATED to 2021

# Usage

clone this repo, `cd` into the folder then do `npm install` inside the project folder.

- use `npm run dev` to work in dev mode
- production build can be done with `npm run build`

# Linter setup on vscode

## js linting

1. Make sure eslint extension for vscode is not installed.

2. Add these to your VSCode json file ( `cmd+shift+p` on mac `ctrl+shift+p` on pc, and then type: settings json and choose "Preferences: Open Settings (JSON) ") :

```
"eslint.options": {
      "configFile": "./.eslintrc.js"
  },
```


## css/scss linting

1. install stylelint extension

2. Add these to your VSCode json file ( `cmd+shift+p` on mac `ctrl+shift+p` on pc, and then type: settings json and choose "Preferences: Open Settings (JSON) ") :
```
"scss.validate": false,
"stylelint.config": { "extends": "./.stylelintrc" }
```
