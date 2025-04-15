# Full-Stack CRUD Application Plan

## 🧠 Overview
Using Node.js with Express, Mongoose, REACT and MongoDB create a user website that is a CRUD Application, and which exposes a REST API

---

## ✅ Functional Requirements
- [ x ] Create RESTful API using Express and Mongoose
- [ x ] Connect to MongoDB
- [ x ] Populate MongoDB with sample data from JSONPlaceholder
- [ ] React frontend with:
  - [ ] Login page
  - [ ] Add User page
  - [ ] Update User page with Delete button
  - [ ] Display Users page with AG Grid
- [ ] Use Axios to fetch/post data
- [ ] Style using Evergreen UI and W3CSS/Bootstrap

---

## ✅ Backend Tasks
- [ ] Setup Express + Mongoose project
- [ ] Create `User` model with fields:
  - lastName, firstName, dob, address1, address2, city, postalCode, country, phone, email, userNotes
- [ ] Create API routes:
  - [ ] POST /api/users (Create)
  - [ ] GET /api/users (Read)
  - [ ] PUT /api/users/:id (Update)
  - [ ] DELETE /api/users/:id (Delete)
- [ ] Use Faker.js or JSONPlaceholder to seed MongoDB
- [ ] Test API with Postman

---

## ✅ Frontend Tasks
- [ ] Setup React project
- [ ] Create Login Page (mock login)
- [ ] Add User form (POST request)
- [ ] Update/Delete User form (GET, PUT, DELETE)
- [ ] Display Users table using AG Grid (GET request)
- [ ] Use Axios for all HTTP requests
- [ ] Use Evergreen UI components
- [ ] Apply W3CSS or Bootstrap styling

---

## ✅ Final Steps
- [ ] Add header comment in `index.js` with name and CNumber
- [ ] Add heavy inline comments for React and Node code
- [ ] Take screenshots of all working pages
- [ ] Zip project folder (exclude node_modules), named `CXXXXXXXX.zip`
