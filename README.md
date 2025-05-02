# 🎵 Playlist Generator

A full-stack web application that uses Spotify's PKCE authorization flow to generate music playlists based on your saved tracks. Built with **React (Ionic)** on the frontend and **Flask** on the backend, this app analyzes your music preferences to assist in playlist generation.

## 👥 Collaborators

- `josephmoore@u.boisestate.edu`
- `anirudshrestha@u.boisestate.edu`

---

## 🚀 Getting Started

### 1. Frontend (Client - React + Vite + Ionic)

> Make sure you have [Node.js](https://nodejs.org/) installed.

```bash
cd client
npm install
npm run dev
```

This will start the development server at `http://localhost:5173`.  
Your Spotify redirect URI should match this port if you're testing locally (e.g., `http://localhost:5173/callback`).

---

### 2. Backend (Flask + Python)

> Ensure you have Python 3.10+ installed and ideally use a virtual environment.

```bash
cd backend
pip install flask flask_cors joblib scikit-learn torch transformers
```

Run the Flask app:

```bash
python app.py
```

The server will start on `http://127.0.0.1:5000`.

---

## 📌 Notes

- Be sure to set up your **Spotify Developer App** and add the correct redirect URI (`/callback`) to Spotify's dashboard.
- This app uses **Spotify's PKCE Authorization Code Flow**, which is secure for SPAs and native apps.

---

## 💡 Features

- Spotify OAuth with PKCE
- Fetches saved tracks from user's account
- Sends track metadata to backend for playlist analysis
- Playlist generation using a trained ML model (`HybridModel`)

---

## 📂 Project Structure

```
/client     # React + Ionic frontend
/backend    # Flask API and ML model loading
```
