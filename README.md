Here’s a **README.md** for your React frontend project, including a detailed step-by-step guide for the authentication flow and how `checkLoginStatus` works:

---

# Xebraa Notes - Real-Time Note App (Frontend)

This is the frontend for a real-time note-taking application built with **React**, **TailwindCSS**, **Zustand**, and **Socket.IO**. It provides a user-friendly interface for authentication, note management, and real-time collaboration.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Setup and Installation](#setup-and-installation)
5. [Authentication Flow](#authentication-flow)
6. [API Integration](#api-integration)
7. [Error Handling](#error-handling)
8. [Contributing](#contributing)
9. [License](#license)

---

## Features

- **User Authentication**: Register, login, and logout with JWT-based authentication.
- **Note Management**: Create, read, update, and delete notes.
- **Real-Time Collaboration**: Real-time updates and auto-saving using Socket.IO.
- **Responsive Design**: Built with TailwindCSS for a clean and responsive UI.
- **State Management**: Zustand for global state management.
- **Form Validation**: React Hook Form with Zod for robust form validation.
- **Error Handling**: Toast notifications for user feedback.

---

## Technologies Used

- **React**: Frontend library.
- **TailwindCSS**: Utility-first CSS framework.
- **Zustand**: State management library.
- **React Router DOM**: For routing.
- **Axios**: For API requests.
- **Socket.IO Client**: For real-time communication.
- **React Hook Form**: For form management.
- **Zod**: For schema validation.
- **React Hot Toast**: For toast notifications.
- **Lucide React**: For icons.

---

## Project Structure

```
src
 ┣ assets
 ┃ ┗ react.svg
 ┣ components
 ┃ ┣ layout
 ┃ ┃ ┣ AuthLayout.jsx
 ┃ ┃ ┣ MainLayout.jsx
 ┃ ┃ ┗ ProtectedRoute.jsx
 ┃ ┗ ui
 ┃ ┃ ┣ AddEditNotes.jsx
 ┃ ┃ ┣ Header.jsx
 ┃ ┃ ┣ LoginForm.jsx
 ┃ ┃ ┣ LogoutButton.jsx
 ┃ ┃ ┣ NoteCard.jsx
 ┃ ┃ ┣ NoteForm.jsx
 ┃ ┃ ┗ SignupForm.jsx
 ┣ lib
 ┃ ┗ validation
 ┃ ┃ ┣ authValidation.js
 ┃ ┃ ┗ noteValidation.js
 ┣ pages
 ┃ ┣ HomePage.jsx
 ┃ ┣ LoginPage.jsx
 ┃ ┗ SignupPage.jsx
 ┣ store
 ┃ ┗ authStore.js
 ┣ utils
 ┃ ┣ apiConstants.js
 ┃ ┣ axios.js
 ┃ ┣ checkLoginStatus.js
 ┃ ┗ socket.js
 ┣ App.jsx
 ┣ index.css
 ┗ main.jsx
```

---

## Setup and Installation

### Prerequisites

- Node.js (v16 or higher)
- NPM or Yarn

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Alisadaintanvir/xebraa_notes_frontend.git
   cd xebraa-notes-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   VITE_API_ENDPOINT=http://localhost:5000
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Access the application**

   The app will be running on `http://localhost:5173`.

---

## Authentication Flow

The application uses **JWT-based authentication** with the following flow:

### **1. User Login**

- The user logs in using the `/v1/auth/login` endpoint.
- On successful login:
  - The **access token** is stored in memory (Zustand store).
  - The **refresh token** is stored in an HTTP-only cookie.

### **2. Token Refresh**

- When the access token expires, the app automatically requests a new access token using the refresh token.
- The refresh token is sent via an HTTP-only cookie to the `/v1/auth/refresh-token` endpoint.
- If successful, the new access token is stored in memory.

### **3. Logout**

- The user logs out using the `/v1/auth/logout` endpoint.
- The refresh token is invalidated on the server.
- The access token is removed from memory.

### **4. `checkLoginStatus` Function**

This function checks if the user is logged in by attempting to refresh the access token. Here’s how it works:

1. **Request**: Sends a request to `/v1/auth/refresh-token` with the refresh token (via HTTP-only cookie).
2. **Success**:
   - If the refresh token is valid, the server returns a new access token and user data.
   - The access token and user data are stored in the Zustand store.
   - The user is marked as logged in.
3. **Failure**:
   - If the refresh token is invalid or expired, the Zustand store is cleared.
   - The user is marked as logged out.

## API Integration

The app uses **Axios** for API requests. Key features include:

- **Axios Interceptors**:
  - **Request Interceptor**: Adds the access token to the headers of every request.
  - **Response Interceptor**: Handles 401 errors by refreshing the access token and retrying the request.

## Error Handling

- **Toast Notifications**: Display error messages to the user using `react-hot-toast`.
- **Axios Interceptors**: Handle API errors and token refresh failures.

---

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or need further assistance! 🚀

---

This **README.md** provides a comprehensive overview of your React frontend project, including the authentication flow and step-by-step guide for `checkLoginStatus`. Let me know if you need further adjustments!
