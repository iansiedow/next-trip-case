# Minneapolis Bus Line
This application uses MetroTransits NexTrip API to display departure information based on a selected Route, Destination, and Stop. 

It is modeled after the [NexTrip](https://www.metrotransit.org/nextrip) web app in both style and functionality
[NexTrip API Documentation](https://svc.metrotransit.org/nextrip)
[NexTrip Swagger Endpoints](https://svc.metrotransit.org/swagger/index.html)

The app is as single page application (SPA). It uses React functional componenets and hooks with axios used for api calls. The Dropdown, heading, and table components come from Material UI. 

I initially used the `fetch` API for REST calls but switched to `axios` for cleaner and more concise code. Most of my CSS experience is with internal design systems. I went with Material UI over alternatives like Chakra UI, Bootstrap, or Tailwind for ease of use and simple Google/Android styles. Addings custom CSS to the prebuilt components was more challenging and verbose than I had anticipated. If I were to rewrite this project I'd likely skip a design system all together and just use CSS Modules or Sass for greater customization and developer experience. 

If I had time to get the app production ready I would probably split out the BusLinesForm.js into reusable dropdown and table components. To manage state across components I'd use Redux. I would also consider migrating the app to use TypeScript over JavaScript to catch type errors and improve developer experience.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You'll need Node version 14 or later. Install all dependencies with `npm install`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
This app uses react-testing-library and jest.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Other Tools

### Material UI 

React component library based on Googles Material Design framework. Learn more at [MUI](https://mui.com/material-ui/)

### Husky

Pre-commit hooks with Husky. Used with lint-staged to run the linter in a pre-commit hook. Learn more at [Husky](https://typicode.github.io/husky/#/)

### Prettier

Format your code automatically 
1. Install the Prettier extension ins VS Code. 
2. Open the Command Pallet with `Ctrl+Shift+P` 
3. Select "Preferences: Open Workspace Settings (JSON)
4. Add The following snippet:
```json
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
}
```
