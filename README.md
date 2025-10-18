 # StayFinder 🏠

![StayFinder Banner](stayfinder/images/logo.png)

**StayFinder** is a comprehensive web application designed to help users discover and book their ideal accommodations. From luxurious apartments to cozy villas, StayFinder offers advanced search and filtering options, detailed property views, user authentication, wishlisting, booking management, and a review system to ensure a seamless and enjoyable experience for every traveler.

---

## 🚀 Live Demo

👉 [View StayFinder](https://stayfinder0.netlify.app/#)
---


## ⚙️Features

* ✅**Advanced Property Search**: Filter properties by location, price range, property type, amenities, and rating.
* ✅**Dynamic Property Listings**: View properties in both grid and list layouts.
* ✅**Detailed Property Pages**: Access comprehensive information for each property, including descriptions, amenities, host details, and a map.
* ✅**User Authentication**: Securely sign up and log in to manage your profile.
* ✅**Wishlist Functionality**: Save your favorite properties for future reference.
* ✅**Booking Management**: Book stays with specified check-in/check-out dates and guest counts.
* ✅**User Reviews**: Add and view reviews for properties.
* ✅**Responsive Design**: Optimized for seamless experience across various devices (desktop, tablet, mobile).
* ✅**Dark Mode Toggle**: Switch between light and dark themes for comfortable viewing.
* ✅**Interactive Homepage Carousel**: Visually engaging background images on the homepage.

## 🛠️ Technologies Used

StayFinder is built with a modern web stack, separating the frontend and backend for scalability and maintainability.

### 🛠️Frontend

* ✅**HTML5**: Structure of the web pages.
* ✅**CSS3**: Custom styling for a clean and intuitive UI, including responsive design.
* ✅**JavaScript (ES6+)**: Core logic, DOM manipulation, and API interactions.
* ✅**Font Awesome**: Icons for a richer user interface.
* ✅**Flatpickr**: Lightweight date picker for easy date selection.
* ✅**Leaflet.js**: Interactive maps to display property locations.

### 🛠️Backend

* ✅**Node.js**: JavaScript runtime environment.
* ✅**Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
* ✅**Mongoose**: MongoDB object data modeling (ODM) for Node.js.
* ✅**MongoDB Atlas**: Cloud-hosted NoSQL database for data storage.
* ✅**JSON Web Tokens (JWT)**: For secure user authentication.
* ✅**Bcrypt.js**: For hashing user passwords securely.
* ✅**CORS**: Middleware for enabling Cross-Origin Resource Sharing.
* ✅**Dotenv**: For managing environment variables.

---

## 📸 Screenshots

### Home Page
![Home Page](images/img.home.png)

### Property Details & Booking
![Property Modal](/images/img.detail.png)

### Light Mode
![Light Mode](images/img.light.png)![light Mode](images/img.light2.png)


---

## 📂 Project Structure

```
StayFinder/
├── backend/                  # Node.js Express API
│   ├── controllers/          # Business logic for routes
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   └── propertyController.js
│   ├── middleware/           # Authentication middleware
│   │   └── auth.js
│   ├── models/               # Mongoose schemas for data
│   │   ├── Booking.js
│   │   ├── Property.js
│   │   └── User.js
│   ├── routes/               # API endpoints
│   │   ├── auth.js
│   │   ├── booking.js
│   │   └── property.js
│   ├── .env                  # Environment variables (e.g., MongoDB URI, JWT Secret)
│   ├── app.js                # Main Express application file
│   ├── package.json          # Backend dependencies
│   └── package-lock.json
├── images/                   # Frontend images
├── index.html                # Main frontend HTML file
├── script.js                 # Frontend JavaScript logic
├── styles.css                # Frontend CSS styling
└── README.md                 # This file

---

## Getting Started (Local Development)

Follow these steps to set up and run StayFinder on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js**: [Download & Install Node.js](https://nodejs.org/en/download/) (includes npm)
* **MongoDB Atlas Account**: [Create a free account](https://www.mongodb.com/cloud/atlas/register) and set up a cluster. Make sure to whitelist your current IP address or allow access from anywhere (for development purposes) in your Atlas Network Access settings.
```

### 🕹️2.Frontend Setup

1.  **Navigate to the project root:**
    ```bash
    cd StayFinder
    ```

2.  **Open `index.html`:**
    Simply open the `index.html` file in your web browser. You can use a live server extension (e.g., Live Server for VS Code) for convenience.

    **Important:** For local testing with your local backend, you might need to temporarily change the API URLs in `script.js` from `https://stayfinder-1-cfu4.onrender.com` back to `http://localhost:5000`. Remember to change them back before deploying!
    
### 🤖Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Rishabh028/StayFinder.git](https://github.com/Rishabh028/StayFinder.git)
    cd StayFinder/backend
    ```

2.  **Install backend dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    In the `backend` directory, create a file named `.env` and add your MongoDB Atlas connection string and a JWT secret:
    ```
    MONGO_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=a_very_secret_key_for_jwt
    ```
    Replace `your_mongodb_atlas_connection_string` with your actual connection string from MongoDB Atlas (remember to replace `<password>` and `<dbname>` placeholders).

4.  **Start the backend server:**
    ```bash
    node app.js
    ```
    The server should start on `http://localhost:5000`.

---

## 🎈 Deployment

StayFinder is designed for easy deployment of its decoupled frontend and backend.

### 🤖Frontend Deployment (Netlify)

The frontend is deployed as a static site using **Netlify**.

1.  **Push your frontend code** (everything except the `backend` folder) to a GitHub repository.
2.  **Connect your GitHub repository** to Netlify.
3.  Netlify will automatically detect your `index.html` and deploy the site.
4.  **Update backend API URLs:** After deploying your backend (see below), ensure all `fetch` calls in your `script.js` point to your live backend URL (e.g., `https://stayfinder-1-cfu4.onrender.com`). Then, push these changes to your frontend repository to trigger a Netlify redeploy.

### 🕹️Backend Deployment (Render)

The backend Node.js API is deployed using **Render**.

1.  **Push your entire project** (including the `backend` folder) to a GitHub repository.
2.  **Create a new Web Service** on Render and connect it to your GitHub repository.
3.  **Configure Build & Start Commands:**
    * **Root Directory**: `backend` (This is crucial as your `app.js` is inside the `backend` folder).
    * **Build Command**: `npm install`
    * **Start Command**: `node app.js`
4.  **Add Environment Variables**: In Render's service settings, add your `MONGO_URI` and `JWT_SECRET` as environment variables.
    * `MONGO_URI`: `your_mongodb_atlas_connection_string`
    * `JWT_SECRET`: `a_very_secret_key_for_jwt`
    * `PORT`: `5000` (or leave blank if Render auto-assigns it, but explicitly setting it can prevent issues as per [Render Docs](https://render.com/docs/web-services#port-binding))
5.  **Deploy**: Render will build and deploy your backend, providing a public URL for your API.

## 🪴Usage

1.  **Access the Live Demo**: Open [https://zippy-gumdrop-c1bd83.netlify.app](https://zippy-gumdrop-c1bd83.netlify.app) in your browser.
2.  **Sign Up / Log In**: Use the "Login" button in the header to create a new account or log in with existing credentials.
3.  **Explore Properties**: Use the search bar on the homepage or navigate to the "Explore" view to browse properties. Apply filters like location, price, type, amenities, and rating.
4.  **View Property Details**: Click on any property card to open a detailed modal with more information, images, and booking options.
5.  **Add to Wishlist**: Click the heart icon on a property card to add it to your wishlist (requires login).
6.  **Book a Stay**: On the property details page, select check-in/check-out dates and guests, then click "Reserve Now". (Note: Payment is simulated via Stripe's frontend SDK for demonstration purposes).
7.  **Manage Profile**: Access "My Profile" to view your personal information, recent bookings, and wishlist.

## 🧑‍🔧Contributing

Contributions are welcome! If you have suggestions for improvements or find any bugs, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name` or `fix/bug-fix-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## 🪪 License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

## 📞Contact

If you have any questions or feedback, feel free to reach out:

* **Rishabh028** - [GitHub Profile](https://github.com/Rishabh028)
