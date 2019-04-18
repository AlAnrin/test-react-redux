import React, { Component } from 'react';
import './index.css';
import Card from './Card';
import { connect } from 'react-redux';
import { Icon } from '@mdi/react';
import { mdiPlus, mdiViewHeadline, mdiDeleteEmpty } from '@mdi/js';
import {addNewRecord, setNews, setOffset, setUserProfile} from "./actions/recordingAction";
import $ from 'jquery';

const mapStateToProps = store => {
    return {
        baseUrl: store.baseUrl,
        version_id: store.version_id,
        scopes: store.scopes,
        client_id: store.client_id,
        token: store.token,
        news: store.news,
        offset: store.offset,
        count: store.count
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addAction: record => dispatch(addNewRecord(record)),
        setNews: items => dispatch(setNews(items)),
        setUser: user => dispatch(setUserProfile(user)),
        setOffset: newOffset => dispatch(setOffset(newOffset))
    }
};

class Cards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isViewDelete: false
        };
        let url1 = `${this.props.baseUrl}users.get?fields=photo_50&access_token=${this.props.token}&${this.props.version_id}`;
        $.ajax({
            url: url1,
            method: 'GET',
            dataType: 'JSONP',
            success: (response) => {
                let user = {
                    avatar: response.response[0].photo_50,
                    fullName: response.response[0].first_name,
                    userName: response.response[0].last_name
                };
                this.props.setUser(user);
            }
        });
        this.getPhotos();
    }

    getPhotos() {
        let url = `${this.props.baseUrl}photos.get?album_id=wall&rev=1&extended=1&offset=${this.props.offset}&count=${this.props.count}&access_token=${this.props.token}&${this.props.version_id}`;
        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'JSONP',
            success: (response) => {
                let items = response.response.items;
                this.props.setNews(items);
            }
        });
    }

    addNewRecordBtnClick = e => {
        const last = this.props.news[this.props.news.length - 1];
        this.props.addAction({
            id: last.id + 1,
            avatar: last.avatar,
            fullName: last.fullName,
            userName: last.userName,
            hashTags: ['#new'],
            text: 'new',
            media: ''
        });
    };

    handleBtnFilterClick = e => {
        this.setState(this.toggleFilterState);
    };

    toggleFilterState(state) {
        return {
            isViewDelete: !state.isViewDelete,
        };
    }

    handleOffsetClick = e => {
        this.props.setOffset(this.props.offset + this.props.count);
        this.getPhotos();
    };

    render() {
        return (
            <div className="backType">
                <div className="buttonsRow">
                    <button className="iconButton" onClick={this.addNewRecordBtnClick}>
                        <Icon path={mdiPlus}/>
                    </button>
                    <div className="spacer"/>
                    <button className="iconButton" onClick={this.handleBtnFilterClick} title={this.state.isViewDelete ? 'Фото' : 'Корзина'}>
                        <Icon path={this.state.isViewDelete ? mdiViewHeadline : mdiDeleteEmpty}/>
                    </button>
                </div>
                {
                    this.props.news.filter(record => ((this.state.isViewDelete && record.isDelete)
                    || (!this.state.isViewDelete && !record.isDelete))).map((item) =>
                        <Card key={item.id} item={item}/>)
                }
                {/*<button onClick={this.handleOffsetClick}>NEXT</button>*/}
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cards);