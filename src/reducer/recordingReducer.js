import {ADD_RECORD, DELETE_RECORD, RESTORE_RECORD, SET_TOKEN, SET_NEWS, SET_USER_PROFILE, SET_OFFSET} from "../actions/recordingAction";

const initialState = {
    version_id: 'v=5.95',
    baseUrl: 'https://api.vk.com/method/',
    scopes: 'photos',
    client_id: '6950280',
    token: null,
    user: {
        avatar: '',
        fullName: '',
        userName: ''
    },
    news_count: 0,
    news: [],
    offset: 0,
    count: 15
};

export function recordReducer(state = initialState, action) {
    console.log(action.payload);
    switch (action.type) {
        case ADD_RECORD:
            return {
                ...state,
                news: [...state.news, action.payload]
            };
        case DELETE_RECORD:
            return {
                ...state,
                news: Object.assign([], state.news.map(record => record.id === action.payload.id ?
                    {...record, isDelete: true} :
                    record
                ))
            };
        case RESTORE_RECORD:
            return {
                ...state,
                news: Object.assign([], state.news.map(record => record.id === action.payload.id ?
                    {...record, isDelete: false} :
                    record
                ))
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        case SET_USER_PROFILE:
            return{
                ...state,
                user: action.payload
            };
        case SET_NEWS:
            const [items, count] = action.payload;
            return {
                ...state,
                news_count: count,
                news: Object.assign([], items.map(item => Object.assign({}, {
                    id: item.id,
                    hashTags: Object.assign([], item.tags),
                    text: item.text,
                    media: item.sizes[item.sizes.length - 1].url,
                    likes: item.likes.count, // TODO!
                    isDelete: false
                })))
            };
        case SET_OFFSET:
            return {
                ...state,
                offset: action.payload
            };
        default:
            return state;
    }
}