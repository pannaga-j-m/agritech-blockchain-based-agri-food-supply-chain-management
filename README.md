# 🌾 AgriTech Blockchain-Based Agri-Food Supply Chain Management

A blockchain-powered supply chain management system that enables transparent, secure, and tamper-proof tracking of agricultural products from farmers to consumers. The application uses smart contracts to record every stage of the supply chain, ensuring authenticity, traceability, and trust among all stakeholders.

---

## 📖 Project Overview

The AgriTech Blockchain-Based Agri-Food Supply Chain Management System is designed to solve common challenges in the agricultural supply chain such as product fraud, lack of transparency, and inefficient record keeping.

The system records every transaction on the blockchain, allowing consumers to verify the complete journey of agricultural products by scanning a QR code.

---

## 🚀 Features

- 👨‍🌾 Farmer Registration
- 🌱 Add Agricultural Products
- 📦 Product Tracking
- 🚚 Distributor Management
- 🏪 Retailer Management
- 👤 Consumer Product Verification
- 🔗 Ethereum Blockchain Integration
- 📱 QR Code Generation & Verification
- 📝 Immutable Transaction History
- 🔒 Smart Contract-Based Authentication
- 📊 Transparent Supply Chain Tracking

---

# 🏗️ System Architecture

```
                Consumer
                    ▲
                    │
              QR Code Scan
                    │
                    ▼
+---------------------------------------------------+
|                 React Frontend                    |
+---------------------------------------------------+
                    │
                    ▼
+---------------------------------------------------+
|             Node.js / Express Backend             |
+---------------------------------------------------+
                    │
                    ▼
+---------------------------------------------------+
|         Solidity Smart Contract (Ethereum)        |
+---------------------------------------------------+
                    │
                    ▼
             Blockchain Network
```

---

# 🛠️ Tech Stack

## Frontend

- React.js
- HTML5
- CSS3
- JavaScript
- Bootstrap

## Backend

- Node.js
- Express.js

## Blockchain

- Solidity
- Hardhat
- Ganache
- Ethers.js

## Database

- SQLite / MongoDB

## Development Tools

- Git
- GitHub
- VS Code
- MetaMask

---

# 📂 Project Structure

```
AgriTech-Blockchain/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── server.js
│   └── package.json
│
├── blockchain/
│   ├── contracts/
│   ├── scripts/
│   ├── artifacts/
│   └── hardhat.config.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/pannaga-j-m/agritech-blockchain-based-agri-food-supply-chain-management.git
```

---

## Install Frontend

```bash
cd frontend

npm install

npm start
```

---

## Install Backend

```bash
cd backend

npm install

npm start
```

---

## Install Blockchain Dependencies

```bash
cd blockchain

npm install
```

Compile Smart Contract

```bash
npx hardhat compile
```

Deploy Smart Contract

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Run Local Blockchain

```bash
npx hardhat node
```

---

# 🔄 Workflow

```
Farmer
   │
   ▼
Register Product
   │
   ▼
Blockchain Stores Product Details
   │
   ▼
Distributor Updates Shipment
   │
   ▼
Retailer Updates Store Details
   │
   ▼
Consumer Scans QR Code
   │
   ▼
Complete Product History Displayed
```

---

# 👨‍🌾 User Modules

## Farmer

- Register
- Login
- Add Products
- Generate QR Code
- Update Product Information

## Distributor

- View Products
- Update Shipment Details
- Transport Information

## Retailer

- Update Product Availability
- Manage Store Information

## Consumer

- Scan QR Code
- Verify Product Authenticity
- View Complete Supply Chain History

---

# 🔐 Smart Contract Functionalities

- Register Product
- Update Ownership
- Record Supply Chain Events
- Generate Immutable Records
- Verify Product History

---

# 📸 Screenshots

Add screenshots of:

- Landing Page
- Farmer Dashboard
- Distributor Dashboard
- Retailer Dashboard
- Consumer Dashboard
- Blockchain Transactions
- QR Code Scanner
- Product Traceability

---

# 🔒 Security Features

- Blockchain-Based Data Storage
- Immutable Transaction Records
- Smart Contract Validation
- Product Authentication
- Transparent Supply Chain Tracking

---

# 🎯 Project Objectives

- Improve transparency in the agricultural supply chain.
- Eliminate counterfeit agricultural products.
- Enable secure product traceability.
- Increase consumer trust through blockchain technology.
- Maintain immutable records of every transaction.

---

# 💡 Future Enhancements

- AI-Based Crop Quality Prediction
- IoT Sensor Integration
- GPS-Based Shipment Tracking
- Mobile Application
- Multi-Blockchain Support
- Payment Gateway Integration
- Cloud Deployment on AWS
- Docker & Kubernetes Deployment
- CI/CD using Jenkins & GitHub Actions

---

# 📚 Learning Outcomes

- Blockchain Development
- Solidity Smart Contracts
- React.js Development
- Node.js Backend Development
- Ethereum Transactions
- Hardhat Framework
- QR Code Integration
- Full Stack Web Development
- Git & GitHub

---

# 📌 Technologies Used

| Technology | Purpose |
|------------|---------|
| React.js | Frontend |
| Node.js | Backend |
| Express.js | API Development |
| Solidity | Smart Contracts |
| Hardhat | Blockchain Development |
| Ethereum | Blockchain Network |
| SQLite / MongoDB | Database |
| Ethers.js | Blockchain Interaction |
| Git | Version Control |
| GitHub | Source Code Management |

---

# 👨‍💻 Author

**Pannaga J M**

🎓 Information Science & Engineering

💼 Aspiring Cloud & DevOps Engineer

🔗 GitHub: https://github.com/pannaga-j-m


---

# ⭐ If you found this project useful, please consider giving it a Star on GitHub!
