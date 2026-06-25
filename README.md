# 🍔 LuminaEats

<p align="center">
  <em>A full-stack MERN application built for the Future Code Technology Internship Assessment.</em>
</p>

## 🚀 Project Overview

LuminaEats is a robust, responsive web application providing a streamlined experience for users to browse, order, and pay for food. It features a comprehensive administrative dashboard for real-time order tracking, menu management, and customer details.

Designed with clean UI principles and stable state management, this project fulfills all requirements of the internship assessment, including the PayHere Sandbox integration.

## 🛠 Tech Stack

- **Frontend:** React, React Router, Mantine UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Payments:** PayHere Sandbox Integration
- **State Management:** React Hooks, local storage

## ✨ Key Features

- **User Experience:**
  - Secure registration and login flow with professional validation feedback.
  - Persistent shopping cart functionality.
- **Order Processing:**
  - Integrated PayHere Sandbox payment gateway for secure, simulated transactions.
- **Admin Dashboard:**
  - Comprehensive CRUD operations for Food Items.
  - Seamless order status updates.
  - Customer details tracking.
- **System Feedback:**
  - Toast notifications implemented across all critical "write" actions (CRUD, Auth, Checkout) ensuring a highly responsive user experience.
- **Responsive Design:**
  - Fully optimized layout for seamless use across mobile, tablet, and desktop devices.

## 🎥 Demo

- **[Video Presentation](https://drive.google.com/file/d/1sEpDulKznvs1bzax-_7TX4XEtJ8aKr2P/view?usp=sharing)**

## 💻 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas URI)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/moysush/lumina-eats.git
   cd lumina-eats
   ```

2. **Install dependencies**
   Run this in both the client and server directories.

   ```bash
   npm install
   ```

3. **Environment Setup**

    - Create a `.env` or `.env.local` file in the root of your project using `.env.template` as a guide.
    - For the `VITE_PAYHERE_NOTIFY_URL`, provide your public backend URL (e.g., if developing locally, you can use [ngrok](https://ngrok.com/) to expose your backend port).

    ```env
    # Server / Backend configuration
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=jwt_secret_key
    PAYHERE_MERCHANT_ID=your-payhere_merchant_id
    PAYHERE_MERCHANT_SECRET=your_payhere_merchant_secret

    # Client / Frontend Configuration
    VITE_PAYHERE_MERCHANT_ID=your_merchant_id
    VITE_PAYHERE_NOTIFY_URL=your_public_backend_url/api/payment/webhook
    ```

4. **Start the Application**
   Run this in both the client and server directories.

   ```bash
   npm run dev
   ```
