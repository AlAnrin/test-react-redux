export const ADD_RECORD = 'ADD_RECORD';
export const DELETE_RECORD = 'DELETE_RECORD';
export const RESTORE_RECORD = 'RESTORE_RECORD';

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