import {mapOp$} from "shared/observable";
import * as A from "../actions";
import {BehaviorSubject, Observable} from "rxjs";
import * as _ from "lodash";

const defaultView = {
    id: 42,
    title: "Nelson's Game",
    step: A.STEP_SETUP,
    options: {
        scoreLimit: 5,
        sets: ["1ed"]
    },
    players: [
        {id: 1, name: "nelson", score: 0, isCzar: true, isPlaying: true, isWinner: false},
        {id: 2, name: "kyle", score: 0, isCzar: false, isPlaying: true, isWinner: false},
        {id: 3, name: "ashley", score: 0, isCzar: false, isPlaying: true, isWinner: false},
        {id: 4, name: "cj", score: 0, isCzar: false, isPlaying: true, isWinner: false},
        {id: 5, name: "olivia", score: 0, isCzar: false, isPlaying: true, isWinner: false},
        {id: 6, name: "bently", score: 0, isCzar: false, isPlaying: false, isWinner: true},
    ],
    messages: [
        {name: "Nelson", message: "abc"},
        {name: "Nelson", message: "abc"},
        {name: "Nelson", message: "abc"}
    ],
    round: null,
    time: null
};

const defaultPlayerState = {
    id: 1,
    hand: [],
    stack: null
};

export default class GameStore {
    constructor({dispatcher}, user) {

        dispatcher.onRequest({
            [A.GAME_CREATE]: action => {
                dispatcher.succeed(action);
                dispatcher.succeed(A.gameJoin(42));
            },
            [A.GAME_JOIN]: action => dispatcher.succeed(action),
            [A.GAME_SET_OPTIONS]: action => dispatcher.succeed(action),
            [A.GAME_START]: action => dispatcher.succeed(action),
            [A.GAME_SELECT_CARD]: action => dispatcher.succeed(action),
            [A.GAME_SELECT_STACK]: action => dispatcher.succeed(action),
            [A.GAME_SEND_MESSAGE]: action => dispatcher.succeed(action),
        });

        this.view$ = new BehaviorSubject(defaultView);
        this.player$ = new BehaviorSubject(defaultPlayerState);
        const isLoggedIn$ = user.details$.map(d => d.isLoggedIn);

        this.opCreateGame$ = mapOp$(
            dispatcher.on$(A.GAME_CREATE),
            isLoggedIn$);

        this.opJoinGame$ = mapOp$(
            dispatcher.on$(A.GAME_JOIN));

        this.opSetOptions$ = mapOp$(
            dispatcher.on$(A.GAME_SET_OPTIONS),
            isLoggedIn$);

        this.opStart$ = mapOp$(
            dispatcher.on$(A.GAME_START),
            isLoggedIn$);

        const playerAndGame$ = Observable.combineLatest(this.view$, this.player$);

        this.opSelectCard$ = mapOp$(
            dispatcher.on$(A.GAME_SELECT_CARD),
            playerAndGame$.map(([game, player]) => {
                const ourPlayer = _.find(game.players, {id: player.id});
                return ourPlayer && game.stop == game.step == A.STEP_CHOOSE_WHITES && ourPlayer.isPlaying;
            }));

        this.opSelectStack$ = mapOp$(
            dispatcher.on$(A.GAME_SELECT_STACK),
            playerAndGame$.map(([game, player]) => {
                const ourPlayer = _.find(game.players, {id: player.id});
                return ourPlayer && game.stop == game.step == A.STEP_JUDGE_STACKS && ourPlayer.isCzar;
            }));

        this.opSendMessage$ = mapOp$(dispatcher.on$(A.GAME_SEND_MESSAGE), isLoggedIn$);
    }
}