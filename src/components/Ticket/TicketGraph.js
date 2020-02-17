import React, { Component } from "react";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import { connect } from "react-redux";

class TicketGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pie: {
        series: [0, 0, 0],
        options: {
          chart: {
            width: 380,
            type: "pie"
          },
          labels: ["High", "Medium", "Low"],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        }
      },
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ["HR", "ACCOUNT"]
        }
      },
      series: [
        {
          name: "series-1",
          data: [10, 20, 30, 40, 50]
        }
      ]
    };
  }

  componentDidMount() {
    setTimeout(() => {
      return this.setState({
        options: {
          colors: ["#550a8a", "#6d00c1", "8510d8"],
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: this.props.departments.map((ele) => ele.name)
          }
        },
        series: [
          {
            name: "series-1",
            data: this.props.departments.map((ele) => {
              return this.props.tickets.filter(
                (ele1) => ele1.department === ele._id
              ).length;
            })
          }
        ],
        pie: {
          series: [
            this.props.tickets.filter((ele) => ele.priority === "High").length,
            this.props.tickets.filter((ele) => ele.priority === "Medium")
              .length,
            this.props.tickets.filter((ele) => ele.priority === "Low").length
          ],

          options: {
            chart: {
              width: 380,
              type: "donut"
            },
            plotOptions: {
              value: {
                show: false,
                fontSize: "36px",
                fontFamily: "Helvetica, Arial, sans-serif",
                color: undefined,
                offsetY: 10,
                formatter: function(val) {
                  return val;
                }
              }
            },

            labels: ["HIGH", "MEDIUM", "LOW"],
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 300
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          }
        }
      });
    }, 1000);
  }

  render() {
    console.log(
      this.props.departments.map((ele) => ele.name),
      "departments"
    );
    return (
      <div className="app" align="center">
        <h1>Priority of tasks</h1>
        <ReactApexChart
          options={this.state.pie.options}
          series={this.state.pie.series}
          type="donut"
          width={380}
        />
        <h1>Tickets based on Departments</h1>
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="500"
            />
          </div>
        </div>
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.customers,
    tickets: state.tickets,
    employees: state.employees,
    departments: state.departments
  };
};

export default connect(mapStateToProps)(TicketGraph);
