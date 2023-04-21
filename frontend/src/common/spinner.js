import React from "react";
// import "./spinner.css";
import { Spin } from "react-loading-io";


export default function Spinner() {
  return (
    <div className="spinner-container">
       {/* <div className="loading-spinner"> */}
      <Spin size={90} id='spin' style={{'--rl-spin-color':  '#FFC107',
    '--rl-spin-border': '20px', position:'fixed',top:'20em',left:'50%',height:'70px',width: '70px', zIndex:'10'}}/>
      {/* </div>  */}
      {/* <Spin size={80} /> */}
     </div>
  );
}
