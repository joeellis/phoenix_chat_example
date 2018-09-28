import React from "react";

export default class User extends React.PureComponent {
  render() {
    const {
      user: { username }
    } = this.props;

    return <div>{username}</div>;
  }
}
