import React, { Component } from 'react';
import './App.css';
import './index.css';
import Card from './Card';
import { connect } from 'react-redux';
import { Icon } from '@mdi/react';
import { mdiPlus, mdiViewList, mdiDeleteCircle } from '@mdi/js';
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
    constructor() {
        super();

        this.state = {
            isViewDelete: false
        };
    }

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

    handleBtnFilterClick = e => {
        this.setState(this.toggleFilterState);
    };

    toggleFilterState(state) {
        return {
            isViewDelete: !state.isViewDelete,
        };
    }

    render() {
        return (
            <div className="backType">
                <div className="buttonsRow">
                    <button className="iconButton" onClick={this.addNewRecordBtnClick}>
                        <Icon path={mdiPlus}/>
                    </button>
                    <div className="spacer"/>
                    <button className="iconButton" onClick={this.handleBtnFilterClick}>
                        <Icon path={this.state.isViewDelete ? mdiViewList : mdiDeleteCircle}/>
                    </button>
                </div>
                {
                    this.props.news.filter(record => ((this.state.isViewDelete && record.isDelete)
                    || (!this.state.isViewDelete && !record.isDelete))).map((item) =>
                            <Card key={item.id} item={item}/>)
                }
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);