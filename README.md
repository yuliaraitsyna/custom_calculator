# Custom calculator
[Task](https://drive.google.com/file/d/15jVnBPXaZrjs99KOUxp4TGq6Inau6xq_/view)

## How to run the app

```

    git clone https://github.com/yuliaraitsyna/custom_calculator.git

    npm install

    npm run build

```
then open `index.html` file from `/dist` folder

or use [deployment](https://yuliaraitsyna.github.io/custom_calculator/)

## Structure

```
.
├── README.md
├── eslint.config.mjs
├── package.json
├── src
│   ├── calculator
│   │   ├── calculator.js
│   │   ├── handleOperation.js
│   │   └── test
│   │       └── calculator.test.js
│   ├── index.html
│   ├── index.js
│   ├── model
│   │   ├── buttons.js
│   │   └── theme.js
│   ├── styles.css
│   └── ui
│       └── ui.js
└── webpack.config.js

```

`eslint.config.mjs`, `package.json`, `webpack.config.js`: configuration files

`src/`: source folder of the project

`calculator/`: calculator and operations classes folder

`calculator/test/`: folder with unit tests for calculator

`model/`: folder for mocks and enums

`styles.css`: styles of the project

`ui/`: scripts for dom manipulations and functionality