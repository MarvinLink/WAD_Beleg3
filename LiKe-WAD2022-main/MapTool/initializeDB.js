//const { use } = require("./routes/contacts");

//const { db } = require("./schema/ContactsSchema");

//const { connect } = require("mongoose");

//const { use } = require("./routes/contacts");

/*const { connection } = require("mongoose");

connection= new Mongo("mongodb://localhost:27017/DBtest");*/
db = connect("mongodb://localhost:27017/advizDB")
db.getSiblingDB("advizDB");
db.createCollection("contacts");
db.contacts.insertMany([

    { firstname: "Philipp",
  lastname: "Fischer",
  StreetAndNumber: "Köpenicker Str. 25", 
  zip: "12683", 
  city: "Berlin",
  country: "Deutschland",
  phone: "01527635709",
  dateOfBirth: "1999-04-04",
  owner: { username: "normalo",
            password: "password",
            role: "normal"
        },
  vis: "true"
  },
  { firstname: "Marie",
  lastname: "Rosemann",
  StreetAndNumber: "Schönhauser Allee 148", 
  zip: "10435", 
  city: "Berlin",
  country: "Deutschland",
  phone: "01627635708",
  dateOfBirth: "1999-09-07",
  owner: { username: "normalo",
            password: "password",
            role: "normal"
        },
  vis: "false"
  },
  { firstname: "Miriam",
  lastname: "Schneider",
  StreetAndNumber: "Landsberger Allee 53", 
  zip: "13409", 
  city: "Berlin",
  country: "Deutschland",
  phone: "01657631708",
  dateOfBirth: "1999-12-02",
  owner: { username: "admina",
            password: "password",
            role: "admin"
  },
  vis: "false"
  },
  { firstname: "Thomas",
  lastname: "Müller",
  StreetAndNumber: "Prenzlauer Allee 196", 
  zip: "10405", 
  city: "Berlin",
  country: "Deutschland",
  phone: "01637691708",
  dateOfBirth: "1999-10-01",
  owner: { username: "admina",
            password: "password",
            role: "admin"
        },
  vis: "true"
  }]
);