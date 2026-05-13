
# 🏏 Cricket Gears – E-Commerce Platform for Cricket Equipment

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![React](https://img.shields.io/badge/React-19.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4)

## 📌 Project Overview

**Cricket Gears** is a full-stack e-commerce web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). The platform allows users to browse, search, filter, and purchase cricket equipment including bats, balls, helmets, gloves, pads, and complete kits. It features a dedicated admin dashboard for managing products, orders, and users, along with an automated email notification system.

🔗 **Live Demo / Repository:** [https://github.com/Haider-Abbas028/CricketGears](https://github.com/Haider-Abbas028/CricketGears)

---

## 🚀 Features

### 👤 User Features
- User registration & login with JWT authentication
- Browse products with search, filters (price, brand), and sorting
- Add to cart with multiple price variants per product
- Persistent cart using localStorage
- Place orders with shipping details
- Receive order confirmation via email (Nodemailer)
- View order history

### 👑 Admin Features
- Dedicated admin dashboard
- **Product Management** – Add, edit, delete products
- **Order Management** – Update order status (pending/shipped/delivered)
- **User Management** – View, edit, delete users, change roles
- Dashboard statistics overview

### 🛠️ Technical Features
- Role-based access control (User / Admin)
- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- Responsive UI with Tailwind CSS
- Loading skeletons for better UX
- Protected routes middleware

---

## 🧱 Tech Stack

| Category       | Technology                          | Version   |
|----------------|-------------------------------------|-----------|
| Frontend       | React.js                            | 19.x      |
| Routing        | React Router DOM                    | 7.x       |
| Styling        | Tailwind CSS                        | 4.x       |
| HTTP Client    | Axios                               | 1.x       |
| Icons          | React Icons                         | 5.x       |
| Backend        | Node.js                             | 20.x      |
| Framework      | Express.js                          | 4.x       |
| Database       | MongoDB                             | 6.x       |
| ODM            | Mongoose                            | 8.x       |
| Authentication | JWT                                 | 9.x       |
| Password Hash  | bcryptjs                            | 2.x       |
| Email Service  | Nodemailer                          | 6.x       |
| Build Tool     | Vite                                | 5.x       |

---

## 📁 Project Structure

```
CricketGears/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── utils/
│   │   └── sendEmail.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   │   └── CartContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v20+)
- MongoDB (local or Atlas)
- Gmail account for email notifications

### 1. Clone the Repository
```bash
git clone https://github.com/Haider-Abbas028/CricketGears.git
cd CricketGears
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/cricketgears
JWT_SECRET=your_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Access the Application
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

---

## 🧪 Testing Credentials

| Role    | Email                         | Password  |
|---------|-------------------------------|-----------|
| Admin   | `admin@cricketgears.com`      | `admin123`|
| User    | `hai@gmail.com`               | `123456`  |

---


---

## 📬 API Endpoints

### Authentication
| Method | Endpoint                 | Description        |
|--------|--------------------------|--------------------|
| POST   | `/api/auth/register`     | User registration  |
| POST   | `/api/auth/login`        | User login         |
| GET    | `/api/auth/me`           | Get current user   |

### Products
| Method | Endpoint                 | Description               |
|--------|--------------------------|---------------------------|
| GET    | `/api/products`          | Get all products + filters|
| GET    | `/api/products/:id`      | Get single product        |
| POST   | `/api/products`          | Add product (admin)       |
| PUT    | `/api/products/:id`      | Update product (admin)    |
| DELETE | `/api/products/:id`      | Delete product (admin)    |

### Orders
| Method | Endpoint                 | Description               |
|--------|--------------------------|---------------------------|
| GET    | `/api/orders`            | Get all orders (admin)    |
| POST   | `/api/orders`            | Create new order          |
| PUT    | `/api/orders/:id`        | Update order status       |

---

## 🧠 Challenges Faced & Solutions

| Challenge                              | Solution                               |
|----------------------------------------|----------------------------------------|
| Cart state management across components| Used React Context API                 |
| Email sending                          | Integrated Nodemailer with Gmail SMTP  |
| Real-time search performance           | Added debouncing (500ms delay)         |
| Order status not refreshing in UI      | Fixed callback to refresh parent state |
| MongoDB connection issues              | Switched to local MongoDB for dev      |

---

## 🔮 Future Enhancements

- 💳 Payment gateway integration (Stripe)
- ⭐ Product reviews and ratings system
- ❤️ Wishlist functionality
- 🔐 Social media login (Google / Facebook)
- 📱 Mobile app with React Native
- 📊 Advanced analytics dashboard for admin

---

## 👥 Contributors

| Name               | Roll Number |
|--------------------|-------------|
| **Haider Abbas**   | 23F-0632    |
| **Muhammad Ahmad** | 23F-0558    |

---

## 🙏 Acknowledgments

- Special thanks to our **course instructor** for guidance and support throughout this project.
- Thanks to the open-source community for amazing tools and libraries.

---

## 📄 License

This project is for **educational purposes** as part of academic coursework.

---

## ⭐ Show Your Support

If you found this project helpful or interesting, please give it a ⭐ on GitHub!

🔗 **Repository Link:** [https://github.com/Haider-Abbas028/CricketGears](https://github.com/Haider-Abbas028/CricketGears)

```

---
