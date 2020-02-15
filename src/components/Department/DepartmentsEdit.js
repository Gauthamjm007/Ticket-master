import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { startDepartmentEdit } from "../../actions/departmentActions";

class DepartmentsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        name: this.props.departments.name
      });
    }, 700);
  }

  handleClick = (e) => {
    e.preventDefault();
    const formData = {
      name: this.state.name
    };

    const redirect = () => {
      return this.props.history.push("/users/departments");
    };
    this.props.dispatch(
      startDepartmentEdit(formData, this.props.match.params.id, redirect)
    );
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.props.departments, "this is customer");
    return (
      <div align="center">
        <br />
        <br />
        <Typography variant="h4">Edit Department</Typography>
        <br />
        <br />
        <form>
          <TextField
            type="text"
            label="Name"
            value={this.state.name}
            variant="filled"
            name="name"
            onChange={this.handleChange}
          />
          <br />
          <br />
          <Button variant="contained" onClick={this.handleClick}>
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  console.log(id);
  return {
    departments: state.departments.find((ele) => ele._id === id)
  };
};

export default connect(mapStateToProps)(DepartmentsEdit);
