# 🎬 myFlix Client (React)

This is the **client-side** application for the **myFlix Movie API**, built using **React**. It allows users to browse a collection of movies, view detailed information, and manage their user profiles.

> This project connects to the [myFlix API](https://github.com/your-username/myFlix-api) which handles authentication, user data, and movie data.

---

## 🚀 Features

- 🔐 JWT-based authentication (login/signup)
- 🎥 View all movies
- 🎞️ Filter by genre or director
- ❤️ Add/remove favorite movies
- 🧑 User profile view and updates
- 📱 Responsive design using Bootstrap

---

## 🧰 Technologies Used

- React
- React Router
- Axios
- Bootstrap
- Parcel (or Webpack)
- ESLint + Prettier
- JWT for authentication

---

## 🛠️ Installation

1. **Clone this repository**

```bash
git clone https://github.com/your-username/myflix-client.git
cd myflix-client
Install dependencies

bash
Copy
Edit
npm install
Set environment variables

Create a .env file in the root directory:

env
Copy
Edit
REACT_APP_API_URL=http://localhost:8080
Update this URL if your API is deployed (e.g., Heroku).

Start the app

bash
Copy
Edit
npm start
🧪 Scripts
Command	Description
npm start	Starts the development server
npm run build	Builds the app for production
npm run lint	Lint the code with ESLint
npm run format	Format code using Prettier

📸 Screenshots
<!-- You can replace with your own screenshots -->



📁 Project Structure
sql
Copy
Edit
src/
├── components/
│   ├── login-view/
│   ├── signup-view/
│   ├── movie-card/
│   ├── movie-view/
│   ├── profile-view/
│   └── ...
├── scss/
├── App.jsx
├── main.jsx
└── index.html
🌐 Deployment
To build the app for production:

bash
Copy
Edit
npm run build
Deploy the contents of the dist/ folder to your preferred static hosting platform (e.g., Netlify, Vercel, GitHub Pages).

🔐 Authentication
This app uses JWT (JSON Web Tokens) for secure access. Users must register and log in to get a token which is stored in localStorage and used for all protected requests to the API.

📬 API Endpoints (used)
POST /login – Login and receive JWT token

POST /users – Register new user

GET /movies – Get list of movies

GET /movies/:title – Get a single movie

GET /genres/:name – Get genre details

GET /directors/:name – Get director details

PUT /users/:username – Update user info

POST /users/:username/favorites/:movieID – Add favorite movie

DELETE /users/:username/favorites/:movieID – Remove favorite movie

DELETE /users/:username – Delete account

📚 Related Repositories
myFlix API (server-side)

👨‍💻 Author
Anthony Pirolli

Portfolio: dothingjob.com
GitHub: @apirollijr

📝 License
This project is licensed under the MIT License.
