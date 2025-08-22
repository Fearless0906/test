import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserList from "./components/UserList";
import UserFormContainer from "./components/UserFormContainer";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg p-4">
          <div className="max-w-4xl mx-auto flex justify-between">
            <Link to="/" className="text-xl font-bold text-gray-800">
              User Management
            </Link>
            <div className="space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-800">
                New User
              </Link>
              <Link to="/users" className="text-gray-600 hover:text-gray-800">
                View Users
              </Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<UserFormContainer mode="create" />} />
          <Route path="/users" element={<UserList />} />
          <Route
            path="/users/create"
            element={<UserFormContainer mode="create" />}
          />
          <Route
            path="/users/:id/edit"
            element={<UserFormContainer mode="edit" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
