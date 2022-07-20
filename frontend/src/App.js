import { Route, Routes } from "react-router-dom"
import './App.css';

import Layout from "./components/layout/Layout"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={}/>
        <Route path="" element={}/>
        <Route path="" element={}/>
      </Routes>
    </Layout>
  );
}

export default App;
