import React from "react";

export default class UserMessage extends React.Component {
  render() {
    return (
      <div className="box" style={{ marginBottom: "10px" }}>
        <article>
          <div>
            <div>
              <p>
                <strong>{this.props.username}</strong>
                <br />
                {this.props.message}
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }
}
