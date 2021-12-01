import React, { Component } from "react";
import "./App.css";
import "./Media.css";
import ApiContent from "./components/ApiContent";
import Header from "./components/Header";
import Footer from "./components/Footer";
class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <ApiContent />
        <Footer />
      </div>
    );
  }
}
export default App;
