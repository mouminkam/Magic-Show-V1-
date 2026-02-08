/**
 * API Integration Test Script
 * Tests all Frontend APIs against the Backend
 *
 * Prerequisites:
 * - Backend running (e.g. php artisan serve on http://localhost:8000)
 * - Set NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
 *
 * Run: npm run test:api
 */

const https = require("https");
const http = require("http");

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";
const isHttps = BASE_URL.startsWith("https");

function request(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path.startsWith("http") ? path : BASE_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname + url.search,
      method,
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
      },
    };
    if (token) options.headers["Authorization"] = `Bearer ${token}`;
    const lib = isHttps ? https : http;
    const req = lib.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const parsed = body ? JSON.parse(body) : {};
          resolve({ status: res.statusCode, data: parsed });
        } catch {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on("error", reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

const results = { passed: 0, failed: 0, skipped: 0 };

function ok(name, condition, msg = "") {
  if (condition) {
    results.passed++;
    console.log(`  ✅ ${name}`);
    return true;
  }
  results.failed++;
  console.log(`  ❌ ${name}${msg ? ": " + msg : ""}`);
  return false;
}

function skip(name) {
  results.skipped++;
  console.log(`  ⏭️  ${name} (skipped)`);
}

async function runTests() {
  console.log("\n🧪 API Integration Tests");
  console.log("   Base URL:", BASE_URL);
  console.log("");

  let token = null;
  let productId = null;
  let orderId = null;

  // 1. Health check
  console.log("1. Health Check");
  try {
    const res = await request("GET", "/health");
    ok("GET /health", res.status === 200 && (res.data?.status === "ok" || res.data?.timestamp));
  } catch (e) {
    ok("GET /health", false, e.message);
  }
  console.log("");

  // 2. Products (public)
  console.log("2. Products API");
  try {
    const res = await request("GET", "/products?per_page=2");
    const items = res.data?.data?.items ?? res.data?.data ?? res.data;
    productId = Array.isArray(items) && items[0] ? (items[0].id ?? items[0].data?.id) : null;
    ok("GET /products", res.status === 200);
  } catch (e) {
    ok("GET /products", false, e.message);
  }
  console.log("");

  // 3. Auth - Register
  console.log("3. Auth - Register");
  const testEmail = `test_${Date.now()}@example.com`;
  try {
    const res = await request("POST", "/auth/register", {
      first_name: "Test",
      last_name: "User",
      email: testEmail,
      phone: "+9611234567",
      password: "Password123!",
      password_confirmation: "Password123!",
    });
    token = res.data?.data?.access_token ?? res.data?.access_token;
    ok("POST /auth/register", res.status === 201 || res.status === 200, !token ? "No token" : "");
  } catch (e) {
    ok("POST /auth/register", false, e.message);
  }
  console.log("");

  // 4. Auth - Login (if register failed, try login with existing user)
  if (!token) {
    console.log("4. Auth - Login (using test credentials)");
    try {
      const res = await request("POST", "/auth/login", {
        email: "test@example.com",
        password: "Password123!",
      });
      token = res.data?.data?.access_token ?? res.data?.access_token;
      ok("POST /auth/login", !!token);
    } catch (e) {
      ok("POST /auth/login", false, "Need valid user or run register first");
    }
  } else {
    skip("POST /auth/login (already have token from register)");
  }
  console.log("");

  // 5. Auth - Get User
  console.log("5. Auth - Get User");
  if (token) {
    try {
      const res = await request("GET", "/auth/user", null, token);
      ok("GET /auth/user", res.status === 200);
    } catch (e) {
      ok("GET /auth/user", false, e.message);
    }
  } else {
    skip("GET /auth/user (no token)");
  }
  console.log("");

  // 6. Cart
  console.log("6. Cart API");
  try {
    const cartRes = await request("GET", "/cart", null, token);
    ok("GET /cart", cartRes.status === 200);
    if (productId && token) {
      const addRes = await request(
        "POST",
        "/cart",
        { product_id: productId, quantity: 1 },
        token
      );
      ok("POST /cart (add item)", addRes.status === 200 || addRes.status === 201);
    } else {
      skip("POST /cart (no productId or token)");
    }
  } catch (e) {
    ok("GET /cart", false, e.message);
  }
  console.log("");

  // 7. Cart Validate Coupon
  console.log("7. Cart - Validate Coupon");
  try {
    const res = await request("POST", "/cart/validate-coupon", { coupon_code: "INVALID123" });
    ok("POST /cart/validate-coupon", res.status === 200 || res.status === 400);
  } catch (e) {
    ok("POST /cart/validate-coupon", false, e.message);
  }
  console.log("");

  // 8. Newsletter
  console.log("8. Newsletter API");
  try {
    const res = await request("POST", "/newsletter/subscribe", {
      email: `newsletter_${Date.now()}@example.com`,
    });
    ok("POST /newsletter/subscribe", res.status === 200 || res.status === 201);
  } catch (e) {
    ok("POST /newsletter/subscribe", false, e.message);
  }
  console.log("");

  // 9. Wishlist (requires auth)
  console.log("9. Wishlist API");
  if (token && productId) {
    try {
      const addRes = await request("POST", "/wishlist", { product_id: productId }, token);
      ok("POST /wishlist", addRes.status === 200 || addRes.status === 201);
      const delRes = await request("DELETE", `/wishlist/${productId}`, null, token);
      ok("DELETE /wishlist/:id", delRes.status === 200 || delRes.status === 204);
    } catch (e) {
      ok("Wishlist", false, e.message);
    }
  } else {
    skip("Wishlist (no token or productId)");
  }
  console.log("");

  // 10. Forgot Password
  console.log("10. Auth - Forgot Password");
  try {
    const res = await request("POST", "/auth/forgot-password", { email: "nonexistent@test.com" });
    ok("POST /auth/forgot-password", res.status === 200 || res.status === 400 || res.status === 404);
  } catch (e) {
    ok("POST /auth/forgot-password", false, e.message);
  }
  console.log("");

  // 11. Orders (requires auth)
  console.log("11. Orders API");
  if (token) {
    try {
      const res = await request("GET", "/orders", null, token);
      ok("GET /orders", res.status === 200);
      const orders = res.data?.data ?? res.data;
      orderId = Array.isArray(orders) && orders[0] ? orders[0].id : null;
    } catch (e) {
      ok("GET /orders", false, e.message);
    }
  } else {
    skip("GET /orders (no token)");
  }
  console.log("");

  // 12. Logout
  console.log("12. Auth - Logout");
  if (token) {
    try {
      const res = await request("POST", "/auth/logout", null, token);
      ok("POST /auth/logout", res.status === 200);
    } catch (e) {
      ok("POST /auth/logout", false, e.message);
    }
  } else {
    skip("POST /auth/logout (no token)");
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("Summary:");
  console.log(`  ✅ Passed:  ${results.passed}`);
  console.log(`  ❌ Failed:  ${results.failed}`);
  console.log(`  ⏭️  Skipped: ${results.skipped}`);
  console.log("=".repeat(50) + "\n");

  process.exit(results.failed > 0 ? 1 : 0);
}

runTests().catch((e) => {
  console.error("Test runner error:", e);
  process.exit(1);
});
