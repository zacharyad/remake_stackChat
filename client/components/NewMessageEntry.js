import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writingMessage, postNewMessage } from '../store';

export class NewMessageEntry extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();

    const content = this.props.newMessageEntry;
    const channelId = this.props.channelId;

    this.props.submitMessage({ content, channelId });
  }

  handleChange(event) {
    this.props.writing(event.target.value);
  }
  render() {
    //console.log('props from messageEntry: ', this.props);
    return (
      <form onSubmit={event => this.handleSubmit(event)} id="new-message-form">
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            value={this.props.newMessageEntry}
            onChange={this.handleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">
              Chat!
            </button>
          </span>
        </div>
      </form>
    );
  }
}
const mapStateToProps = state => {
  return {
    newMessageEntry: state.newMessageEntry,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    writing: text => dispatch(writingMessage(text)),
    submitMessage: text => dispatch(postNewMessage(text)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessageEntry);
