import express from "express";

import {
    getTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
} from "../controllers/transactionController.js";

// Create a mini Express app just for this group of routes
const router = express.Router();

// When someone sends a GET request t o /api/transactions, call the getTransactions function
router.get("/", getTransactions);

// When someone sends a POST request to /api/transactions, call the addTransaction function
router.post("/", addTransaction);

// When someone sends a DELETE request to /api/transactions/:id, call the deleteTransaction function
router.delete("/:id", deleteTransaction);

// When someone sends a PUT request to /api/transactions/:id, call the updateTransaction function
router.put("/:id", updateTransaction);

// Export the router so it can be used in other parts of the application
export default router;
