# Google Books Inventory App

A full-stack application for searching and browsing books from the Google Books API. Built with a modern architecture using **FastAPI** backend and **Next.js** frontend.

## 🎯 Features

- **Advanced Search** - Search books by general query, title, author, or category
- **Pagination** - Navigate through search results with easy pagination controls
- **Book Details** - View comprehensive book information including:
  - Title, authors, and publisher
  - Publication date and descriptions
  - Cover images (when available)
- **Responsive Design** - Beautiful UI built with Tailwind CSS
- **Real-time Backend Integration** - Seamless connection between frontend and backend
- **Type Safety** - TypeScript throughout the frontend codebase
- **CORS Enabled** - Proper cross-origin resource sharing configuration

## 🏗️ Architecture Overview

```
google-books-inventory-app/
├── backend/                    # FastAPI backend server
│   ├── main.py                # Main application entry point
│   ├── requirements.txt        # Python dependencies
│   └── .venv/                 # Python virtual environment
│
├── google-books-nextjs/        # Next.js frontend (v16)
│   ├── app/
│   │   ├── page.tsx           # Main search page
│   │   └── layout.tsx         # App layout
│   ├── components/
│   │   ├── SearchForm.tsx     # Search input component
│   │   ├── BookCard.tsx       # Book display component
│   │   └── Pagination.tsx     # Pagination component
│   ├── lib/
│   │   └── api.ts             # API integration
│   └── .env.local             # Environment variables
│
├── google-books-ui/           # Legacy React frontend (deprecated)
│
└── README.md                  # This file
```

## 🔄 Data Flow

```
User Input (Search)
        ↓
Next.js Frontend (page.tsx)
        ↓
API Service (lib/api.ts)
        ↓
HTTP Request to Backend
        ↓
FastAPI Backend (main.py)
        ↓
Google Books API
        ↓
Response with Books Data
        ↓
Next.js Frontend Components
        ↓
Render: BookCard + Pagination
```

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Python** (3.8 or higher)
- **Git**
- **pip** (Python package manager)

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Rajkumar-21/google-books-inventory-app.git
cd google-books-inventory-app
```

### 2. Backend Setup (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   ```bash
   python -m venv .venv
   # On Windows:
   .venv\Scripts\activate
   # On macOS/Linux:
   source .venv/bin/activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   - Backend runs on: `http://localhost:8000`
   - API documentation: `http://localhost:8000/docs`

### 3. Frontend Setup (Next.js)

1. Navigate to the frontend directory:
   ```bash
   cd ../google-books-nextjs
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (`.env.local`):
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   - Frontend runs on: `http://localhost:3000`

## 🚀 Running the Application

1. **Terminal 1 - Start Backend:**
   ```bash
   cd backend
   python -m venv .venv
   .venv\Scripts\activate  # On Windows
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

2. **Terminal 2 - Start Frontend:**
   ```bash
   cd google-books-nextjs
   npm install
   npm run dev
   ```

3. **Open Browser:**
   Navigate to `http://localhost:3000` to access the application

## 🔌 Backend API Endpoints

All endpoints return paginated results with metadata:

### Search Endpoints

- **`GET /books`** - General book search
  - Query params: `q`, `page`, `results_per_page`
  - Example: `/books?q=Harry Potter&page=1&results_per_page=10`

- **`GET /books/title/{title}`** - Search by title
  - Example: `/books/title/Harry Potter`

- **`GET /books/author/{author}`** - Search by author
  - Example: `/books/author/J.K. Rowling`

- **`GET /books/category/{category}`** - Search by category
  - Example: `/books/category/Fiction`

### Response Format

```json
{
  "items": [
    {
      "id": "book-id",
      "volumeInfo": {
        "title": "Book Title",
        "authors": ["Author 1", "Author 2"],
        "publisher": "Publisher Name",
        "publishedDate": "2024-01-01",
        "description": "Book description...",
        "imageLinks": {
          "thumbnail": "image-url"
        }
      }
    }
  ],
  "pagination": {
    "total_items": 100,
    "current_page": 1,
    "total_pages": 10,
    "results_per_page": 10,
    "has_next_page": true,
    "has_previous_page": false
  }
}
```

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **httpx** - Async HTTP client for Google Books API calls
- **Pydantic** - Data validation using Python type annotations
- **Python 3.8+** - Latest Python features

### Frontend
- **Next.js 16** - React framework with app router
- **React 19** - Latest React with hooks support
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios/Fetch API** - HTTP client for backend communication

## 📝 Environment Variables

### Backend (.env)
```env
# Optional: Add any backend-specific configuration
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🐛 Troubleshooting

### SSL Certificate Error
If you encounter SSL certificate verification errors:
- The backend uses `verify=False` for development (already configured)
- For production, use proper SSL certificates

### Port Already in Use
- Backend (8000): `lsof -i :8000` (macOS/Linux) or `netstat -ano | findstr :8000` (Windows)
- Frontend (3000): `lsof -i :3000` (macOS/Linux) or `netstat -ano | findstr :3000` (Windows)

### CORS Issues
- Ensure backend CORS is configured for `http://localhost:3000`
- Backend already includes proper CORS middleware configuration

### API Connection Failed
- Verify backend is running on `http://localhost:8000`
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Open `http://localhost:8000/docs` to verify backend is working

## 📦 Dependencies

### Backend (requirements.txt)
```
fastapi==0.104.1
uvicorn==0.24.0
httpx==0.25.0
pydantic==2.4.2
python-multipart==0.0.6
```

### Frontend (package.json)
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "^16.0.0",
    "axios": "^1.8.2",
    "typescript": "^5.x"
  },
  "devDependencies": {
    "tailwindcss": "^3.x",
    "@types/react": "^19.x"
  }
}
```

## 📚 API Integration Details

The frontend uses a dedicated API service (`lib/api.ts`) that:
- Centralizes all backend API calls
- Handles error management
- Provides TypeScript type definitions
- Manages pagination state
- Implements proper error handling and logging

### Example API Call:
```typescript
import { searchBooks } from '@/lib/api';

const results = await searchBooks('Harry Potter', 1, 10);
console.log(results.items);       // Array of books
console.log(results.pagination);  // Pagination metadata
```

## 🎨 UI Components

### SearchForm
- Multi-type search (general, title, author, category)
- Real-time input handling
- Loading state management

### BookCard
- Book cover image display
- Title, authors, publisher, publication date
- Book description (truncated)
- Responsive grid layout

### Pagination
- Previous/Next navigation
- Page number buttons
- Current page indicator
- Disabled states for first/last pages

## 🔐 Security Features

- ✅ CORS middleware for frontend-backend communication
- ✅ Environment-based API URL configuration
- ✅ SSL verification (disabled for development, enable for production)
- ✅ Input validation and sanitization
- ✅ Error handling and logging

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 👤 Author

Rajkumar

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues and questions, please open an issue on GitHub or contact the maintainer.

---

**Note:** This project uses the Google Books API which requires internet connectivity. Make sure your network is properly configured.
