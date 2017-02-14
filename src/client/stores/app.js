import * as A from '../actions';
import _ from 'lodash';
import {BehaviorSubject, Observable} from "rxjs";

const defaultView = {
    sets:[
        {id: "1ed", name: "1st edition"},
        {id: "2ed", name: "2st edition"},
        {id: "3ed", name: "3st edition"},
    ]
};

export default class AppStore {
    constructor({dispatcher}) {
        this.view$ = new BehaviorSubject(defaultView);

        this.dialogs$ = dispatcher
            .on$(A.DIALOG_SET)
            .scan((stack, action) => {
                _.remove(stack, {id: action.id});

                if (action.isOpen)
                    stack.push({id: action.id, props: action.props});

                return stack;
            }, [])
            .startWith([])
            .publishReplay(1);

        this.dialogs$.connect();

        this.connectio$ = new BehaviorSubject(A.CONNECTION_CONNECTED);
        this.reconnected$ = new Observable.empty();
    }
}