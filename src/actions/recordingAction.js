export const ADD_RECORD = 'ADD_RECORD';
export const DELETE_RECORD = 'DELETE_RECORD';
export const RESTORE_RECORD = 'RESTORE_RECORD';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_NEWS = 'SET_NEWS';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const SET_OFFSET = 'SET_OFFSET';

export function addNewRecord(record) {
    return {
        type: ADD_RECORD,
        payload: record
    }
}
export function deleteRecord(record) {
    return {
        type: DELETE_RECORD,
        payload: record
    }
}
export function restoreRecord(record) {
    return {
        type: RESTORE_RECORD,
        payload: record
    }
}
export function setToken(token) {
    return {
        type: SET_TOKEN,
        payload: token
    }
}
export function setUserProfile(user) {
    return {
        type: SET_USER_PROFILE,
        payload: user
    }
}
export function setNews(items) {
    return {
        type: SET_NEWS,
        payload: items
    }
}
export function setOffset(newOffset) {
    return {
        type: SET_OFFSET,
        payload: newOffset
    }
}