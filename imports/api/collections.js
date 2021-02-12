import { Mongo } from "meteor/mongo";
// import { Meteor } from "meteor/meteor";

export var Accounts = new Mongo.Collection("accounts");
export var Transactions = new Mongo.Collection("transactions");

