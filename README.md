Architectural Diagram
plaintext
Copy
Edit
               +--------------------------+
               |     GitHub Repository    |
               +------------+-------------+
                            |
                            v
            +-------------------------------+
            |    AWS Amplify Hosting        |
            | - CI/CD from GitHub           |
            | - Serves React Frontend       |
            +-------------------------------+
                            |
                            v
        +------------------------+       +---------------------------+
        |   React Frontend App   | <-->  |   Supabase Backend (BaaS) |
        | - Auth (Supabase)      |       | - PostgreSQL DB           |
        | - CRUD Notes           |       | - REST/Realtime API       |
        |                        |       | - Auth + Storage          |
        +------------------------+       +---------------------------+
📄 README.md
markdown
Copy
![App Screenshot](Screenshot_29-7-2025_23732_us-east-1.console.aws.amazon.com.png)


![App Screenshot](./Screenshot_29-7-2025_23732_us-east-1.console.aws.amazon.com.png)
Edit
# 🗒️ Full-Stack Notes App (React + Supabase + Amplify)

This is a simple full-stack notes application built with **React** and powered by **Supabase** as the backend. It is hosted using **AWS Amplify**, which provides Git-based CI/CD and static web hosting.

## 🚀 Features

- 🔐 User Authentication (Supabase Auth)
- 📝 Create, Read, Update, Delete (CRUD) Notes
- ☁️ Real-time synced data
- 🎨 Responsive UI with modern design
- 🌐 Hosted on AWS Amplify with CI/CD from GitHub

## 🏗️ Architecture

GitHub Repo --> AWS Amplify Hosting --> React App --> Supabase Backend

markdown
Copy
Edit

- **Frontend:** React + Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, API)
- **Hosting:** AWS Amplify (auto-deploys from GitHub)

## 🛠️ Technologies

- React
- Supabase
- AWS Amplify
- Tailwind CSS
- GitHub Actions (via Amplify)

## 🧪 Getting Started Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/notes-app.git
   cd notes-app
Install dependencies:

bash
Copy
Edit
npm install
Set up environment variables:

ini
Copy
Edit
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
Run locally:

bash
Copy
Edit
npm run dev
🌍 Live Demo
Visit App  https://main.d27z9m4i7q9rba.amplifyapp.com/

