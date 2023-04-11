import React, { Component } from "react";

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        {/* <img src={loading} alt="" style={{width:'130px',height:'100px'}} /> */}
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }
}
