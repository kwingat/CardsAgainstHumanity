import React from 'react';
import ReactDOM from "react-dom";
import {Router, browserHistory as history} from 'react-router';

import "./scss/client.scss";
import * as A from './actions';
import {StoreProvider} from './lib/component';
import {Dispatcher} from 'shared/dispatcher';
import createStores from './stores';

// Services
const dispatcher = new Dispatcher();
const services = {dispatcher};

// Stores
const stores = createStores(services);

// Render
function main() {
    const routes = require("./routes").default();
    ReactDOM.render(
        <StoreProvider stores={stores} services={services}>
            <Router history={history}>
                {routes}
            </Router>
        </StoreProvider>,
        document.getElementById("mount"));
}


// Misc
if (module.hot) {
    module.hot.accept("./routes", () => {
        main();
    });
}

// GO!
main();