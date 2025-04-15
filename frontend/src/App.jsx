import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import UpdateUser from "./components/UpdateUser";
import Navbar from "./components/layout/Navbar";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import LoginPage from "./components/LoginPage";
ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/update-user/:id" element={<UpdateUser />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
