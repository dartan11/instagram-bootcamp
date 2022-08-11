import React from "react";
import { push, ref as databaseRef, set } from "firebase/database";
import { database, storage } from "../Db/firebase";
import "../App.css";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"

// Save the Firebase message folder name as a constant to avoid bugs due to misspelling
const MESSAGE_FOLDER_NAME = "messages";

export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      fileName: '',
      text: '',
    };
  }

  handleTextChange = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  handleUpload = (event) => {
    this.setState({
      file: event.target.files[0],
      fileName: event.target.value
    })
  }


  uploadImage = (event) => {
    event.preventDefault()
    const imageRef = storageRef(storage, `images/${this.state.file.name}`)
    uploadBytes(imageRef, this.state.file)

      .then((snapshot) => {
        console.log("successfully uploaded");
        //can use snapshot.ref or imagRef
        return getDownloadURL(imageRef)
      })

      .then((url) => {
        this.handleSubmit(url)
      })
  }

  handleSubmit = (url) => {
    const date = new Date().toLocaleString();
    const messageListRef = databaseRef(database, MESSAGE_FOLDER_NAME);
    const newMessageRef = push(messageListRef);
    set(newMessageRef, { date: date, message: this.state.text, url: url, likes: 0 });
    this.setState({
      text: "",
      fileName: ""
    })
  };

  render() {

    return (
      <div className="App">
        <header className="App-header"><br />
          Upload your file here!<br />
          {/* TODO: Add input field and add text input as messages in Firebase */}
          <form onSubmit={this.uploadImage}>
            {/* <input type="text" value={this.state.input} onChange={(e) => this.setState({ input: e.target.value })} /> */}
            <input type="text" value={this.state.text} onChange={this.handleTextChange} />
            <input type="file" value={this.state.fileName} onChange={this.handleUpload} />
            <input type="submit" />
          </form>
        </header>
      </div>
    );
  }
}