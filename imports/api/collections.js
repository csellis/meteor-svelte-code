import { Mongo } from "meteor/mongo";
// import { Meteor } from "meteor/meteor";

export var Accounts = new Mongo.Collection("accounts");
export var Transactions = new Mongo.Collection("transactions");
export var Settings = new Mongo.Collection("settings");
export var Categories = new Mongo.Collection("categories");