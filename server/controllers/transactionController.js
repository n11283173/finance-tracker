import Transaction from "../models/Transaction.js";

// POST /api/transactions
// @desc Create a transaction
export const addTransaction = async (req, res) => {
    try {
        console.log("Request body:", req.body);

        // Create a new transaction from the request body (data sent by client))
        const newTransaction = new Transaction(req.body);

        console.log("New transaction:", newTransaction);

        // Save the transaction to the database
        const savedTransaction = await newTransaction.save();

        console.log("Saved transaction:", savedTransaction);

        // Send the saved transaction as a response with status 201 (Created)
        res.status(201).json(savedTransaction);
    } catch (error) {
        // If there's an error, send a 400 (bad request) with the error message
        res.status(400).json({ error: error.message });
    }
};

// GET /api/transactions
// @desc Get all transactions
export const getTransactions = async (req, res) => {
    try {
        // Find all transactions in the database and sort them by date in descending order or newest first
        const transactions = await Transaction.find().sort({ data: -1 });
        // Send the transactions as a response with status 200 (OK) return array of transactions as JSON
        res.status(200).json(transactions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ✅ Delete a transaction
export const deleteTransaction = async (req, res) => {
    try {
        const deleted = await Transaction.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: "Transaction not found" });
        res.status(200).json({ message: "Transaction deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Update a transaction
export const updateTransaction = async (req, res) => {
    try {
        const updated = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        if (!updated)
            return res.status(404).json({ message: "Transaction not found" });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
