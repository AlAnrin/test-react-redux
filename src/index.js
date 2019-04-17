import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const initialState = {
    news: [
        {
            id: 0,
            avatar: 'https://pbs.twimg.com/profile_images/1098464374971281409/efLvmdNn_bigger.jpg',
            fullName: 'Sa ☆ Doujima X01',
            userName: 'LStrikesArt',
            hashTags: ['#voltron', '#sheith'],
            text: '(sheith) a little moonlight swimming on an alien planet',
            media: 'https://pbs.twimg.com/media/D4W_MMKUYAE6krp.jpg',
            isDelete: false
        },
        {
            id: 1,
            avatar: 'https://pbs.twimg.com/profile_images/1098464374971281409/efLvmdNn_bigger.jpg',
            fullName: 'Sa ☆ Doujima X01',
            userName: 'LStrikesArt',
            hashTags: ['#voltron', '#sheith'],
            text: '(sheith) felt like revisiting this au :D',
            media: 'https://pbs.twimg.com/media/D0fj4L8VsAAKmFv.jpg',
            isDelete: false
        },
        {
            id: 2,
            avatar: 'https://pbs.twimg.com/profile_images/1098464374971281409/efLvmdNn_bigger.jpg',
            fullName: 'Sa ☆ Doujima X01',
            userName: 'LStrikesArt',
            hashTags: ['#voltron', '#shiro'],
            text: '',
            media: 'https://pbs.twimg.com/media/D4RIvJaUIAAPGu9.jpg',
            isDelete: false
        },
        {
            id: 3,
            avatar: 'https://pbs.twimg.com/profile_images/1098464374971281409/efLvmdNn_bigger.jpg',
            fullName: 'Sa ☆ Doujima X01',
            userName: 'LStrikesArt',
            hashTags: ['#DC', '#Marvel', '#wonderwoman', '#captainamerica'],
            text: 'Yours a self-sacrificing idiot too?',
            media: 'https://pbs.twimg.com/media/DBj1KmQV0AEBeip.jpg',
            isDelete: false
        },
        {
            id: 4,
            avatar: 'https://pbs.twimg.com/profile_images/1098464374971281409/efLvmdNn_bigger.jpg',
            fullName: 'Sa ☆ Doujima X01',
            userName: 'LStrikesArt',
            hashTags: ['#voltron', '#keith'],
            text: `Last night I fell into the sunset...
Into my heart... into my heartache
Last night its spell held me so long`,
            media: 'https://pbs.twimg.com/media/D33UmU7U4AAG60A.jpg',
            isDelete: false
        }
    ]
};
function reducer(state = initialState, action) {
    console.log(action.payload);
    switch(action.type) {
        case 'ADD_RECORD':
            return {
                news: [action.payload, ...state.news]
            };
        case 'DELETE_RECORD':
            return {
                news: Object.assign([], state.news.map(record => record.id === action.payload.id ?
                    { ...record, isDelete: true } :
                    record
                ))
            };
        case 'RESTORE_RECORD':
            return {
                news: Object.assign([], state.news.map(record => record.id === action.payload.id ?
                    { ...record, isDelete: false } :
                    record
                ))
            };
        default:
            return state;
    }
}
const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
