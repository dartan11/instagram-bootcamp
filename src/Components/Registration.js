import React from 'react';
export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    }
  }



  render() {
    return (
      <div>
        <form>
          <label>Email: </label>
          <input type="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
          <br />
          <label>Password: </label>
          <input type="password" value={this.state.password} minLength="8" onChange={(e) => this.setState({ password: e.target.value })} />
          <br />
          <button onClick={(e) => { this.props.onSignup(e, this.state.email, this.state.password); this.setState({ email: "", password: "" }) }}>Sign Up</button>
          <button onClick={(e) => this.props.onLogIn(e, this.state.email, this.state.password)}>Log In</button>
        </form>
      </div>
    )
  }
}