import './App.css';
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import Landingpage from './screen/landing page/Landingpage';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import MyNotes from './screen/MyNotes/MyNotes';
import RegisterScreen from './screen/RegisterScreen/RegisterScreen';
import LoginScreen from './screen/LoginScreen/LoginScreen';
import CreateNote from './screen/CreateNote/CreateNote';
import SingleNote from './screen/SingleNote/SingleNote';
import { useState } from 'react';
import ProfileScreen from './screen/ProfileScreen/ProfileScreen';
const App = () => {
    const [search, setSearch] = useState("");
    return (
    <BrowserRouter>
        <Header setSearch={setSearch} />
        <main>
        <Routes>
        <Route path="/" element={<Landingpage/>}/>
        <Route path="/login" element={<LoginScreen/>} />
        <Route path="/profile" element={<ProfileScreen/>} />
        <Route path="/register" element={<RegisterScreen/>} />
        <Route path="/createnote" element={<CreateNote/>} />
        <Route path="/note/:id" element={<SingleNote/>} />
        <Route path="/mynotes" element={<MyNotes search={search}/>} />
        </Routes>
        </main>
        <Footer/>
    </BrowserRouter>
);
}

export default App; 
