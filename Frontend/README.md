# Dining Diner

A modern food ordering application built with React and Vite.

## Overview

Dining Diner is a full-featured restaurant ordering system that allows users to browse menu items, add them to cart, and place orders. The application includes user authentication, order tracking, and a responsive design for all device sizes.

## Live Demo 
 - [Digital Diner on Netlify](https://eattoesdigitaldiner.netlify.app/)

## Features

- **User Authentication**: Sign up and sign in functionality with both email/password and phone options
- **Menu Browsing**: View all available food items with details like ingredients, price, and dietary information
- **Shopping Cart**: Add items to cart, modify quantities, and review before checkout
- **Order Management**: Place orders and view order history
- **Responsive Design**: Optimized for mobile, tablet, and desktop views

## Tech Stack

- **Frontend**: React 19, React Router v7
- **State Management**: Zustand, React Context API
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/Dining_Diner.git
cd Dining_Diner/Frontend
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file in the Frontend directory with the following variables:
```env
VITE_BACKEND_URL=http://localhost:your_backend_port
```
4. Start the development server
```bash
npm run dev
```

## Project structure
```text
src/
├── assets/           # Static assets like images
├── components/       # Reusable UI components
│   ├── Card.jsx      # Menu item card component
│   ├── ConfirmOrder.jsx # Order confirmation component
│   ├── Header.jsx    # Navigation header component
│   ├── SearchBar.jsx # Search functionality component
│   └── ...
├── context/
│   ├── CartContext.jsx # Cart state management
│   └── ...
├── hooks/
│   ├── fetchData.js  # Data fetching utilities
│   └── ...
├── pages/
│   ├── Checkout.jsx  # Cart checkout page
│   ├── Home.jsx      # Main menu page
│   ├── LandingPage.jsx # Welcome page
│   ├── MyOrders.jsx  # Order history page
│   ├── OrderConfirmation.jsx # Order success page
│   ├── auth/
│   │   ├── SignInPage.jsx # Login page
│   │   └── SignUpPage.jsx # Registration page
│   └── ...
├── store/
│   ├── authStore.js  # Authentication state management
│   └── ...
├── utils/
│   ├── Loader.jsx    # Loading indicator component
│   └── ...
├── App.jsx           # Main application component
├── App.css           # Global styles
├── index.css         # Tailwind imports
└── main.jsx          # Application entry point

``` 