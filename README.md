# 🎮 Gaming Forum - React Application

A modern, fully-featured gaming discussion forum built with React 19 and Vite. Connect with gamers worldwide to discuss PC games, console titles, mobile games, and stay updated with gaming news.

## ✨ Features

### Core Functionality
- **Gaming Categories**: PC Games 🖥️, Console Games 🎮, Mobile Games 📱, Gaming News 📰
- **Topic Management**: Create, edit, and delete gaming discussion topics
- **Interactive Comments**: Add, edit, and delete comments on topics
- **User Profiles**: View user profiles with their topics and activity
- **Like System**: Like topics to show support (authenticated users only)
- **Authentication**: Complete user authentication with login/register
- **Protected Routes**: Private routes for authenticated users, guest-only routes for login/register

### Technical Features
- React Router v6 with dynamic routing
- AuthContext with localStorage persistence
- PrivateRoute and GuestRoute wrappers for route protection
- Modern gradient-based UI with purple/blue color scheme
- Responsive design for mobile and desktop
- Smooth transitions and hover effects
- Custom scrollbar styling

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

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in terminal)

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
├── services/           # API services
│   ├── postService.js  # Topic CRUD operations
│   ├── commentService.js # Comment operations
│   └── profileService.js # User profile operations
└── config/             # Configuration files
    └── constants.js    # App constants (routes, categories, seed data)
```

## 🛣️ Routes

### Public Routes
- `/` - Home landing page with hero section and features
- `/forum` - Gaming forum with category filtering
- `/topics/:postId` - Topic details with comments

### Guest-Only Routes (redirect to forum if authenticated)
- `/login` - User login
- `/register` - User registration

### Protected Routes (require authentication)
- `/profile/:userId` - User profile
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

The application uses a simplified authentication system with localStorage:
- Login with any username/password (demo purposes)
- User data persists in localStorage
- Protected routes require authentication
- Guest routes redirect authenticated users

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

This is a frontend-only application with simulated backend services. All data is stored in memory and resets on page refresh. For a production application, connect to a real backend API.

## 🤝 Contributing

This is a learning project for SoftUni React course. Feel free to fork and modify for your own use.

## 📄 License

This project is open source and available for educational purposes.
