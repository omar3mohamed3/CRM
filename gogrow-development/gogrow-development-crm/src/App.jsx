import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Applayout from "./components/Layout/Applayout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import LeadsControler from "./pages/Leads/LeadsControler";
import Leads from "./pages/Leads/Leads";
import LeadInfo from "./components/Leads/LeadInfo";
import AddLead from "./pages/Leads/AddLead";
import { Toaster } from "react-hot-toast";
import ImportLeads from "./pages/Leads/ImportLeads";
import Service from "./pages/Items/Service";
import ItemsControler from "./pages/Items/ItemsControler";
import Product from "./pages/Items/Product";
import Units from "./pages/Items/Units";
import UserController from "./pages/Users/UserController";
import Users from "./pages/Users/Users";

import CalenderPage from "./pages/Calendar/CalenderPage";
import CrmTickets from "./pages/CrmTickets/CrmTickets";
import Invoice from "./pages/Invoice/Invoice";
import Todo from "./pages/Todo/Todo";
import Teams from "./pages/Teams/Teams";
import Team from "./pages/Teams/Team";
import Chat from "./pages/Chat/Chat";
import ProductCategories from "./pages/Items/ProductCategories";
import AccountSettings from "./pages/AccountSettings/AccountSettings";
import SettingsController from "./pages/Settings/SettingsController";
import Settings from "./pages/Settings/Settings";
import SettingsLeadStatus from "./pages/Settings/SettingsLeadStatus";
import SettingsLeadSource from "./pages/Settings/SettingsLeadSource";
import SettingsPropretiesType from "./pages/Settings/SettingsPropretiesType";
import SettingsPropertiesDirection from "./pages/Settings/SettingsPropertiesDirection";
import Reports from "./pages/Reports/Reports";
import SettingsPropertiesFeatures from "./pages/Settings/SettingsPrepertiesFeatures";
import ProductPreview from "./components/Items/Product/ProductPreview";
import PropertiesPreview from "./components/Items/Property/PropertiesPreview";
import UserInfo from "./pages/Users/UserInfo1";
import Customers from "./pages/Leads/Customers/Customers";
import Protection from "./Protection";
import TestServerConnection from "./Url/TestServerConnection";
import ChatHistory from "./pages/HistoryChat/ChatHistory";
import useFetchUser from "./Store/Auth/useFetchUser";
import LeadsTable from "./pages/Leads/LeadsTable";

function App() {
  const { user } = useFetchUser();

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/"
            element={
              <Protection>
                <Applayout />
              </Protection>
            }>
            <Route
              index
              element={<Home />}
            />
            {user?.identity === "admin" && (
              <>
                <Route
                  path="dashboard"
                  element={<Dashboard />}
                />

                {/* Settings */}
                <Route
                  path="settings"
                  element={<SettingsController />}>
                  <Route
                    index
                    element={<Settings />}
                  />
                  <Route
                    path="lead/status"
                    element={<SettingsLeadStatus />}
                  />
                  <Route
                    path="lead/source"
                    element={<SettingsLeadSource />}
                  />
                  <Route
                    path="property/type"
                    element={<SettingsPropretiesType />}
                  />
                  <Route
                    path="property/direction"
                    element={<SettingsPropertiesDirection />}
                  />
                  <Route
                    path="property/features"
                    element={<SettingsPropertiesFeatures />}
                  />
                  {/* <Route
                path="property/details"
                element={<SettingsPropertiesDetails />}
              /> */}
                </Route>
                <Route
                  path="tickets"
                  element={<CrmTickets />}
                />
                <Route
                  path="reports"
                  element={<Reports />}
                />
                <Route
                  path="account-setting"
                  element={<AccountSettings />}
                />
              </>
            )}
            {/* Users */}
            <Route
              path="users"
              element={<UserController />}>
              {user?.identity === "admin" && (
                <>
                  <Route
                    index
                    element={<Users />}
                  />
                  <Route
                    path="adduser"
                    element={<UserInfo />}
                  />
                </>
              )}
              <Route
                path=":id"
                element={<UserInfo />}
              />
            </Route>

            <Route
              path="calendar"
              element={<CalenderPage />}
            />
            {/* <Route
              path="invoice"
              element={<Invoice />}
            /> */}
            <Route
              path="todo"
              element={<Todo />}
            />
            <Route
              path="teams"
              element={<Teams />}
            />
            <Route
              path="teams/:id"
              element={<Team />}
            />
            <Route
              path="chat"
              element={<Chat />}
            />
            {user?.identity !== "user" && (
              <Route
                path="history"
                element={<ChatHistory />}
              />
            )}
            {/* <Route
              path="/test-endpoint"
              element={<TestServerConnection />}
            /> */}

            {/* Leads */}
            <Route
              path="leads"
              element={<LeadsControler />}>
              <Route
                index
                element={<Leads />}
              />
              <Route
                path=":id"
                element={<LeadInfo />}
              />
              <Route
                path="addlead"
                element={<AddLead />}
              />
              <Route
                path="importleads"
                element={<ImportLeads />}
              />
            </Route>
           

            {/* Customers */}
            <Route
              path="customers"
              element={<LeadsControler />}>
              <Route
                index
                element={<Customers />}
              />
              <Route
                path=":id"
                element={<LeadInfo />}
              />
              <Route
                path="addlead"
                element={<AddLead />}
              />
              <Route
                path="importleads"
                element={<ImportLeads />}
              />
            </Route>

            {/* Items */}
            <Route
              path="items"
              element={<ItemsControler />}>
              <Route
                path="services"
                element={<Service />}
              />
              <Route
                path="product"
                element={<Product />}
              />
              <Route
                path="product/:id"
                element={<ProductPreview />}
              />
              <Route
                path="product/categories"
                element={<ProductCategories />}
              />
              <Route
                path="property"
                element={<Units />}
              />
              <Route
                path="property/:id"
                element={<PropertiesPreview />}
              />
            </Route>

            {/* Modules Control */}
            {/* <Route
            path="modules-control"
            element={<ModulesControler />}>
            <Route
              index
              element={<ModulesControl />}
            />
            <Route
              path="profile"
              element={<ModuleProfile />}
            />
            <Route
              path="modules-customers"
              element={<ModuleCustomers />}
            />
            <Route
              path="sales"
              element={<ModuleSales />}
            />
            <Route
              path="calender"
              element={<ModuleCalender />}
            />
            <Route
              path="module-view"
              element={<ModulesView />}
            />
            <Route
              path="tickets"
              element={<ModuleTickets />}
            />
          </Route> */}
            {/* CUstomers */}
            {/*<Route
            path="customers"
            element={<CustomerControler />}>
            <Route
              index
              element={<Customers />}
            />
            <Route
              path="profile"
              element={<CustomersProfile />}
            />
            <Route
              path="contact-number"
              element={<ContactNumber />}
            />
          </Route>
          */}
          </Route>
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
    </>
  );
}

export default App;
