import React, { Component } from 'react';
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Employees } from '../../collections/employees';
import EmployeeDetail from './EmployeeDetail';

let per_page = 20;

class EmployeeList extends Component {

  componentDidMount() {
    this.page = 1;
  }

  handleButtonClick() {
    Meteor.subscribe("employees", per_page * (this.page + 1));
    this.page += 1;
  }

  render () {
    return (
      <div>
        <div className="employee-list">
          {this.props.employees.map((employee) => (
            <EmployeeDetail key={employee._id} employee={employee} />
          ))}
        </div>
        <button
          className="btn btn-primary"
          onClick={this.handleButtonClick.bind(this)}
        >
          Load More...
        </button>
      </div>
    );
  }
};

export default withTracker(() => {
  // Set up Subscription
  Meteor.subscribe("employees", per_page);

  // Return an object. Whatever we return will be sent to EmployeeList as props
  return { employees: Employees.find({}).fetch() };
})(EmployeeList);