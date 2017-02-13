import React, {Component} from 'react';
import {ContainerBase} from '../lib/component';

import '../scss/game.scss';

class GameContainer extends ContainerBase {
    render() {
        return (
            <div>Game</div>
        );
    }
}

class GameSidebar extends ContainerBase {
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
