import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import configureStore from './store/configureStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { loadState, saveState } from './store/localStorage';
import { ThemeSwitcher } from 'react-bootstrap-theme-switcher';

// Create browser history to use in the Redux store


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const persistedState = loadState();
const initialState = persistedState ? persistedState : window.initialReduxState;
const store = configureStore(history, initialState);
store.subscribe(() => {
    saveState({
        auth: store.getState().auth
    });
});

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <ThemeSwitcher themePath={process.env.PUBLIC_URL + "/theme_switcher"} defaultTheme="paper">
        <ConnectedRouter history={history}>
                <App />
        </ConnectedRouter>
        </ThemeSwitcher>
    </Provider>,
    rootElement);

registerServiceWorker();
