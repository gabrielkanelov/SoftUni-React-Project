# 🎮 Gaming Forum - React + Node + Mongo

A modern gaming discussion forum with a React 19 + Vite frontend and a Node/Express + MongoDB backend. Discuss PC, console, and mobile games, share news, and collaborate through comments and likes.

## ✨ Features

### Core Functionality
- **Gaming Categories**: PC 🖥️, Console 🎮, Mobile 📱, News 📰
- **Topics CRUD**: Create, read, update, delete topics (authors only for edit/delete)
- **Comments**: Add/delete comments on topics (auth required)
- **Likes**: Like/unlike topics (auth required)
- **Profiles**: Authenticated profile view with basic stats
- **Authentication**: JWT login/register with protected/private routes and guest-only guards

### Technical Features
- React Router v6+ with dynamic routing and guards (PrivateRoute, GuestRoute)
- AuthContext + localStorage persistence of JWT
- REST API via Node/Express + MongoDB (Mongoose)
- Vite build/dev, ESLint
- Responsive UI with modern styling

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gabrielkanelov/SoftUni-React-Project.git
cd SoftUni-React-Project
```

2. Environment:
    - Copy `.env.example` → `.env` in project root (sets `VITE_API_URL=http://localhost:5000`).
    - Copy `backend/.env.example` → `backend/.env` and set `MONGODB_URI` (defaults to `mongodb://127.0.0.1:27017/gaming_forum`) and a `JWT_SECRET` value.

3. Install dependencies:
```bash
npm install
cd backend && npm install
cd ..
```

4. Run backend (port 5000 by default):
```bash
cd backend
npm run dev
```

5. Run frontend (Vite dev server, defaults to 5173):
```bash
npm run dev
```

6. Open the app at the Vite URL shown (usually `http://localhost:5173`).

7. MongoDB Compass: connect to `mongodb://127.0.0.1:27017/gaming_forum` to inspect stored users, posts, and embedded comments.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx       # Navigation header
│   ├── Footer.jsx       # Site footer
│   ├── PostCard.jsx     # Topic card component
│   ├── CommentForm.jsx  # Comment creation form
│   └── CommentList.jsx  # Comments display and editing
├── pages/              # Page components
│   ├── Home/           # Landing page
│   ├── Catalog/        # Forum topics list with category filtering
│   ├── PostDetails/    # Topic details with comments
│   ├── Create/         # Create new topic
│   ├── Edit/           # Edit existing topic
│   ├── Login/          # User login
│   ├── Register/       # User registration
│   └── Profile/        # User profile
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication state management
├── routes/             # Route configuration
│   ├── AppRouter.jsx   # Main router setup
│   ├── PrivateRoute.jsx # Protected route wrapper
│   └── GuestRoute.jsx  # Guest-only route wrapper
├── services/           # API services (real REST calls)
│   ├── postService.js  # Topic CRUD + likes
│   ├── commentService.js # Comment operations
│   └── profileService.js # Profile fetch + stats
└── config/             # Configuration files
    └── constants.js    # App constants (routes, categories)
```

## 🛣️ Routes

### Public Routes
- `/` - Home landing page
- `/forum` and `/catalog` - Topic list with category filtering
- `/topics/:postId` - Topic details with comments

### Guest-Only Routes (redirect to forum if authenticated)
- `/login` - User login
- `/register` - User registration

### Protected Routes (require authentication)
- `/profile` - Current user profile
- `/create` - Create new topic
- `/edit/:id` - Edit existing topic

## 🎨 Styling

The application features a modern design system with:
- **Primary Gradient**: Purple to Blue (#667eea → #764ba2)
- **Neutral Colors**: Gray scale for backgrounds and text
- **CSS Variables**: Consistent theming throughout
- **Responsive Design**: Mobile-first approach with breakpoints
- **Smooth Animations**: Subtle hover effects and transitions (no excessive animations)

## 📜 Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Create production build in `dist/` folder
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint to check code quality

## 🔑 Authentication

- JWT-based login/register against the backend (`/api/auth/login`, `/api/auth/register`).
- Token persisted in `localStorage` (`auth_token`) via AuthContext.
- Protected routes require a valid token; guest routes redirect authenticated users.

## 💬 Forum Features

### Topics
- Create topics with title, content, and category
- Edit your own topics
- Delete your own topics
- Like topics from other users
- Filter topics by gaming category

### Comments
- Add comments to topics
- Edit your own comments (shows "edited" indicator)
- Delete your own comments
- Real-time comment count display

### Categories
- 🖥️ **PC Games** - Discuss PC gaming releases and experiences
- 🎮 **Console Games** - PlayStation, Xbox, Nintendo discussions
- 📱 **Mobile Games** - Mobile gaming community
- 📰 **Gaming News** - Latest industry news and announcements

## 🛠️ Technologies

- **React 19.2.0** - UI library
- **React Router 7.1.3** - Client-side routing
- **Vite 7.2.6** - Build tool and dev server
- **ESLint** - Code quality and linting
- **CSS3** - Modern styling with gradients and transitions

## 📝 Notes

- Data persists in MongoDB; inspect with Compass at `mongodb://127.0.0.1:27017/gaming_forum`.
- Backend defaults: `PORT=5000`, `MONGODB_URI` fallback to local Mongo; adjust in `backend/.env` as needed.

## ✅ Quick verification (manual)
- Register, then login (token stored in localStorage).
- Create a topic; verify it appears in `/forum` and in Mongo `posts` collection.
- Like/unlike a topic; confirm likes increment/decrement in Mongo.
- Add a comment on a topic; confirm embedded comment is stored in Mongo.
- Open Profile to fetch user data with token (requires authenticated session).

## 🤝 Contributing

This is a learning project for SoftUni React course. Feel free to fork and modify for your own use.

## 📄 License

This project is open source and available for educational purposes.
