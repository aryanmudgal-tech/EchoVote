# EchoVote

A full-stack web application built as a university project to enable students to post, engage with, and respond to community issues or concerns. The app supports secure user authentication, a dynamic post feed, and responsive UI.

---

## ✨ Features

- **Secure User Registration** with OTP verification (only `buffalo.edu` emails allowed).
- **JWT Authentication** for login/logout.
- **Post Creation, Viewing, and Deletion** for users.
- **Like/Unlike System** (1 like per user per post; toggle supported).
- **Threaded Replies** (commenting system under each post).
- **Profile Page** showing all posts by the logged-in user.
- **Responsive UI** built with React and Bootstrap.

---

## 🧰 Tech Stack

### Frontend:
- React  
- Bootstrap  
- Axios  
- React Router  
- React Hot Toast

### Backend:
- Node.js  
- Express  
- Sequelize ORM  
- PostgreSQL  
- nodemailer (for sending OTPs via Gmail SMTP)  
- JWT (for auth)  
- dotenv (for managing environment variables)

---

## 📕 Setup Instructions

### Prerequisites:
- Node.js and npm  
- PostgreSQL

### Backend Setup:
1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the root of the `backend` directory. **DO NOT** commit this file.

    #### Required `.env` Variables:
    ```env
    PORT=5000
    DB_NAME=your_db_name
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_HOST=localhost
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_gmail@gmail.com
    EMAIL_PASS=your_app_password
    ```

4. Create the PostgreSQL database and run any migrations if needed.

5. Start the server:
    ```bash
    npm start
    ```

### Frontend Setup:
1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the React dev server:
    ```bash
    npm start
    ```

---

## 🧲 User Flows

### 1. Signup with OTP:
- Only `@buffalo.edu` emails allowed.
- User receives a 6-digit OTP via email.
- Must verify OTP before registering.

### 2. Login:
- Email + Password based login.
- JWT token stored after successful login.

### 3. Create Post:
- Users can submit posts via a form.
- Posts are visible on the homepage.

### 4. Like/Unlike Posts:
- Each post can be liked/unliked once per user.
- Like counts displayed.

### 5. Comment (Reply):
- Posts support comments shown as threads.
- Anyone logged in can reply.

### 6. Profile Page:
- Displays all posts by the current user.
- Users can delete their own posts.

---

## 🗂 Deployment Tips

- Never commit `.env` or any secrets to Git.
- Use Gmail App Passwords for production email.
- Use HTTPS in production environments.
- Recommended hosting:
  - Backend: Render / Railway / Heroku
  - Frontend: Vercel / Netlify
  - Database: Supabase / Neon / Railway

---

## ✅ Best Practices

- Sanitize inputs on both client and server.
- Handle JWT expiration and refresh logic.
- Rate limit API routes to prevent abuse.
- Keep environment variables secure.

---

## ⚙️ Project Structure (Example)

```bash
/echovote
  /src
    /components
    /pages
    /utils
  /backend
    /models
    /routes
    /controllers
    /middlewares
    /utils
  .env (gitignored)
  README.md
