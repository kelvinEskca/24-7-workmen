import './index.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import Info from './views/Info';
import Privacy from './views/Privacy';
import Terms from './views/Terms';
import Blog from './views/Blog';
import SingleBlog from './views/SingleBlog';
import How from './views/How';
import WishList from './views/WishList';
import Faq from './views/Faq';
import Contact from './views/Contact';
import Login from './views/Login';
import Reset from './views/Reset';
import Register from './views/Register';
import Account from './views/Account';
import Profile from './views/Profile';
import Documents from './views/Documents';
import Projects from './views/Projects';
import Notification from './views/Notification';
import Saved from './views/Saved';
import ProtectedRoute from './views/ProtectedRoute';
import AdminRoute from './views/AdminRoute';
import AdminDashboard from './views/AdminDashboard';
import CategoryList from './views/CategoryList';
import ProjectsList from './views/ProjectsList';
import DocumentsList from './views/DocumentsList';
import ArtisanList from './views/ArtisanList';
import BlogList from './views/BlogList';
import UserList from './views/UserList';
import UserView from './views/UserView';
import Category from './views/Category';
import BlogAdd from './views/BlogAdd';
import Business from './views/Business';
import BlogView from './views/BlogView';
import CategoryView from './views/CategoryView';
import KycView from './views/KycView';
import ProjectView from './views/ProjectView';
import ArtisanView from './views/ArtisanView';
import AdDetails from './views/AdDetails';
import AdDetail from './views/AdDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/:id" element={<AdDetails />}/>
        <Route exact path="/addetails/:id" element={<AdDetail />}/>
        <Route exact path="/about" element={<About />}/>
        <Route exact path="/info" element={<Info />}/>
        <Route exact path="/privacy" element={<Privacy />}/>
        <Route exact path="/terms" element={<Terms />}/>
        <Route exact path="/blog" element={<Blog />}/>
        <Route exact path="/singleBlog/:id" element={<SingleBlog />}/>
        <Route exact path="/how" element={<How />}/>
        <Route exact path="/wishlist" element={<WishList />}/>
        <Route exact path="/faq" element={<Faq />}/>
        <Route exact path="/contact" element={<Contact />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/reset" element={<Reset />}/>
        <Route exact path="/register" element={<Register />}/>
        <Route exact path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>}/>
        <Route exact path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
        <Route exact path="/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>}/>
        <Route exact path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>}/>
        <Route exact path="/business" element={<ProtectedRoute><Business /></ProtectedRoute>}/>
        <Route exact path="/notification" element={<ProtectedRoute><Notification /></ProtectedRoute>}/>
        <Route exact path="/admindashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>}/>
        <Route exact path="/documentsList" element={<AdminRoute><DocumentsList /></AdminRoute>}/>
        <Route exact path="/projectsList" element={<AdminRoute><ProjectsList /></AdminRoute>}/>
        <Route exact path="/categoryList" element={<AdminRoute><CategoryList /></AdminRoute>}/>
        <Route exact path="/artisanList" element={<AdminRoute><ArtisanList /></AdminRoute>}/>
        <Route exact path="/blogList" element={<AdminRoute><BlogList /></AdminRoute>}/>
        <Route exact path="/blogview/:id" element={<AdminRoute><BlogView /></AdminRoute>}/>
        <Route exact path="/categoryview/:id" element={<AdminRoute><CategoryView /></AdminRoute>}/>
        <Route exact path="/kycView/:id" element={<AdminRoute><KycView /></AdminRoute>}/>
        <Route exact path="/projectView/:id" element={<AdminRoute><ProjectView /></AdminRoute>}/>
        <Route exact path="/userList" element={<AdminRoute><UserList /></AdminRoute>}/>
        <Route exact path="/userView/:id" element={<AdminRoute><UserView /></AdminRoute>}/>
        <Route exact path="/category" element={<AdminRoute><Category /></AdminRoute>}/>
        <Route exact path="/artisanView" element={<AdminRoute><ArtisanView /></AdminRoute>}/>
        <Route exact path="/blogadd" element={<AdminRoute><BlogAdd /></AdminRoute>}/>
        <Route exact path="/saved" element={<ProtectedRoute><Saved /></ProtectedRoute>}/>
      </Routes>
    </Router>
  );  
}
 
export default App;