import React from "react";

export default class ChatBox extends React.PureComponent {
  render() {
    const { username, inputMessage, onlineUsers, sentMessages, handleSubmit, handleUsernameChange, handleInputMessage } = this.props;

    return (
      <div className="chat-container">
        <div className="online-users">
          <strong>Users</strong>
          <div>{onlineUsers}</div>
        </div>
        <div className="chatting">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Username:</label>
              <div className="control">
                <input className="input" type="text" value={username} onChange={handleUsernameChange} />
              </div>
            </div>
            <div className="field">
              <label className="label">Message:</label>
              <div className="control">
                <input className="input" type="text" value={inputMessage} onChange={handleInputMessage} />
              </div>
            </div>
            <button type="submit" value="Submit" className="button is-primary">
              Submit
            </button>
          </form>
          <div
            className="flex-container"
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            {sentMessages}
          </div>
        </div>
      </div>
    );
  }
}
