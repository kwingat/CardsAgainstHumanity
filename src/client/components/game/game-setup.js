import React from "react";
import "../../scss/game-setup.scss";
import {ContainerBase} from "../../lib/component";
import * as A from "../../../server/shared/actions";
import * as _ from "lodash";

export default class GameSetup extends ContainerBase {
    constructor(props) {
        super(props);

        this._setScoreLimit = (e) => {
            if (!this.state.opSetOptions$.can) return;

            this.request(A.gameSetOptions(this.state.game.id, {
                ...this.state.game.options,
                scoreLimit: parseInt(e.target.value)
            }));
        };

        this._toggleSet = (set) => {
            const {opSetOptions, game: {options, id}} = this.state;

            if (!opSetOptions.can) return;

            const newSets = set.isSelected ? options.sets.filter(setId => setId !== set.id) : options.sets.concat(set.id);

            this.request(A.gameSetOptions(id, {
                ...options,
                sets: newSets
            }));
        };

        this._startGame = (e) => {
            e.preventDefault();
            const {opStart, game: {id}} = this.state;
            if (!opStart.can) return;
            this.request(A.GAME_START(id));
        };
    }

    componentWillMount() {
        const {stores: {app, game}} = this.context;
        this.subscribe(app.view$.map(v => v.sets), sets => this.setState({sets}));
        this.subscribe(game.view$, game => this.setState({game}));
        this.subscribe(game.opSetOptions$, opSetOptions => this.setState({opSetOptions}));
        this.subscribe(game.opStart$, opStart => this.setState({opStart}));
    }

    render() {
        const {sets, game: {options}, opSetOptions, opStart} = this.state;
        const setList = sets.map(set => ({
            id: set.id,
            name: set.name,
            isSelected: options.sets.includes(set.id)
        }));
        const disabled = !opSetOptions.can || opSetOptions.inProgress || opStart.inProgress;
        const error = opStart.error || opSetOptions.error;

        return (
            <section className={`c-game-settings ${disabled ? 'disabled' : 'enabled'}`}>
                <h1>
                    Game Options
                    {!error ? null : <span className="error">{error}</span>}
                </h1>
                <form className="body">
                    <div className="form-row">
                        <label>Score Limit:</label>
                        <select value={options.scoreLimit} onChange={this._setScoreLimit} disabled={disabled}>
                            {_.range(4, 50).map(i => <option value={i} key={i}>{i}</option>)}
                        </select>
                    </div>
                    <div className="form-row">
                        <label>Sets:</label>
                        <SetList sets={setList} toggleSet={this._toggleSet}/>
                    </div>
                    <button className="m-button start-game good" onClick={this._startGame} disabled={disabled}>
                        Start Game
                    </button>
                </form>
            </section>
        );
    }
}

function SetList({sets, toggleSet}) {
    return (
        <ul className="sets-list">
            {sets.map(set =>
                <li key={set.id} className={set.isSelected ? 'is-selected' : null} onClick={() => toggleSet(set)}>
                    {set.name}
                </li>)}
        </ul>
    );
}