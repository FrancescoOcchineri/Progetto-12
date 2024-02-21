import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from '../src/pages/HomePage'
import NotFoundPage from './pages/NotFoundPage';
import NavbarComponent from '../src/components/NavbarComponent'
import Blog from './pages/Blog'
import FooterComponent from './components/FooterComponent';
import ArticleComponent from './components/ArticleComponent';
import Users from './pages/Users';

function App() {
  return (
<>
<BrowserRouter>
          <NavbarComponent />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/blog' element={<Blog />} />
            <Route path="/post/:id" element={<ArticleComponent />} />
            <Route path="/users" element={<Users />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
          <FooterComponent />
        </BrowserRouter>
</>
  );
}

export default App;
