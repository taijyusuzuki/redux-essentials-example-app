# Redux Essentials Tutorial Example

This project contains the setup and code from the "Redux Essentials" tutorial in the Redux docs ( https://redux.js.org/tutorials/essentials/part-1-overview-concepts ).

This project uses the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template, and bundled [Webpack](https://webpack.js.org/) and transpiled [Babel](https://babeljs.io/).

> **Note**: If you are using Node 17, this project may not start correctly due to a known issue with Webpack and Node's OpenSSL changes, which causes an error message containing `ERR_OSSL_EVP_UNSUPPORTED`.
> You can work around this by setting a `NODE_OPTIONS=--openssl-legacy-provider` environment variable before starting the dev server.
> Details: https://github.com/webpack/webpack/issues/14532#issuecomment-947012063

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:8081](http://localhost:8081) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `resources\{version}` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
