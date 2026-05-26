# 📚 BookShelf — Book Management System

A full-featured **Book Management System** built with **React 18 + Vite + Tailwind CSS**, integrated with a live REST API (MockAPI.io) to perform all CRUD operations.

## 🔗 Links

- **Live Demo:** https://book-management-system-ldwy.vercel.app


---

## ✨ Features

- 📖 View all books in a responsive card grid
- ➕ Add new books via a validated form
- ✏️ Edit existing book details
- 🗑️ Delete books with confirmation dialog
- 🔍 Search books by title or author (real-time)
- 🎯 Filter books by genre
- 📊 Stats bar (Total books, Showing, Genres)
- 🔔 Toast notifications for all actions
- ⚠️ Loading states and error handling
- 📱 Fully mobile responsive

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 + Vite | Frontend framework |
| Tailwind CSS | Styling |
| Axios | API calls |
| React Router v6 | Routing |
| React Hot Toast | Notifications |
| MockAPI.io | REST API (mock backend) |

---

## 📁 Project Structure

```
src/
├── api/
│   └── bookApi.js        # Axios API functions
├── components/
│   ├── BookCard.jsx      # Individual book card
│   ├── BookForm.jsx      # Add/Edit form with validation
│   ├── BookModal.jsx     # Reusable modal wrapper
│   ├── DeleteConfirm.jsx # Delete confirmation dialog
│   ├── FilterBar.jsx     # Search + Genre filter + Add button
│   ├── Loader.jsx        # Loading spinner
│   └── Navbar.jsx        # Top navigation bar
├── pages/
│   ├── Home.jsx          # Main page with all logic
│   └── NotFound.jsx      # 404 page
├── App.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Rohitchouhan23/book-management-system.git
cd book-management
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file in root directory
```
VITE_API_URL=https://your-mockapi-id.mockapi.io/api/v1
```

> **Note:** Create a free account at [mockapi.io](https://mockapi.io), create a project, and add a resource named `books` with fields: `title`, `author`, `genre`, `year`, `description`.

### 4. Run locally
```bash
npm run dev
```

App will run at `http://localhost:5173`

### 5. Build for production
```bash
npm run build
```

---

## 🌐 API Endpoints Used

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Fetch all books |
| POST | `/books` | Add a new book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

---

