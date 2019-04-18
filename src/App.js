import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import {setToken} from "./actions/recordingAction";
import Cards from "./Cards";

const mapStateToProps = store => {
    return {
        baseUrl: store.baseUrl,
        version_id: store.version_id,
        scopes: store.scopes,
        client_id: store.client_id,
        token: store.token,
        news: store.news
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setTokenAction: token => dispatch(setToken(token))
    }
};

class App extends Component {
    render() {
        let url = window.location.href;
        console.log(url);
        let split = url.split('=');
        console.log(split);
        let div;

        if (split.length === 1 && this.props.token === null) {
            div =
                <button className="entryButton">
                    <a
                        href={`https://oauth.vk.com/authorize?client_id=${this.props.client_id}&display=page&redirect_uri=http://localhost:3000/&scope=${this.props.scopes}&response_type=token&${this.props.version_id}`}
                        className="btn btn-primary">Подключение к vk</a>
                </button>
            ;
        } else {
            if (this.props.token === null) {
                let split2 = split[1].split('&');
                this.props.setTokenAction(split2[0]);
            }
            div = <Cards/>;
        }
        return (
            <div>
                {div}
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);