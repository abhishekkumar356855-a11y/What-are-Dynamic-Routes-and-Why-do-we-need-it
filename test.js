const http = require('http');
const app = require('./index');

const PORT = 3000;

const tests = [
  {
    name: 'Dynamic route with username and query parameter role',
    path: '/welcome/Julian?role=Admin',
    expectedStatus: 200,
    expectedBody: 'Welcome Julian, your role is Admin'
  },
  {
    name: 'Dynamic route with different username and role',
    path: '/welcome/Alice?role=Developer',
    expectedStatus: 200,
    expectedBody: 'Welcome Alice, your role is Developer'
  },
  {
    name: 'Dynamic route with username without query parameter',
    path: '/welcome/Julian',
    expectedStatus: 200,
    expectedBody: 'Welcome Julian'
  },
  {
    name: 'Undefined route 404 test',
    path: '/unknown-route',
    expectedStatus: 404,
    expectedBody: '<h1>404 - Page Not Found</h1>'
  }
];

function runTest(test) {
  return new Promise((resolve) => {
    http.get(`http://localhost:${PORT}${test.path}`, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        const statusMatch = res.statusCode === test.expectedStatus;
        const bodyMatch = data === test.expectedBody;
        const pass = statusMatch && bodyMatch;

        console.log(`Test: ${test.name}`);
        console.log(`URL: http://localhost:${PORT}${test.path}`);
        console.log(`Status: ${res.statusCode} (Expected: ${test.expectedStatus})`);
        console.log(`Body: "${data}" (Expected: "${test.expectedBody}")`);
        console.log(`Result: ${pass ? 'PASSED ✅' : 'FAILED ❌'}\n`);
        resolve(pass);
      });
    }).on('error', (err) => {
      console.error(`Request failed: ${err.message}`);
      resolve(false);
    });
  });
}

async function start() {
  console.log('=== Running Dynamic Route & Query Parameter Tests ===\n');
  let serverInstance = app.server;
  if (!serverInstance || !serverInstance.listening) {
    serverInstance = app.listen(PORT);
  }

  // Small delay to ensure server is listening
  await new Promise(r => setTimeout(r, 200));

  let allPassed = true;
  for (const test of tests) {
    const passed = await runTest(test);
    if (!passed) allPassed = false;
  }

  console.log('=====================================================');
  console.log(allPassed ? '🎉 All tests PASSED successfully!' : '❌ Some tests failed.');

  serverInstance.close(() => {
    process.exit(allPassed ? 0 : 1);
  });
}

start();
