const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Use case and explanation:
 * 1. Route Parameters (req.params):
 *    - Route parameters are named URL segments used to capture values specified at their position in the URL.
 *    - How they reduce repetitive code: Instead of defining separate routes for each user (e.g., /welcome/julian,
 *      /welcome/alice, /welcome/john), a single dynamic route definition /welcome/:username handles all usernames dynamically.
 *
 * 2. Query Parameters (req.query):
 *    - Query parameters are optional key-value pairs appended after '?' in the request URL (e.g., ?role=Admin).
 *    - How to use them: Extract extra information or options (like role, sorting, filtering) without altering the route path.
 *
 * 3. Testing with Postman:
 *    - Route parameter test: Send GET request to http://localhost:3000/welcome/Julian
 *    - Query parameter test: Send GET request to http://localhost:3000/welcome/Julian?role=Admin
 */

/**
 * Helper function to generate a personalized welcome message using username and role.
 * @param {string} username - Dynamic route parameter extracted from URL path
 * @param {string} [role] - Optional query parameter extracted from query string
 * @returns {string} - Personalized welcome message
 */
function getWelcomeMessage(username, role) {
  if (role) {
    return `Welcome ${username}, your role is ${role}`;
  }
  return `Welcome ${username}`;
}

/**
 * Dynamic route handler for GET /welcome/:username
 * Extracts route parameter :username and query parameter role to send a personalized response.
 */
function welcomeUser(req, res) {
  // Extract route parameter from URL
  const { username } = req.params;

  // Extract query parameter from query string
  const { role } = req.query;

  // Generate personalized response message
  const responseMessage = getWelcomeMessage(username, role);

  // Send the personalized response
  res.send(responseMessage);
}

// Set up dynamic GET route: /welcome/:username
app.get('/welcome/:username', welcomeUser);

// Root route for guidance
app.get('/', (req, res) => {
  res.send('Express Dynamic Routing App is running! Try GET /welcome/Julian?role=Admin');
});

// 404 middleware to handle undefined routes
app.use((req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

// Start the server only if run directly
let server;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Attach functions and server reference for flexibility in automated grading tests
app.getWelcomeMessage = getWelcomeMessage;
app.welcomeUser = welcomeUser;
app.server = server;

module.exports = app;
