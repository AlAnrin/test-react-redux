import React, { Component } from 'react';
import './index.css';
import Card from './Card';
import { connect } from 'react-redux';
import { Icon } from '@mdi/react';
import { mdiPlus, mdiViewHeadline, mdiDeleteEmpty, mdiChevronDown, mdiChevronUp } from '@mdi/js';
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
        count: store.count,
        news_count: store.news_count
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
                this.props.setNews([response.response.items, response.response.count]);
            }
        });
        const elem = document.documentElement;
        elem.scrollTop = 0;
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

    handleOffsetClickMore = e => {
        this.props.setOffset(this.props.offset + this.props.count);
        setTimeout(() => this.getPhotos(), 500);
    };

    handleOffsetClickLess = e => {
        this.props.setOffset(this.props.offset - this.props.count);
        setTimeout(() => this.getPhotos(), 500);
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
                    (this.props.offset - this.props.count) >= 0 &&
                    <button className="arrowButton" onClick={this.handleOffsetClickLess}>
                        <Icon className="arrowIcon" path={mdiChevronUp}/>
                    </button>
                }
                {
                    this.props.news.filter(record => ((this.state.isViewDelete && record.isDelete)
                    || (!this.state.isViewDelete && !record.isDelete))).map((item) =>
                        <Card key={item.id} item={item}/>)
                }
                {
                    (this.props.offset + this.props.count) < this.props.news_count &&
                    <button className="arrowButton" onClick={this.handleOffsetClickMore}>
                        <Icon className="arrowIcon" path={mdiChevronDown}/>
                    </button>
                }
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cards);