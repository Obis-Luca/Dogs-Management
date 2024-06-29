<h1>Employeemanager</h1>
Employeemanager is a full stack CRUD application designed to manage users and dogs. It is built using React for the frontend, Node.js with Express for the backend, and MySQL for the database. The MySQL database is deployed on Railway.
<h3>Features</h3>
<ul>
  <li><b>User Management: Admins can perform CRUD operations on any user. Managers can perform CRUD operations on users and dogs, but not on other admins or managers. Regular users can perform CRUD operations within their own scope.</b></li>
  <li><b>Dog Management: CRUD operations on dogs with a one-to-many relationship with users.</b></li>
  <li><b>Authentication: Secure login and signup using JWT tokens. Bearer tokens are stored in local storage for authentication.</b></li>
  <li><b>Error Handling: Frontend error pages for server failures and internet disconnection.</b></li>
  <li><b>Pagination: Frontend pagination for efficient data display.</b></li>
  <li><b>Data Visualization: A graph on the frontend shows average salaries for each age group (0-10, 11-20, 21-30, etc.).</b></li>
  <li><b>Testing: Frontend is tested using Cypress for end-to-end testing.</b></li>
</ul>
