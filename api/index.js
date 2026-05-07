require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { body, param, validationResult } = require("express-validator");

// ─── Config ───────────────────────────────────────────────────────────────────
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;
const JWT_SECRET = process.env.JWT_SECRET || "sanyam-engineering-secret-key-CHANGE-ME";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@sanyamengineering.com").toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "SanyamAdmin@2026";

// ─── MongoDB (cached across warm invocations) ─────────────────────────────────
const mongoClient = new MongoClient(MONGO_URL);
let db;

async function getDB() {
  if (!db) {
    await mongoClient.connect();
    db = mongoClient.db(DB_NAME);
  }
  return db;
}

const quotes = async () => (await getDB()).collection("quotes");

// ─── App setup ────────────────────────────────────────────────────────────────
const app = express();

app.use(
  cors({
    origin: true, // same domain on Vercel — allow all origins (or lock to your domain)
    credentials: true,
  })
);
app.use(express.json());

// ─── Helpers ──────────────────────────────────────────────────────────────────
function createToken(email) {
  return jwt.sign({ sub: email }, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
}

function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) return res.status(401).json({ detail: "Missing token" });

  try {
    const payload = jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });
    if (payload.sub !== ADMIN_EMAIL) {
      return res.status(401).json({ detail: "Invalid admin" });
    }
    req.adminEmail = payload.sub;
    next();
  } catch {
    return res.status(401).json({ detail: "Invalid or expired token" });
  }
}

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ detail: errors.array() });
  next();
}

// ─── Router ───────────────────────────────────────────────────────────────────
const router = express.Router();

// GET /api/
router.get("/", (_req, res) => {
  res.json({ service: "Sanyam Engineering API", status: "ok" });
});

// ── Public: submit quote ──────────────────────────────────────────────────────
router.post(
  "/quotes",
  [
    body("name").isString().trim().isLength({ min: 1, max: 120 }),
    body("company").optional({ nullable: true }).isString().trim().isLength({ max: 160 }),
    body("email").isEmail().normalizeEmail(),
    body("phone").isString().trim().isLength({ min: 5, max: 30 }),
    body("industry").optional({ nullable: true }).isString().trim().isLength({ max: 80 }),
    body("message").isString().trim().isLength({ min: 5, max: 4000 }),
  ],
  validate,
  async (req, res) => {
    try {
      const { name, company, email, phone, industry, message } = req.body;
      const quote = {
        id: uuidv4(),
        name,
        company: company ?? null,
        email,
        phone,
        industry: industry ?? null,
        message,
        status: "new",
        created_at: new Date().toISOString(),
      };
      await (await quotes()).insertOne({ ...quote });
      res.status(200).json(quote);
    } catch (err) {
      console.error("create_quote:", err);
      res.status(500).json({ detail: "Internal server error" });
    }
  }
);

// ── Admin: login ──────────────────────────────────────────────────────────────
router.post(
  "/admin/login",
  [body("email").isEmail().normalizeEmail(), body("password").isString()],
  validate,
  (req, res) => {
    const { email, password } = req.body;
    if (email.toLowerCase() !== ADMIN_EMAIL) {
      return res.status(401).json({ detail: "Invalid credentials" });
    }
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ detail: "Invalid credentials" });
    }
    res.json({ token: createToken(ADMIN_EMAIL), email: ADMIN_EMAIL });
  }
);

// ── Admin: me ─────────────────────────────────────────────────────────────────
router.get("/admin/me", verifyAdmin, (req, res) => {
  res.json({ email: req.adminEmail });
});

// ── Admin: list quotes ────────────────────────────────────────────────────────
router.get("/admin/quotes", verifyAdmin, async (_req, res) => {
  try {
    const docs = await (await quotes())
      .find({}, { projection: { _id: 0 } })
      .sort({ created_at: -1 })
      .limit(1000)
      .toArray();
    res.json(docs);
  } catch (err) {
    console.error("list_quotes:", err);
    res.status(500).json({ detail: "Internal server error" });
  }
});

// ── Admin: update quote status ────────────────────────────────────────────────
router.patch(
  "/admin/quotes/:quote_id",
  verifyAdmin,
  [param("quote_id").isUUID(), body("status").isIn(["new", "contacted", "closed"])],
  validate,
  async (req, res) => {
    try {
      const { quote_id } = req.params;
      const { status } = req.body;
      const updated = await (await quotes()).findOneAndUpdate(
        { id: quote_id },
        { $set: { status } },
        { returnDocument: "after", projection: { _id: 0 } }
      );
      if (!updated) return res.status(404).json({ detail: "Quote not found" });
      res.json(updated);
    } catch (err) {
      console.error("update_quote:", err);
      res.status(500).json({ detail: "Internal server error" });
    }
  }
);

// ── Admin: delete quote ───────────────────────────────────────────────────────
router.delete(
  "/admin/quotes/:quote_id",
  verifyAdmin,
  [param("quote_id").isUUID()],
  validate,
  async (req, res) => {
    try {
      const result = await (await quotes()).deleteOne({ id: req.params.quote_id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ detail: "Quote not found" });
      }
      res.json({ deleted: true });
    } catch (err) {
      console.error("delete_quote:", err);
      res.status(500).json({ detail: "Internal server error" });
    }
  }
);

// ── Admin: stats ──────────────────────────────────────────────────────────────
router.get("/admin/stats", verifyAdmin, async (_req, res) => {
  try {
    const col = await quotes();
    const [total, newCount, contacted, closed] = await Promise.all([
      col.countDocuments({}),
      col.countDocuments({ status: "new" }),
      col.countDocuments({ status: "contacted" }),
      col.countDocuments({ status: "closed" }),
    ]);
    res.json({ total, new: newCount, contacted, closed });
  } catch (err) {
    console.error("stats:", err);
    res.status(500).json({ detail: "Internal server error" });
  }
});

app.use("/api", router);

// ─── Export for Vercel (no .listen() call) ────────────────────────────────────
module.exports = app;
