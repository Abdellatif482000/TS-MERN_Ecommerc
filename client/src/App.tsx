import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./homePage/homePage";
import Layout from "./layout/layout";

// import styles from "../cssModules/style.module.css";

import "./App.css";

export default function App() {
  return (
    <div
      className="
        			border-2 border-red-500 
        			w-full
        			h-[100vh] 
        			bg-[#333]
        			text-[#fff]
        			       				"
    >
      <input type="text" id="myInput" className="text-[#000]" />

      <ul>
        <li>hi, input1</li>
        <li>two</li>
        <li>three</li>
        <li id="ENVValue"></li>
        <li id="CLIValue"></li>
      </ul>
      {/*
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>

            */}
    </div>
  );
}
