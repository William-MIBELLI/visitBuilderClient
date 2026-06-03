
import './App.css';
import MainLayout from './Layout/MainLayout';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ShopsRoute from './Routes/ShopsRoute';
import UsersRoute from './Routes/UsersRoute';
import MapRoute from './Routes/MapRoute';
import NotFoundRoute from './Routes/NotFoundRoute';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />} >
          <Route index element={<Navigate to="/map" replace/> } />
          <Route path='map' element={<MapRoute/> } />
          <Route path='shops' element={<ShopsRoute />} />
          <Route path='users' element={<UsersRoute />} />
          <Route path='*' element={<NotFoundRoute />} />
        </Route>
      </Routes>
     
    </BrowserRouter>
  )
}

export default App
