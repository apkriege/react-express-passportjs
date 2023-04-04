import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState("admin");
  const [password, setPassword] = useState("admin");

  useEffect(() => {
    axios
      .get("/api/user")
      .then((res) => {
        console.log('user data', res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3001/auth/google";
  };

  const handleLocalLogin = () => {
    axios
      .post("/api/login", { username: login, password: password })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    axios
      .get("/api/logout")
      .then((res) => {
        setUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {user ? (
          <div>
            <p>Welcome, {user.name}!</p>
            <img
              src={user.photos ? user.photos[0].value : "https://via.placeholder.com/50"}
              alt="profile"
              referrerPolicy="no-referrer"
              style={{ borderRadius: "100px", marginBottom: "10px" }}
            />
            <br />
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "50px" }}>
            <form style={{ display: "flex", flexDirection: "column" }}>
              <input
                type="text"
                placeholder="Login"
                onChange={(e) => setLogin(e.target.value)}
                style={{ marginBottom: "5px" }}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: "5px" }}
              />
              <button onClick={handleLocalLogin}>Login</button>
            </form>
            <hr style={{ width: "200px", margin: '20px 0' }} />
            <button onClick={handleGoogleLogin}>Login with Google</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
