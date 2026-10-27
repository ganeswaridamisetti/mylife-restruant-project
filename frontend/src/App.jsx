
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
  useLocation
} from "react-router-dom";
import api from "./services/api";

const money = (n) => `₹${Number(n || 0).toFixed(2)}`;

// NAVBAR
function Navbar({ count }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top nav-bg">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🍽️ My Life <span className="brand-sub">Restaurant & Dhaba</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/menu">Menu</NavLink>
            <NavLink className="nav-link" to="/reviews">Reviews</NavLink>
            <NavLink className="nav-link" to="/orders">Orders</NavLink>
            <NavLink className="btn btn-gold ms-lg-2" to="/cart">
              Cart ({count})
            </NavLink>
            <NavLink className="nav-link" to="/login">Login</NavLink>
            <NavLink className="nav-link" to="/register">Register</NavLink>
            <NavLink className="nav-link" to="/admin">Admin</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

// HOME PAGE
function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <span className="eyebrow">GOOD FOOD. GREAT MEMORIES.</span>

          <h1>
            Welcome to <em>My Life</em>
            <br />
            Restaurant & Dhaba
          </h1>

          <p>
            Comforting favourites, bold flavours, and a table for everyone.
          </p>

          <div className="d-flex gap-3 flex-wrap">
            <Link className="btn btn-gold btn-lg" to="/menu">
              Explore Menu
            </Link>
            <Link className="btn btn-outline-light btn-lg" to="/reviews">
              Customer Reviews
            </Link>
          </div>

          <div className="rating-pill">
            ★ 4.3 <span>Google Maps rating</span>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="section-heading">
          <span className="eyebrow">MADE WITH CARE</span>
          <h2>Something delicious is waiting</h2>
          <p>Browse the menu, build your cart, and place an order.</p>
        </div>

        <div className="row g-4 mt-2">
          {[
            ["🍛", "Biryani", "Rich, aromatic favourites"],
            ["🔥", "Starters", "Small plates with big flavour"],
            ["🥤", "Drinks & more", "The perfect pairing"]
          ].map((item) => (
            <div className="col-md-4" key={item[1]}>
              <div className="feature-card">
                <div className="feature-icon">{item[0]}</div>
                <h4>{item[1]}</h4>
                <p>{item[2]}</p>
                <Link to="/menu" className="text-link">
                  Explore menu →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="quote-band">
        <div className="container">
          <h2>Good food brings people together.</h2>
          <p>Find your next favourite bite at My Life Restaurant & Dhaba.</p>
          <Link to="/menu" className="btn btn-gold">
            Order food
          </Link>
        </div>
      </section>
    </>
  );
}

// MENU PAGE
function Menu({ addToCart }) {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/menu")
      .then((response) => {
        setItems(Array.isArray(response.data) ? response.data : []);
      })
      .catch(() => {
        setError("Could not connect to backend. Check Spring Boot on port 9090.");
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    ...new Set(items.map((item) => item.category).filter(Boolean))
  ];

  const filtered = items.filter((item) => {
    const matchesCategory = !category || item.category === category;
    const matchesName = (item.name || "")
      .toLowerCase()
      .includes(q.toLowerCase());

    return matchesCategory && matchesName;
  });

  function handleAdd(item) {
    addToCart(item);
    setMessage(`${item.name} added to cart.`);
    setTimeout(() => setMessage(""), 2000);
  }

  return (
    <main className="container page-space">
      <div className="section-heading text-start">
        <span className="eyebrow">FRESH FROM OUR KITCHEN</span>
        <h1>Our Menu</h1>
        <p>Choose your favourites and add them to your cart.</p>
      </div>

      <div className="row g-2 mb-4">
        <div className="col-md-7">
          <input
            className="form-control form-control-lg search-input"
            placeholder="Search dishes..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="col-md-5">
          <select
            className="form-select form-select-lg search-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-warning">{error}</div>}

      {loading ? (
        <p>Loading menu...</p>
      ) : (
        <div className="row g-4">
          {filtered.map((item) => (
            <div className="col-sm-6 col-lg-4" key={item.id}>
              <div className="dish-card h-100">
                <div
                  className="dish-image"
                  style={{
                    backgroundImage: item.imageUrl
                      ? `url("${item.imageUrl}")`
                      : "none"
                  }}
                >
                  <span className="dish-category">
                    {item.category || "Food"}
                  </span>
                </div>

                <div className="p-3 d-flex flex-column">
                  <div className="d-flex justify-content-between gap-2">
                    <h5>{item.name}</h5>
                    <strong className="price">{money(item.price)}</strong>
                  </div>

                  <p className="muted flex-grow-1">
                    {item.description}
                  </p>

                  <button
                    disabled={item.available === false}
                    onClick={() => handleAdd(item)}
                    className="btn btn-dark w-100"
                  >
                    {item.available === false
                      ? "Currently unavailable"
                      : "＋ Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {!filtered.length && !error && (
            <p>No dishes found. Add menu items through the admin page.</p>
          )}
        </div>
      )}
    </main>
  );
}

// CART PAGE
function Cart({ cart, setCart }) {
  const update = (id, delta) => {
    setCart((old) =>
      old
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <main className="container page-space">
      <h1>Your Cart</h1>
      <p className="muted">Review your items before checkout.</p>

      {!cart.length ? (
        <div className="empty-state">
          <div>🛒</div>
          <h4>Your cart is empty</h4>
          <Link to="/menu" className="btn btn-gold">Browse Menu</Link>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            {cart.map((item) => (
              <div className="cart-row" key={item.id}>
                <div>
                  <h5>{item.name}</h5>
                  <span className="muted">{money(item.price)} each</span>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <button
                    className="qty"
                    onClick={() => update(item.id, -1)}
                  >
                    −
                  </button>
                  <b>{item.quantity}</b>
                  <button
                    className="qty"
                    onClick={() => update(item.id, 1)}
                  >
                    ＋
                  </button>
                  <b className="price">
                    {money(Number(item.price) * item.quantity)}
                  </b>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div className="summary-card">
              <h4>Order Summary</h4>
              <div className="summary-line">
                <span>Subtotal</span>
                <b>{money(total)}</b>
              </div>
              <div className="summary-line">
                <span>Delivery</span>
                <span>Confirm on call</span>
              </div>
              <hr />
              <div className="summary-line fs-5">
                <b>Total</b>
                <b className="price">{money(total)}</b>
              </div>

              <Link
                to="/checkout"
                className="btn btn-gold w-100 mt-3"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// CHECKOUT PAGE
function Checkout({ cart, clearCart }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: ""
  });
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function submit(e) {
    e.preventDefault();

    if (!cart.length) {
      setMsg("Your cart is empty.");
      return;
    }

    setBusy(true);
    setMsg("");

    try {
      const response = await api.post("/orders", {
        ...form,
        items: cart.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity
        }))
      });

      clearCart();

      navigate("/order-success", {
        state: { order: response.data }
      });
    } catch (err) {
      setMsg(
        err.response?.data?.message ||
        "Unable to place order. Check your backend API."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="container page-space">
      <h1>Checkout</h1>
      <p className="muted">Enter your details to place your order.</p>

      <form onSubmit={submit} className="panel p-4 mt-4">
        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input
            className="form-control"
            name="customerName"
            value={form.customerName}
            onChange={change}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            className="form-control"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={change}
            pattern="[0-9]{10}"
            title="Enter a 10-digit phone number"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Delivery Address</label>
          <textarea
            className="form-control"
            name="address"
            value={form.address}
            onChange={change}
            rows="3"
            required
          />
        </div>

        <h5 className="mt-3">Total: {money(total)}</h5>

        {msg && <div className="alert alert-warning mt-3">{msg}</div>}

        <button
          className="btn btn-gold mt-3"
          type="submit"
          disabled={busy || !cart.length}
        >
          {busy ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </main>
  );
}

// ORDER SUCCESS PAGE
function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <main className="container page-space text-center">
      <div className="panel p-5">
        <div style={{ fontSize: "70px" }}>✅</div>
        <h1 className="text-success mt-3">Order Successful!</h1>
        <p className="mt-3">
          Thank you for ordering from My Life Restaurant & Dhaba.
        </p>

        {order && (
          <div className="alert alert-success mt-4 text-start">
            <p className="mb-1">
              <strong>Order ID:</strong> #{order.id}
            </p>
            <p className="mb-0">
              <strong>Total Amount:</strong>{" "}
              {money(order.totalAmount ?? order.totalAmount)}
            </p>
          </div>
        )}

        <Link to="/menu" className="btn btn-gold mt-3">
          Continue Shopping
        </Link>
        <Link to="/orders" className="btn btn-outline-dark mt-3 ms-2">
          View Orders
        </Link>
      </div>
    </main>
  );
}

// REVIEWS PAGE
function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    customerName: "",
    rating: "5",
    comment: ""
  });
  const [message, setMessage] = useState("");

  async function loadReviews() {
    try {
      const response = await api.get("/reviews");
      setReviews(Array.isArray(response.data) ? response.data : []);
    } catch {
      setMessage("Reviews could not be loaded. Check the reviews API.");
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  async function submit(e) {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/reviews", {
        ...form,
        rating: Number(form.rating)
      });

      setForm({ customerName: "", rating: "5", comment: "" });
      setMessage("Review submitted successfully.");
      await loadReviews();
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        "Could not submit review. Check the backend API."
      );
    }
  }

  return (
    <main className="container page-space">
      <h1>Customer Reviews</h1>
      <p>Restaurant rating: ★ 4.3 / 5 (provided Google Maps details)</p>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={submit} className="panel p-4 my-4">
        <h4>Write a Review</h4>

        <input
          className="form-control mb-3"
          placeholder="Your name"
          value={form.customerName}
          onChange={(e) =>
            setForm({ ...form, customerName: e.target.value })
          }
          required
        />

        <label className="form-label">Rating</label>
        <select
          className="form-select mb-3"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
        >
          {[5, 4, 3, 2, 1].map((rating) => (
            <option key={rating} value={rating}>
              {rating} Star{rating > 1 ? "s" : ""}
            </option>
          ))}
        </select>

        <textarea
          className="form-control mb-3"
          placeholder="Write your experience..."
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          rows="3"
          required
        />

        <button className="btn btn-gold" type="submit">
          Submit Review
        </button>
      </form>

      <div className="row g-3">
        {reviews.map((review) => (
          <div className="col-md-6" key={review.id}>
            <div className="panel p-3 h-100">
              <h5>{review.customerName}</h5>
              <p className="text-warning">
                {"★".repeat(Math.max(0, Math.min(5, Number(review.rating) || 0)))}
              </p>
              <p>{review.comment}</p>
            </div>
          </div>
        ))}
        {!reviews.length && <p>No customer reviews available yet.</p>}
      </div>
    </main>
  );
}

// ORDERS PAGE
function Orders() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders")
      .then((response) => {
        setOrders(Array.isArray(response.data) ? response.data : []);
      })
      .catch(() => {
        setMessage("Unable to load orders. Check the orders API.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="container page-space">
      <h1>Orders</h1>
      <p className="muted">Check the available order information.</p>

      {message && <div className="alert alert-warning">{message}</div>}
      {loading && <p>Loading orders...</p>}

      {!loading && orders.map((order) => (
        <div className="panel p-3 mb-3" key={order.id}>
          <div className="d-flex justify-content-between flex-wrap gap-2">
            <h5>Order #{order.id}</h5>
            <span className="badge bg-secondary">
              {order.status || "Pending"}
            </span>
          </div>
          <p className="mb-1">
            Customer: {order.customerName || "Customer"}
          </p>
          <p className="mb-0">
            Total: {money(order.totalAmount)}
          </p>
        </div>
      ))}

      {!loading && !orders.length && !message && (
        <p>No orders found.</p>
      )}
    </main>
  );
}

// LOGIN PAGE
function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      await api.post("/auth/login", form);
      setMessage("Login request successful.");
      navigate("/");
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        "Login failed. Check your credentials and backend endpoint."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="container page-space">
      <div className="panel p-4 mx-auto" style={{ maxWidth: 500 }}>
        <h1>Login</h1>
        <form onSubmit={submit}>
          <label className="form-label mt-3">Email</label>
          <input
            className="form-control"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <label className="form-label mt-3">Password</label>
          <input
            className="form-control"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          {message && <div className="alert alert-info mt-3">{message}</div>}

          <button className="btn btn-gold mt-3 w-100" disabled={busy}>
            {busy ? "Please wait..." : "Login"}
          </button>
        </form>

        <p className="mt-3">
          New customer? <Link to="/register">Register here</Link>
        </p>
      </div>
    </main>
  );
}

// REGISTER PAGE
function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      await api.post("/auth/register", form);
      setMessage("Registration successful.");
      navigate("/login");
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        "Registration failed. Check your backend endpoint."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="container page-space">
      <div className="panel p-4 mx-auto" style={{ maxWidth: 500 }}>
        <h1>Create Account</h1>

        <form onSubmit={submit}>
          <label className="form-label mt-3">Full Name</label>
          <input
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <label className="form-label mt-3">Email</label>
          <input
            className="form-control"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <label className="form-label mt-3">Phone</label>
          <input
            className="form-control"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />

          <label className="form-label mt-3">Password</label>
          <input
            className="form-control"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {message && <div className="alert alert-info mt-3">{message}</div>}

          <button className="btn btn-gold mt-3 w-100" disabled={busy}>
            {busy ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </main>
  );
}

// ADMIN DASHBOARD
function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    imageUrl: "",
    available: true
  });

  async function loadItems() {
    try {
      const response = await api.get("/menu");
      setItems(Array.isArray(response.data) ? response.data : []);
    } catch {
      setMessage("Unable to load menu. Check the backend connection.");
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function addItem(e) {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/menu", {
        ...form,
        price: Number(form.price),
        available: Boolean(form.available)
      });

      setForm({
        name: "",
        category: "",
        description: "",
        price: "",
        imageUrl: "",
        available: true
      });

      setMessage("Menu item added successfully.");
      await loadItems();
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        "Unable to add menu item. Check the backend API."
      );
    }
  }

  async function deleteItem(id) {
    if (!window.confirm("Are you sure you want to delete this menu item?")) {
      return;
    }

    try {
      await api.delete(`/menu/${id}`);
      setMessage("Menu item deleted.");
      await loadItems();
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        "Unable to delete menu item."
      );
    }
  }

  return (
    <main className="container page-space">
      <h1>Admin Dashboard</h1>
      <p className="muted">Manage restaurant menu items.</p>

      {message && <div className="alert alert-info">{message}</div>}

      <form className="panel p-4 mb-4" onSubmit={addItem}>
        <h4>Add Menu Item</h4>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Item Name</label>
            <input
              className="form-control"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Category</label>
            <input
              className="form-control"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Price (₹)</label>
            <input
              className="form-control"
              type="number"
              min="0.01"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Image URL</label>
            <input
              className="form-control"
              value={form.imageUrl}
              onChange={(e) =>
                setForm({ ...form, imageUrl: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label className="form-check-label">
              <input
                className="form-check-input me-2"
                type="checkbox"
                checked={form.available}
                onChange={(e) =>
                  setForm({ ...form, available: e.target.checked })
                }
              />
              Available
            </label>
          </div>
        </div>

        <button className="btn btn-gold mt-3" type="submit">
          Add Item
        </button>
      </form>

      <h4>Existing Menu Items</h4>

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Available</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{money(item.price)}</td>
                <td>{item.available ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {!items.length && (
              <tr>
                <td colSpan="5" className="text-center">
                  No menu items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

// FOOTER
function Footer() {
  return (
    <footer className="text-center py-4 mt-5">
      <p className="mb-1">🍽️ My Life Restaurant & Dhaba</p>
      <p className="mb-0">
        XW79+P2, Kukatlapalli, Andhra Pradesh 523303
      </p>
      <p className="mb-0">Contact: 096404 62666</p>
    </footer>
  );
}

// MAIN APP
function App() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("mylife-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("mylife-cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    setCart((old) => {
      const existing = old.find((x) => x.id === item.id);

      if (existing) {
        return old.map((x) =>
          x.id === item.id
            ? { ...x, quantity: x.quantity + 1 }
            : x
        );
      }

      return [...old, { ...item, quantity: 1 }];
    });
  }

  function clearCart() {
    setCart([]);
  }

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
<BrowserRouter basename="/mylife-restruant-project">
      <Navbar count={count} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} />}
        />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} clearCart={clearCart} />}
        />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="*"
          element={
            <main className="container page-space text-center">
              <h1>404 - Page Not Found</h1>
              <Link to="/" className="btn btn-gold">Go Home</Link>
            </main>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
