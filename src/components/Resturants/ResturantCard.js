import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function ResturantCard(props) {
  return (
    <div align="center">
      <br />
      <br />
      {props.resturants.map((ele, i) => {
        return (
          <div key={ele._id}>
            <Card
              style={{
                width: 500,
                background: "green",
                color: "white"
              }}
            >
              <CardContent>
                <Typography variant="body2" component="p" align="left">
                  Brand:{ele.Brand}
                  <br />
                  Variety:{ele.Variety}
                  <br />
                  Style:
                  {ele.Style}
                  Country:{ele.Country}
                  <br />
                  Stars:{ele.Stars}
                  <br />
                  Rank:{ele.TopTen}
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

export default ResturantCard;
