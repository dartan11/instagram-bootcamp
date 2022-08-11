import React from "react";
import { onChildAdded, ref as databaseRef, update } from "firebase/database";
import { database, } from "../Db/firebase";
import "../App.css";
import Likes from './Likes'

// Save the Firebase message folder name as a constant to avoid bugs due to misspelling
const MESSAGE_FOLDER_NAME = "messages";

export default class ImageDisplay extends React.Component {
  constructor(props) {
    super(props);
    // Initialise empty messages array in state to keep local state in sync with Firebase
    // When Firebase changes, update local state, which will update local UI
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    const messagesRef = databaseRef(database, MESSAGE_FOLDER_NAME);
    // onChildAdded will return data for every child at the reference and every subsequent new child
    onChildAdded(messagesRef, (data) => {
      // Add the subsequent child to local component state, initialising a new array to trigger re-render
      this.setState((state) => ({
        // Store message key so we can use it as a key in our list items when rendering messages
        messages: [...state.messages, { key: data.key, val: data.val() }],
      }));
    });
  }

  updateLikes = (message, index) => {
    const messageListRef = databaseRef(database, MESSAGE_FOLDER_NAME)
    const updates = {}
    let newData = {
      date: message.val.date,
      url: message.val.url,
      likes: message.val.likes + 1,
      message: message.val.message,
    };
    updates[message.key] = newData;
    update(messageListRef, updates).then(() => {
      console.log("data updated!");
    });
    let newArray = this.state.messages;
    newArray[index].val = newData;
    this.setState({ messages: newArray });
  }

  render() {

    let messageListItems = this.state.messages.map((message, index) => (
      <li key={message.key}><div>
        <img className="image" src={message.val.url} alt={message.val.message} /><br />
        Post Caption: {message.val.message} <br /> Posted on: {message.val.date}
        <Likes likes={message.val.likes} handleClick={() => this.updateLikes(message, index)} /><br /></div></li>
    ));

    return (
      <div>
        <ul style={{
          listStyleType: "none"
        }}>{messageListItems}</ul>
      </div>
    );
  }
}