import React, {Component} from 'react';

import '../scss/game.scss';

class GameContainer extends Component {
    render() {
        return (
            <div>Game</div>
        );
    }
}

class GameSidebar extends Component {
    render() {
        return(
            <div>Game Sidebar</div>
        );
    }
}

export default {
    main: GameContainer,
    sidebar: GameSidebar
};
