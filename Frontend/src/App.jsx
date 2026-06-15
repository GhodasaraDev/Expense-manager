import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import IncomeList from "./pages/IncomeList";
import AddIncome from "./pages/AddIncome";
import EditIncome from "./pages/EditIncome";
import ExpenseList from "./pages/ExpenseList";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ExpenseProvider } from "./context/ExpenseContext";
import { IncomeProvider } from "./context/IncomeContext";
import { SettingsProvider } from "./context/SettingsContext";
import { ProjectProvider } from "./context/ProjectContext";

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <ProjectProvider>
          <ExpenseProvider>
            <IncomeProvider>
              <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              {/* Income Routes */}
              <Route
                path="/income"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <IncomeList />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/income/add"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AddIncome />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/income/edit/:id"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <EditIncome />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              {/* Expense Routes */}
              <Route
                path="/expenses"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ExpenseList />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/expenses/add"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AddExpense />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/expenses/edit/:id"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <EditExpense />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              {/* Legacy routes redirect - Removed as we updated the links */}
              {/* <Route path="/add" element={<Navigate to="/expenses/add" replace />} /> */}
              {/* <Route path="/edit/:id" element={<Navigate to="/expenses/edit/:id" replace />} /> */}

              {/* Reports & Settings */}
              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Reports />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Settings />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
            </IncomeProvider>
          </ExpenseProvider>
        </ProjectProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
