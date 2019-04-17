import React, { Component } from 'react';
import { Icon } from '@mdi/react';
import { mdiDelete, mdiDeleteRestore } from '@mdi/js';
import {deleteRecord, restoreRecord} from "./actions/recordingAction";
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        news: state.news
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteAction: record => dispatch(deleteRecord(record)),
        restoreAction: record => dispatch(restoreRecord(record))
    }
};

class Card extends Component {
    record = {};

    constructor(item) {
        super();
        this.record = item['item'];
    }

    handleClick = () => {
        this.record.isDelete ? this.props.restoreAction(this.record)
            : this.props.deleteAction(this.record);
    };

    render() {
        return (
            <div className="card">
                <div className="leftAvatarPanel">
                    <img className="avatar" src={this.record.avatar} alt="avatar"/>
                </div>
                <div className="contentCard">
                    <span className="fullNameGroup">
                        <div className="fullName">{this.record.fullName}</div>
                        <span className="userName"> @ {this.record.userName}</span>
                    </span>
                    <span className="hashTags">
                        {
                            this.record.hashTags.map((hashTag, index) =>
                                <span className="hashTag" key={index}>{hashTag}</span>
                            )
                        }
                    </span>
                    <span className="text">{this.record.text}</span>
                    <div className="adaptiveMedia">
                        <img className="adaptiveMedia" src={this.record.media} alt="media"/>
                    </div>
                </div>
                <button className="iconButton deleteButton" onClick={this.handleClick}>
                    <Icon path={this.record.isDelete ? mdiDeleteRestore : mdiDelete}/>
                </button>
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Card);