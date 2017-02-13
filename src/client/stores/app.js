import * as A from '../actions';
import _ from 'lodash';

export default class AppStore {
    constructor({dispatcher}) {
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
    }
}