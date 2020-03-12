import React from "react";
import axios from "axios";
import ResturantCard from "./ResturantCard";

class Resturants extends React.Component() {
  constructor() {
    this.state = {
      resturants: ""
    };
  }
  componentDidMount() {
    axios.get("http://starlord.hackerearth.com/TopRamen").then((response) => {
      this.setState({ resturants });
    });
  }

  render() {
    return (
      <div>
        <h1>Resturants</h1>
        {this.state.resturants !== undefined &&
          this.state.resturants.map((ele) => {
            return <ResturantCard resturants={ele} />;
          })}
      </div>
    );
  }
}

export default Resturants;
