import React, {Component} from 'react';

import '../scss/lobby.scss';

class LobbyContainer extends Component {
    render() {
        return (
            <div>
                <p>Lobby!</p>
            </div>
        );
    }
}

class LobbySidebar extends Component {
    render() {
        return (
            <div>
                <p>Lobby Sidebar</p>
            </div>
        );
    }
}

export default {
    main: LobbyContainer,
    sidebar: LobbySidebar
};