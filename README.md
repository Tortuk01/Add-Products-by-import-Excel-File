# 📦 Inventory Management App (React + Excel Import)

A modern React-based Inventory Management Tool that allows users to:

- ✅ Add inventory items manually via a modal form  
- 📁 Import bulk data from Excel (.xlsx) files  
- 📊 View all items in an interactive DataGrid  
- 💾 Store data using `json-server` as a mock API (for local testing)  
- 🚀 Built with MUI, Axios, and XLSX  

---

## 📸 Screenshots

| Add Item Modal | Excel Upload & Table View |
|----------------|---------------------------|
| ![SS01](https://github.com/user-attachments/assets/328ea1b5-c2b1-434a-ab6a-0ca975979608) | ![SS02](https://github.com/user-attachments/assets/f7224fc2-d4ed-476c-85f4-40bd2437950a) |
| ![SS03](https://github.com/user-attachments/assets/09a67ef6-9600-4bce-80cf-8c95057a1502) | ![SS04](https://github.com/user-attachments/assets/84d72e8a-c88e-4c20-a216-b06d02fabe49) |

---

## 🧠 Features

- 📥 **Import Excel Files:** Upload `.xlsx` files and auto-populate the inventory table  
- ✍️ **Manual Entry Form:** Add items individually via a clean and user-friendly modal form  
- 🔁 **Live Data Table:** View and scroll through real-time inventory in a MUI `DataGrid`  
- ⚡ **API Integration:** Uses Axios to send/receive data to/from `json-server`  
- 🔔 **Notifications:** Success & error alerts via MUI Snackbar  
- 🧪 **Testable API:** Simulate backend functionality using `json-server`

---

## 🛠 Tech Stack

| Technology    | Description                    |
|---------------|--------------------------------|
| React.js      | Frontend JavaScript library    |
| Material UI   | Pre-built UI components        |
| Axios         | Promise-based HTTP client      |
| XLSX          | Parse and read Excel files     |
| json-server   | Mock REST API for local testing|

---

## 🚀 Getting Started

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/your-username/inventory-app.git
cd inventory-app
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Start JSON Server
```bash
npx json-server --watch db.json --port 4000
```
### 4️⃣ Start React App
```bash
npm start
```
📁 Project Structure
```arduino
📦 inventory-app
├── public/
├── src/
│   ├── components/
│   │   └── InventoryOverview.jsx
│   ├── App.js
│   └── ...
├── db.json             <-- JSON Server DB
├── package.json
└── README.md
```
Made with ❤️ by Rano Mal
---
Let me know if you'd like this customized with your name, GitHub repo link, or want a markdown version copy in a file!

