# AURA & FORM — Luxury Interior Architecture & Design Studio

A production-ready, full-stack **MERN** (MongoDB, Express.js, React, Node.js) web application and content management system designed for a high-end luxury interior design studio.

---

## 1. Features Overview

### Public Website
- **Editorial Luxury Aesthetics**: Curated beige, cream, travertine, and charcoal palette with Cormorant Garamond serif headings, smooth glassmorphism navbars, and subtle Framer Motion entrance animations.
- **Hero Section**: Full-viewport cinematic interior background, animated badges, and quick CTA access.
- **Strict 4-Category System**:
  1. `Living Room` (`/projects/living-room`)
  2. `Bedroom` (`/projects/bedroom`)
  3. `Kitchen` (`/projects/kitchen`)
  4. `Full Home` (`/projects/full-home`)
- **Dynamic Portfolio (`/projects`)**:
  - Filterable by all 4 categories with smooth tab transitions.
  - Real-time search query filtering by design style, location, and keywords.
  - Detailed case study view (`/project/:id`) with architectural narrative, specifications bar, authentic material tags, high-resolution photo lightbox, and related project suggestions.
- **About Studio (`/about`)**: Brand philosophy narrative, 4-stage design process milestone cards, and leadership team showcase.
- **Interactive Consultation Form (`/contact`)**:
  - Full client lead capture (Name, Phone/WhatsApp, Email, City, Property Type [1 BHK, 2 BHK, 3 BHK, 4 BHK, Villa, Other], Budget, Message).
  - Instant validation with React Hot Toast feedback.
  - Direct WhatsApp quick-action button and interactive Google Maps center embed.

### Admin Portal (`/admin`)
- **Secure JWT Authentication**: Protected routes with token expiry handling and instant profile verification.
- **Dashboard Overview (`/admin/dashboard`)**:
  - 7 KPI metric cards (Total Projects, 4 category breakdowns, Total Enquiries, Testimonials).
  - Recent consultation inquiries table with one-click status changer (`New`, `Contacted`, `Closed`).
  - Recent portfolio project quick links.
- **Project Management (`/admin/projects`)**:
  - Full CRUD capabilities (Add, Edit, Delete with modal confirmation).
  - Dual upload support: Direct file upload to Cloudinary (with automatic local disk storage fallback if Cloudinary credentials are not configured) or direct high-res image URLs.
  - Dynamic material tags, featured badge toggle, and multiple gallery images.
- **Testimonial Management (`/admin/testimonials`)**:
  - Add, edit, and delete client reviews with star ratings (1-5) and avatar uploads.
- **Lead CRM (`/admin/enquiries`)**:
  - Comprehensive leads table with status badges, search by client/city, detailed message modal, and direct "Reply via WhatsApp" trigger.

---

## 2. Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS (Custom luxury design system)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Token (JWT) & bcryptjs
- **File Uploads**: Multer & Multer-Storage-Cloudinary (with automatic local fallback)
- **Environment & Security**: dotenv, CORS

---

## 3. Project Structure

```text
interior-design/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── SectionTitle.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── TestimonialCard.jsx
│   │   │   ├── ContactCTA.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── CategoryProjects.jsx
│   │   │   ├── ProjectDetails.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── NotFound.jsx
│   │   ├── admin/
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ManageProjects.jsx
│   │   │   ├── AddProject.jsx
│   │   │   ├── EditProject.jsx
│   │   │   ├── ManageTestimonials.jsx
│   │   │   └── ManageEnquiries.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── data/
│   │   │   └── categories.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── enquiryController.js
│   │   ├── testimonialController.js
│   │   └── dashboardController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── uploadMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Project.js
│   │   ├── Enquiry.js
│   │   └── Testimonial.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── enquiryRoutes.js
│   │   ├── testimonialRoutes.js
│   │   └── dashboardRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── seedData.js
│   ├── uploads/
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## 4. Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/interior_design
JWT_SECRET=super_secret_jwt_key_interior_studio_2026
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

> **Note on Cloudinary**: If Cloudinary credentials are omitted or blank, the backend automatically uses its local disk storage fallback in `backend/uploads/` and serves files statically.

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 5. Quick Start & Setup

### 1. Prerequisites
- **Node.js**: v18 or higher
- **MongoDB**: Local MongoDB community service or MongoDB Atlas connection string

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Seed the database (Creates Admin, 16 Projects across 4 categories, 4 Testimonials, 3 Enquiries)
npm run seed

# Start backend server
npm run dev
# Backend runs on http://localhost:5000
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 6. Default Admin Login Credentials

| Role | Email | Password |
|---|---|---|
| **Principal Administrator** | `admin@studio.com` | `admin123` |

Access the admin login page at: **`http://localhost:5173/admin/login`** (Includes a 1-click **"Auto-fill Demo Credentials"** button).

---

## 7. REST API Endpoints

### Authentication
- `POST /api/auth/login` — Login admin & receive JWT token
- `GET  /api/auth/me` — Verify authenticated admin profile (Protected)

### Projects
- `GET    /api/projects` — Fetch all projects (Supports `?category=`, `?featured=true`, `?search=`)
- `GET    /api/projects/:id` — Fetch single project details & 3 related projects by ID or slug
- `POST   /api/projects` — Create project with main/gallery image uploads (Protected)
- `PUT    /api/projects/:id` — Update project specifications & images (Protected)
- `DELETE /api/projects/:id` — Delete project (Protected)

### Enquiries
- `POST   /api/enquiries` — Public submission of consultation booking
- `GET    /api/enquiries` — Fetch all enquiries (Supports `?status=`, `?search=`) (Protected)
- `PUT    /api/enquiries/:id` — Update enquiry status (`New`, `Contacted`, `Closed`) (Protected)
- `DELETE /api/enquiries/:id` — Delete enquiry (Protected)

### Testimonials
- `GET    /api/testimonials` — Public list of client testimonials
- `POST   /api/testimonials` — Create testimonial with image upload (Protected)
- `PUT    /api/testimonials/:id` — Update testimonial (Protected)
- `DELETE /api/testimonials/:id` — Delete testimonial (Protected)

### Dashboard
- `GET    /api/dashboard/stats` — Aggregate metrics & recent activity (Protected)
