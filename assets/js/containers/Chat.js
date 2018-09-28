import React from "react";
import { Socket, Presence } from "phoenix";

import User from "../components/User";
import UserMessage from "../components/UserMessage";
import ChatBox from "../components/ChatBox";

const socket = new Socket("/socket", {});

socket.connect();

const channel = socket.channel("room:lobby", {});

class Chat extends React.Component {
  constructor(props) {
    super();

    this.state = { username: "", inputMessage: "", messages: [], presences: {} };

    channel.on("presence_state", state => {
      this.setState({ presences: Presence.syncState(this.state.presences, state) });
    });

    channel.on("presence_diff", diff => {
      this.setState({ presences: Presence.syncDiff(this.state.presences, diff) });
    });
  }

  componentDidMount() {
    channel.join().receive("ok", response => {
      console.log("Joined successfully", response);
    });
    channel.on("new_msg", payload => {
      const { username } = payload;
      const { messages: stateMessages, username: stateUsername } = this.state;
      this.setState({ messages: [...stateMessages, payload] });
    });
    channel.on("set_username", payload => {
      const { username } = payload;
      this.setState({ username });
    });
  }

  handleInputMessage = event => {
    this.setState({ inputMessage: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { inputMessage, username } = this.state;

    const newMessage = { username, message: inputMessage };

    channel.push("new_msg", newMessage);

    this.setState({ inputMessage: "" });
  };

  handleUsernameChange = event => {
    const newUsername = event.target.value;

    channel.push("new_username", { username: newUsername });

    this.setState({ username: newUsername });
  };

  render() {
    const { inputMessage, messages, username, presences } = this.state;

    const sentMessages = messages.map(({ username, message }, index) => {
      return <UserMessage key={index} username={username} message={message} />;
    });

    // const onlineUsers = [];

    const onlineUsers = Presence.list(presences, (_id, { metas: [user, ..._rest] }) => {
      const { user_id } = user;

      return <User key={user_id} user={user} />;
    });

    return (
      <ChatBox
        username={username}
        inputMessage={inputMessage}
        onlineUsers={onlineUsers}
        sentMessages={sentMessages}
        handleSubmit={this.handleSubmit}
        handleUsernameChange={this.handleUsernameChange}
        handleInputMessage={this.handleInputMessage}
      />
    );
  }
}
export default Chat;
