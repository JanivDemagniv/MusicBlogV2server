MusicBlog Server
Welcome to the MusicBlog Server, the backend API for a music blog application. This server handles user authentication, post management, comment functionalities, and more to support a full-featured blog platform focused on album reviews and discussions.

Table of Contents
Project Overview
Features
Technologies Used
Installation
Environment Variables
License

--Project Overview--
The MusicBlog Server serves as the backend for a music blog application. Users can create accounts, log in, post reviews, like posts and comments, and engage with other users in the community. The server is built with Node.js and Express and uses MongoDB for database management.

--Features--
User Authentication: Register, log in, and log out functionality with secure password hashing.
Post Management: CRUD operations for blog posts, including album review posts with titles, subtitles, and content.
Comment System: Users can post, edit, delete, and like comments on posts.
Like Functionality: Users can like posts and comments to show engagement.
Auto-Logout: Users are automatically logged out after a period of inactivity (default: 4 hours).

--Technologies Used--
Node.js and Express.js: For building the RESTful API.
MongoDB and Mongoose: Database and ORM for managing blog data.
JWT: For secure user authentication.
BCrypt: For password hashing.

--Installation--
Clone the Repository

git clone https://github.com/JanivDemagniv/MusicBlogV2server.git
cd MusicBlogV2server
Install Dependencies

npm install
Set Up Environment Variables
Create a .env file in the root directory and add the following:

PORT=8181
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
Start the Server

npm start
npm run dev - for development environment
The server should now be running on http://localhost:8181.

--Environment Variables--
PORT: Port number for the server (default is 8181).
MONGO_URI: MongoDB connection URI.
JWT_SECRET: Secret key for signing JWT tokens.

--License--
This project is licensed under the MIT License.