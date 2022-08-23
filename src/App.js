import React, { Component } from "react";
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />}/>
                </Routes>
            </BrowserRouter>
        );
    }
}
export default App;