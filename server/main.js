// Only executed on the server
import _ from "lodash";
import { Meteor } from "meteor/meteor";
import { Employees } from "../imports/collections/employees";
import { image, helpers } from "faker";

Meteor.startup(() => {
  // Great place to generate data

  // Check to see if data exists in the collection
  // See if the collection has any records
  const numberRecords = Employees.find({}).count();
  if (!numberRecords) {
    // Generate some data...
    _.times(5000, () => {
      const { name, email, phone } = helpers.createCard();

      Employees.insert({
        // name: name,
        // email: email,
        // phone: phone,  --> if it is identical we can shorter that with method down below without duplicating (meteor thing)
        name,
        email,
        phone,
        avatar: image.avatar(), //in here we have to exactly define becouse it is not duplicated name (like avatar: avatar)
      });
    });
  }

  Meteor.publish("employees", (per_page) =>
    Employees.find({}, { limit: per_page })
  );
});