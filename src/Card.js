import React, { Component } from 'react';
import { Icon } from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import {deleteRecord} from "./actions/recordingAction";
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        news: state.news
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteAction: record => dispatch(deleteRecord(record))
    }
};

class Card extends Component {
    record = {};

    constructor(props) {
        super(props);
        this.record = props['item'];
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.state = {
            isHovering: false,
        };
    }

    handleClick = () => {
        this.props.deleteAction(this.props.news.indexOf(this.record));
    };

    handleMouseHover() {
        this.setState(this.toggleHoverState);
    }

    toggleHoverState(state) {
        return {
            isHovering: !state.isHovering,
        };
    }

    render() {
        return (
            <div className="card"
                 onMouseEnter={this.handleMouseHover}
                 onMouseLeave={this.handleMouseHover}>
                <div className="leftAvatarPanel">
                    <img className="avatar" src={this.record.avatar} alt="avatar"/>
                </div>
                <div className="contentCard">
                    <span className="fullNameGroup">
                        <div className="fullName">{this.record.fullName}</div>
                        <span className="userName"> @ {this.record.userName}</span>
                    </span>
                    <span className="hashTags">
                        {this.record.hashTags.map((hashTag, index) =>
                            <span className="hashTag" key={index}>{hashTag}</span>
                        )}
                    </span>
                    <span className="text">{this.record.text}</span>
                    <div className="adaptiveMedia">
                        <img className="adaptiveMedia" src={this.record.media} alt="media"/>
                    </div>
                </div>
                {
                    // this.state.isHovering &&
                    <button className="iconButton deleteButton" onClick={this.handleClick}>
                        <Icon path={mdiDelete}/>
                    </button>
                }
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Card);