A MERN-stack web app for storing shoes (with their properties) in the MongoDB Atlas database.
Tools/languages used: HTML, CSS, JS, React & Material UI, MongoDB, NodeJS, Express 

# Transaction Management Dashboard for a Shoe Store

A React-based dashboard built with **Material UI (MUI)** for visualizing transaction data. This application fetches records from a REST API and displays them through a responsive grid of interactive cards and detailed modal views.

---

## 🚀 Features

* **Dynamic Data Fetching**: Integrated with `axios` to pull live data from `http://localhost:8000/api/models`.
* **Responsive Grid Layout**: Uses MUI `Grid` and `Card` components for a modern, mobile-friendly interface.
* **Automatic Date Formatting**: Automatically parses ISO timestamps into localized date and time formats.
* **Detailed View**: Features a full-screen `Dialog` for deep-diving into specific transaction details.
* **Advanced Sorting**: Includes `stableSort` and `descendingComparator` logic for consistent data organization.
* **Navigation**: Pre-configured with `react-router-dom` for seamless transitions and adding new items.

---

## 🛠️ Tech Stack

* **Core**: React.js
* **Styling**: Material UI (MUI) v5
* **Icons**: `@mui/icons-material`
* **HTTP Client**: Axios
* **Routing**: React Router v6

---

## 📦 Installation & Setup

1.  **Clone the Repository**:
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install Dependencies**:
    ```bash
    npm install @mui/material @emotion/react @emotion/styled @mui/icons-material axios react-router-dom
    ```

3.  **Environment Setup**:
    Ensure your backend server is running on `http://localhost:8000`. To change the API endpoint, update the URL in the `useEffect` hook within `EnhancedTable.js`.

4.  **Run the App**:
    ```bash
    npm start
    ```
