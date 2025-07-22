import React from "react";
import CompanyForm from "./components/CompanyForm";
import ChatbotWidget from "./components/ChatbotWidget";
import "./App.css";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>📊 ProSpectra - Company Tracker</h1>
      <CompanyForm />
      <ChatbotWidget />
    </div>
  );
}

export default App;
