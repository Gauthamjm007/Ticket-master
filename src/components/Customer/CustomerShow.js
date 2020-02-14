import React from "react";
import { connect } from "react-redux";

function CustomerShow(props) {
  return (
    <div>
      <h1>{props.match.params.id}</h1>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  return {
    customers: state.customers
  };
};

export default connect(mapStateToProps)(CustomerShow);
