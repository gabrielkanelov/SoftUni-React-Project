import { Routes, Route, useLocation } from 'react-router-dom'
import { Home } from '../pages/Home/Home'
import { Catalog } from '../pages/Catalog/Catalog'
import { PostDetails } from '../pages/PostDetails/PostDetails'
import { Login } from '../pages/Login/Login'
import { Register } from '../pages/Register/Register'
import { Profile } from '../pages/Profile/Profile'
import { Create } from '../pages/Create/Create'
import { Edit } from '../pages/Edit/Edit'
import { PrivateRoute } from './PrivateRoute'
import { GuestRoute } from './GuestRoute'

// Central routing config for the gaming forum
// Public routes: home, forum (catalog), topics, profile
// Guest-only routes: login, register (wrapped in GuestRoute)
// Protected routes: create, edit (wrapped in PrivateRoute)
function AppRouter() {
  const location = useLocation()

  return (
    <div className="route-viewport">
      <div key={location.pathname} className="route-fade">
        <Routes location={location}>
          {/* Public pages - anyone can access */}
          <Route path="/" element={<Home />} />
          <Route path="/forum" element={<Catalog />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/topics/:postId" element={<PostDetails />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          
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
      </div>
    </div>
  )
}

export { AppRouter }
