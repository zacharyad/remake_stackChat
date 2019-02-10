import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userSet } from '../store';

export class NameEntry extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.writing(event.target.value);
  }
  render() {
    //console.log('props from messageEntry: ', this.props);
    return (
      <form className="form-inline">
        <label htmlFor="name">Your name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="form-control"
          onChange={this.handleChange}
          value={this.props.userName}
        />
      </form>
    );
  }
}
const mapStateToProps = state => {
  return {
    userName: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    writing: text => dispatch(userSet(text)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NameEntry);
