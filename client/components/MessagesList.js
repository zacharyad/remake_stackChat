import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import { connect } from 'react-redux';
import store, { fetchMessages } from '../store';

export class MessagesList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchMessages();
  }

  render() {
    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const filteredMessages = this.props.messages.filter(
      message => message.channelId === channelId
    );
    return (
      <div>
        <ul className="media-list">
          {filteredMessages.map(message => (
            <Message message={message} key={message.id} />
          ))}
        </ul>
        <NewMessageEntry channelId={channelId} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: () => dispatch(fetchMessages()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesList);
