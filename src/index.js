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
            avatar: 'https://pbs.twimg.com/profile_images/1098464374971281409/efLvmdNn_bigger.jpg',
            fullName: 'Sa ☆ Doujima X01',
            userName: 'LStrikesArt',
            hashTags: ['#voltron', '#shiro'],
            text: '',
            media: 'https://pbs.twimg.com/media/D4RIvJaUIAAPGu9.jpg'
        },
        {
            avatar: 'https://pbs.twimg.com/profile_images/1098464374971281409/efLvmdNn_bigger.jpg',
            fullName: 'Sa ☆ Doujima X01',
            userName: 'LStrikesArt',
            hashTags: ['#voltron', '#sheith'],
            text: '(sheith) felt like revisiting this au :D',
            media: 'https://pbs.twimg.com/media/D0fj4L8VsAAKmFv.jpg'
        }
    ]
};
function reducer(state = initialState, action) {
    switch(action.type) {
        case 'ADD_RECORD':
            return {
                news: [...state.news, action.payload]
            };
        case 'DELETE_RECORD':
            return {
                news: [...state.news.slice(0, action.payload),
                    ...state.news.slice(action.payload + 1)]
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
