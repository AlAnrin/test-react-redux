import React, { Component } from 'react';
import './App.css';
import './index.css';
import Card from './Card';
import { connect } from 'react-redux';
import { Icon } from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import {addNewRecord} from "./actions/recordingAction";

const mapStateToProps = state => {
    return {
        news: state.news
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addAction: record => dispatch(addNewRecord(record))
    }
};

class App extends Component {
    addNewRecordBtnClick = e => {
        this.props.addAction({
            avatar: '',
            fullName: 'new',
            userName: 'new',
            hashTags: ['#new'],
            text: 'new',
            media: ''
        })
    };

    render() {
        return (
            <div className="backType">
                <button className="iconButton" onClick={this.addNewRecordBtnClick}>
                    <Icon path={mdiPlus}/>
                </button>
                {this.props.news.map((item, index) =>
                    <Card key={index} item={item}/>
                    , this)}
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
