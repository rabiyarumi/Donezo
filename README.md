```markdown
# Task Management Application

## 📌 Short Description
A Task Management Application where users can add, edit, delete, and reorder tasks using a drag-and-drop interface. Tasks are categorized into To-Do, In Progress, and Done, with real-time synchronization using MongoDB. Users must be authenticated via Firebase (Google Sign-In) to manage their tasks.

## 🌐 Live Links
-  [Live Demo](https://donezo-f6882.web.app/login)
-  [Backend API](https://donezo-server-pi.vercel.app/)

## 📦 Dependencies
### Client (Frontend):
- Vite.js + React
- React Router
- Firebase Authentication
- Axios
- react-beautiful-dnd (or an alternative drag-and-drop library)

### Server (Backend):
- Node.js
- Express.js
- MongoDB + Mongoose
- WebSockets (if implemented)
- CORS

## 🔧 Installation Steps
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo/task-management-app.git
   cd task-management-app
   ```

2. **Install dependencies for both client and server:**
   ```sh
   cd client
   npm install
   cd ../server
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the `server` folder with:
     ```env
     MONGO_URI=your_mongodb_connection_string
     FIREBASE_API_KEY=your_firebase_api_key
     ```
   - Create a `.env` file in the `client` folder with:
     ```env
     VITE_FIREBASE_API_KEY=your_firebase_api_key
     VITE_BACKEND_URL=http://localhost:5000
     ```

4. **Run the backend server:**
   ```sh
   cd server
   npm run dev
   ```

5. **Run the frontend:**
   ```sh
   cd client
   npm run dev
   ```

6. Open the app in your browser at `http://localhost:5173`.

## 🛠️ Technologies Used
- **Frontend:** React (Vite), React Router, Firebase Authentication, react-beautiful-dnd
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, WebSockets (if implemented)
- **Database:** MongoDB (hosted on MongoDB Atlas or local)
- **Authentication:** Firebase (Google Sign-In)
- **Real-time Sync:** MongoDB Change Streams/WebSockets (if implemented)
- **Deployment:** Vercel (Frontend) & Render/Heroku (Backend) *(if applicable)*
```

