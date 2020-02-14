import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

export default function CustomerNew() {
  return (
    <div align="center">
      <Typography variant="h4">Add User</Typography>
      <br />
      <br />
      <form>
        <TextField type="text" label="Name" variant="filled" />
        <br />
        <TextField type="text" label="Email" variant="filled" />
        <br />
        <TextField type="text" label="Mobile" variant="filled" />
      </form>
    </div>
  );
}
