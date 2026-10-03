# SpendWise 💰

SpendWise is a beginner-friendly full-stack personal expense tracker.

## Features

- Add income and expenses
- Categorize transactions
- Track total balance
- Search transactions
- Delete transactions
- MongoDB database
- Responsive design

## Technologies

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure

```text
SpendWise/
├── backend/
│   ├── models/
│   │   └── Transaction.js
│   ├── routes/
│   │   └── transactions.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── .gitignore
└── README.md
```

## How to Run

### 1. Install Node.js

Install Node.js from the official website:
https://nodejs.org/

Check installation:

```bash
node -v
npm -v
```

### 2. Create MongoDB Atlas database

Create a free MongoDB Atlas account and create a cluster.

Create a database user and copy your MongoDB connection string.

### 3. Configure backend

Open the `backend` folder.

Create a file named `.env`.

Copy the contents of `.env.example` into `.env` and replace the username, password and cluster URL with your MongoDB connection string.

Example:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/spendwise?retryWrites=true&w=majority
```

### 4. Install dependencies

In Terminal:

```bash
cd backend
npm install
```

### 5. Start the backend

```bash
npm start
```

You should see:

```text
MongoDB Connected
Server running at http://localhost:5000
```

### 6. Open the frontend

Open:

```text
frontend/index.html
```

in your browser.

For the best development experience, use VS Code with the Live Server extension.

## GitHub

```bash
git init
git add .
git commit -m "Initial commit - SpendWise"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Important

Never upload your `.env` file to GitHub. The `.gitignore` file already prevents it from being uploaded.

## Future Improvements

- User login/signup
- Monthly expense charts
- Edit transactions
- Budget limits
- Export CSV/PDF
- Dark mode
- Cloud deployment
