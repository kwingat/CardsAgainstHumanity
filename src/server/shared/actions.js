export const actions = {
    STATUS_REQUEST: 'STATUS_REQUEST',
    STATUS_FAIL: 'STATUS_FAIL',
    STATUS_SUCCESS: 'STATUS_SUCCESS'
};

// ----------------------
// Helpers
export function request(action) {
    return {...action, status: actions.STATUS_REQUEST};
}

export function fail(action, error) {
    return {...action, status: actions.STATUS_FAIL, error};
}

export function succeed(action) {
    return {...action, status: actions.STATUS_SUCCESS};
}


