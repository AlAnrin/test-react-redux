export function addNewRecord(record) {
    return {
        type: 'ADD_RECORD',
        payload: record,
    }
}
export function deleteRecord(record) {
    return {
        type: 'DELETE_RECORD',
        payload: record,
    }
}