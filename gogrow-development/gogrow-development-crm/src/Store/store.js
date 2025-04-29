import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "./ticketsSlice/ticketsSlice";
import messagesReducer from "./messagesSlice/messagesSlice";
import teamsReducer from "./teamsSlice/teamsSlice";
// Users
import usersReducer from "./usersSlice/usersSlice";
import userReducer from "./usersSlice/userSlice";
import permissionsReducer from "./usersSlice/permissionsSlice"; // Soruce

import servicesReducer from "./serviceSlice/serviceSlice";
import productsReducer from "./productsSlice/productsSlice";
import propertiesReducer from "./propertyiesSlice/propertyiesSlice";
import categoriesReducer from "./categorySlice/categorySlice";
import propertyTypeReducer from "./settingsPropertyType/settingsPropertyTypeSlice";
import propertyDirectionReducer from "./settingsPropertyDirection/settingsPropertyDirectionSlice";
import propertyFeaturesReducer from "./settingsPropertyFeatures/settingsPropertyFeaturesSlice";
import propertyDetailsReducer from "./settingsPropertyDetails/settingsPropertyDetailsSlice";
import reportsReducer from "./reportsSlice/reportsSlice";
import teamTargetReducer from "./teamTargetSlice/teamTargetSlice";
import authReducer from "./Auth/loginUser"; // Auth
import notesReducer from "./usersSlice/notesSlice"; // Auth
import dashboardReducer from "./DashBoard/dashboardSlice"; // DashBoard
import leadStatisticsReducer from "./DashBoard/leadStatisticsSlice"; // DashBoard
import leadStatusReducer from "./settingsLeadStatusSlice/settingsLeadStatusSlice";
import leadSourceReducer from "./settingsLeadSourceSlice/settingsLeadSourceSlice";
import addLeadReducer from "./leadsSlice/addLeadSlice"; // AddLead
import leadsReducer from "./leadsSlice/leadsSlice";
import importleadsReducer from "./leadsSlice/importLeadsSlice"; // Soruce
import leadsStatusReducer from "./leadsSlice/statusSlice/statusSlice"; // Status
import leadsSourceReducer from "./leadsSlice/sourceSlice"; // Soruce
import leadInfoReducer from "./leadsSlice/leadInfoSlice"; // Soruce
import leadProposalsReducer from "./leadsSlice/leadProposalsSlice"; // Soruce
import leadContractsReducer from "./leadsSlice/leadContractsSlice"; // Soruce
import leadNoteReducer from "./leadsSlice/leadNoteSlice"; // Soruce
import remindersReducer from "./leadsSlice/leadReminders"; // Soruce
import activityLogReducer from "./leadsSlice/activityLogSlice"; // Soruce
import assignedUsersReducer from "./leadsSlice/AssignedUsersSlice"; // Soruce
import productTypeReducer from "./leadsSlice/ProductTypeSlice"; // Soruce
import productDetailsReducer from "./leadsSlice/productDetailsSlice"; // Soruce
import countriesReducer from "./leadsSlice/countriesSlice"; // Soruce
import citiesReducer from "./leadsSlice/citiesSlice"; // Soruce
import customersReducer from "./leadsSlice/Customers/CustomersSlice"; // Soruce
import teamDetailReducer from "./teamsSlice/teamDetailSlice"; // Soruce
// Todo
import todoReducer from "./Todo/todoSlice"; // Soruce
// Calendar
import calendarReducer from "./CalendarSlice/calendarSlice"; // Soruce
//Settings
import devicesReducer from "./AccountSettings/devicesSlice"; // Soruce
import userDetailsReducer from "./AccountSettings/userDetailsSlice"; // Soruce
import profileReducer from "./AccountSettings/profileSlice"; // Soruce
//Reports
import reportedLeadsReducer from "./reportsSlice/reportedLeadsTable"; // Soruce
import reportedChartsReducer from "./reportsSlice/reportsCharts"; // Soruce
//Chat
import chatReducer from "./ChatSlice/ChatSlice"; // Soruce
import chatHistoryReducer from "./ChatSlice/chatHistorySlice"; // Soruce

const store = configureStore({
  reducer: {
    // Auth
    auth: authReducer,
    // Dashboard
    dashboard: dashboardReducer,
    leadStatistics: leadStatisticsReducer,

    // Leads
    leads: leadsReducer,
    leadsStatus: leadsStatusReducer,
    leadsSoruce: leadsSourceReducer,
    leadInfo: leadInfoReducer,
    leadProposals: leadProposalsReducer,
    leadContracts: leadContractsReducer,
    leadNote: leadNoteReducer,
    activityLog: activityLogReducer,
    reminders: remindersReducer,
    assignedUsers: assignedUsersReducer,
    productType: productTypeReducer,
    productDetails: productDetailsReducer,
    countries: countriesReducer,
    cities: citiesReducer,
    importleads: importleadsReducer,
    customers: customersReducer,

    addLead: addLeadReducer,

    tickets: ticketsReducer,
    messages: messagesReducer,

    // Items
    services: servicesReducer,
    products: productsReducer,
    properties: propertiesReducer,
    categories: categoriesReducer, //Product Categories

    // Team
    teams: teamsReducer,
    teamTarget: teamTargetReducer,
    teamDetail: teamDetailReducer,
    // Users
    users: usersReducer,
    user: userReducer,
    notes: notesReducer,
    permissions: permissionsReducer,

    //TODO
    todos: todoReducer,

    // Calendar
    calendar: calendarReducer,

    // Chat
    chat: chatReducer,
    chatHistory: chatHistoryReducer,

    // Settings
    leadStatus: leadStatusReducer,
    leadSource: leadSourceReducer,
    propertyType: propertyTypeReducer,
    propertyDirection: propertyDirectionReducer,
    propertyFeatures: propertyFeaturesReducer,
    propertyDetails: propertyDetailsReducer,

    // Reports
    reports: reportsReducer,
    reportedLeads: reportedLeadsReducer,
    reportedCharts: reportedChartsReducer,

    // Settings Account
    devices: devicesReducer,
    userDetails: userDetailsReducer,
    profile: profileReducer,
  },
});

export default store;
