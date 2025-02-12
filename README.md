# EventManager Frontend

This is the frontend of the **EventManager** project, built using **React, TypeScript, Tailwind CSS, ShadCN UI, and Redux**.

## 🚀 Features

- Event creation, management, and real-time attendee tracking
- User authentication (signup, login, and logout with cookie-based authentication)
- Filtering and sorting events by date
- User can join and leave events (restricted to one event at a time)
- Event update and delete functionality
- ShadCN UI components for enhanced UI experience

## 🛠 Tech Stack

- **React (TypeScript)** – Frontend framework
- **Tailwind CSS** – Styling
- **ShadCN UI** – UI components
- **Redux Toolkit** – State management
- **Socket.IO** – Real-time updates
- **Axios** – API requests

## 📂 Folder Structure

```
frontend/
│── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components (Home, Events, Dashboard, etc.)
│   ├── store/            # Redux state management
│   ├── services/         # API requests & utility functions
│   ├── assets/           # Static assets (images, icons)
│   ├── App.tsx           # Main App component
│   ├── main.tsx          # React entry point
│── public/               # Static files
│── .env                  # Environment variables
│── package.json          # Dependencies & scripts
│── README.md             # Project documentation
```

## 🔧 Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/yourusername/eventmanager-frontend.git
cd eventmanager-frontend
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

### 4️⃣ Start the Development Server

```sh
npm run dev
```

## 🚀 Deployment

To deploy on **Vercel**, follow these steps:

1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` and follow the setup instructions.

## 🔄 API Integration

The frontend communicates with the backend via the following API endpoints:

- `POST /api/v1/auth/login` – User login
- `POST /api/v1/auth/signup` – User registration
- `GET /api/v1/events` – Fetch all events
- `POST /api/v1/events` – Create a new event
- `PATCH /api/v1/events/:id` – Update an event
- `DELETE /api/v1/events/:id` – Delete an event

## ⚡ WebSocket (Real-Time Updates)

Socket.IO is used for real-time updates on attendee counts. The frontend listens for `attendeeUpdate` events to update UI instantly.

## 📜 License

This project is licensed under the **MIT License**.

## 💡 Contributing

If you’d like to contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Submit a Pull Request 🚀

## 📞 Contact

For questions or support, contact: [[adityapatidar@gmail.com](mailto:adityapatidar@gmail.com)]
