import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home/Home'
import { Catalog } from '../pages/Catalog/Catalog'
import { Details } from '../pages/Details/Details'
import { Login } from '../pages/Login/Login'
import { Register } from '../pages/Register/Register'
import { Profile } from '../pages/Profile/Profile'
import { Create } from '../pages/Create/Create'
import { Edit } from '../pages/Edit/Edit'
import { PrivateRoute } from './PrivateRoute'
import { GuestRoute } from './GuestRoute'

// Central routing config for the app
// Public routes: home, catalog, details
// Guest-only routes: login, register (wrapped in GuestRoute)
// Protected routes: profile, create, edit (wrapped in PrivateRoute)
function AppRouter() {
  return (
    <Routes>
      {/* Public pages - anyone can access */}
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/details/:id" element={<Details />} />
      
      {/* Guest-only pages - only for non-authenticated users */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />
      
      {/* Protected pages - require authentication */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/create"
        element={
          <PrivateRoute>
            <Create />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <PrivateRoute>
            <Edit />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export { AppRouter }
