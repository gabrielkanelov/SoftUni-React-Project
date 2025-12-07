# React + Vite Day 1 Setup

Baseline React + Vite app with routing, authentication context, and guarded routes.

## Features
- React Router v6 with Home, Catalog, Details, Login, Register, Profile, Create, Edit pages
- AuthContext with localStorage persistence and dummy login/register/logout
- PrivateRoute and GuestRoute wrappers for guarding protected/guest paths
- Header navigation with conditional links and simple footer

## Routes
- `/` Home
- `/catalog` Catalog
- `/details/:id` Details
- `/login` guest-only
- `/register` guest-only
- `/profile` private
- `/create` private
- `/edit/:id` private

## Scripts
- `npm run dev` start dev server
- `npm run build` production build
- `npm run preview` preview build
