import React from "react";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";

function TicketCard(props) {
  return (
    <div align="center">
      <br />
      <br />
      {props.tickets.map((ele, i) => {
        return (
          <div key={ele._id}>
            <Card
              style={{
                width: 500,
                background: ele.isResolved ? "green" : "#d92626",
                color: "white"
              }}
            >
              <CardContent>
                <Typography variant="body2" component="p" align="left">
                  Code:{ele.code}
                  <br />
                  Message:{ele.message}
                  <br />
                  Employees:
                  {ele.employees.map((ele) => (
                    <li key={ele}>{ele}</li>
                  ))}
                  Customer:{ele.customer}
                  <br />
                  Department:{ele.department}
                  <br />
                </Typography>
                <br />
                <br />
              </CardContent>
            </Card>
            <br />
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default TicketCard;
