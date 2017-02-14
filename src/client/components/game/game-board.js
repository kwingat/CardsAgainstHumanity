import React from 'react';
import '../../scss/game-board.scss';
import {ContainerBase} from "../../lib/component";

export default class GameBoard extends ContainerBase {
    render() {
        return <section className="c-game-board">Game Board</section>;
    }
}