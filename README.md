# Understanding Dynamic Routes & Query Parameters in Express

This project demonstrates how to use **Route Parameters** and **Query Parameters** in an Express.js application to handle dynamic URL structures efficiently.

---

## 1. What are Route Parameters and Why do we need them?
- **Definition**: Route parameters are named segments in URL paths prefixed with a colon (e.g., `/:username`).
- **Accessing in Express**: Available on the `req.params` object (e.g., `req.params.username`).
- **How they reduce repetitive code**:
  Without route parameters, you would need to define individual static routes for every single user:
  ```javascript
  // ❌ Repetitive & Tedious
  app.get('/welcome/julian', ...);
  app.get('/welcome/alice', ...);
  app.get('/welcome/john', ...);
  ```
  With dynamic route parameters:
  ```javascript
  // ✅ Clean, dynamic & reusable
  app.get('/welcome/:username', (req, res) => {
    const { username } = req.params;
    res.send(`Welcome ${username}`);
  });
  ```

---

## 2. How to Use Query Parameters
- **Definition**: Query parameters are optional key-value pairs appended at the end of a URL after a question mark `?` (e.g., `?role=Admin&status=active`). Multiple parameters are separated by `&`.
- **Accessing in Express**: Available on the `req.query` object (e.g., `req.query.role`).
- **Use Case**: Used for passing extra, non-path information such as filters, sorting, search queries, pagination, or optional metadata without changing the URL path structure.

---

## 3. Dynamic Route Implementation (`/welcome/:username`)

### Endpoint Details
- **Method**: `GET`
- **Route**: `/welcome/:username`
- **Optional Query**: `?role=<role_name>`

### Response Behavior
| Request URL | Route Param (`username`) | Query Param (`role`) | Response |
| :--- | :--- | :--- | :--- |
| `GET /welcome/Julian?role=Admin` | `Julian` | `Admin` | `Welcome Julian, your role is Admin` |
| `GET /welcome/Alice?role=Developer` | `Alice` | `Developer` | `Welcome Alice, your role is Developer` |
| `GET /welcome/Julian` | `Julian` | *(undefined)* | `Welcome Julian` |

---

## 4. How to Test Using Postman

### Step 1: Start the Server
```bash
npm start
```
The server runs on `http://localhost:3000`.

### Step 2: Open Postman and Send Requests

1. **Test Route Parameter + Query Parameter**:
   - **Method**: `GET`
   - **URL**: `http://localhost:3000/welcome/Julian?role=Admin`
   - *In Postman Params tab*: Key = `role`, Value = `Admin`.
   - **Expected Status**: `200 OK`
   - **Expected Body**: `Welcome Julian, your role is Admin`

2. **Test Different Values**:
   - **Method**: `GET`
   - **URL**: `http://localhost:3000/welcome/Julian?role=User`
   - **Expected Body**: `Welcome Julian, your role is User`

3. **Test Route Parameter without Query Parameter**:
   - **Method**: `GET`
   - **URL**: `http://localhost:3000/welcome/Julian`
   - **Expected Body**: `Welcome Julian`

---

## 5. Automated Tests
To run automated test suite:
```bash
npm test
```
