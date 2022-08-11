import React from "react";

export default class Likes extends React.Component {

  render() {
    return (
      <div>
        <p>Likes: {this.props.likes}</p>
        <button onClick={this.props.handleClick}>Like</button>
      </div>
    );
  }
}