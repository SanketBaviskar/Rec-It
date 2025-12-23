import apiClient from "@/services/Utils/apiClient";

// Types
export interface TransactionItem {
	itemType: "membership" | "pass" | "merchandise" | "service" | "rental";
	itemId: string | number;
	name: string;
	price: number;
	quantity: number;
	// For memberships/passes, store the actual entity ID
	membershipId?: number;
	passId?: number;
}

export interface Transaction {
	id: number;
	userId: number;
	staffId?: number;
	items: TransactionItem[];
	subtotal: number;
	tax: number;
	total: number;
	paymentMethod: "cash" | "card" | "bursar";
	status: "completed" | "refunded" | "pending" | "failed";
	receiptNumber: string;
	notes?: string;
	createdAt: string;
	updatedAt?: string;
}

export interface CreateTransactionDTO {
	userId: number;
	staffId?: number;
	items: TransactionItem[];
	subtotal: number;
	tax: number;
	total: number;
	paymentMethod: "cash" | "card" | "bursar";
	notes?: string;
}

export interface TransactionResponse {
	transaction: Transaction;
	membershipAssignments?: {
		userId: number;
		membershipId: number;
		id: number;
	}[];
	passPurchases?: { userId: number; passId: number; id: number }[];
}

// API Functions

/**
 * Create a new transaction (sale)
 * This handles:
 * - Recording the transaction
 * - Assigning memberships to users
 * - Purchasing passes for users
 */
export const createTransaction = async (
	data: CreateTransactionDTO
): Promise<TransactionResponse> => {
	try {
		const response = await apiClient.post("/transactions/", data);
		return response.data.data;
	} catch (error) {
		console.error("Error creating transaction:", error);
		throw error;
	}
};

/**
 * Get all transactions (admin view)
 */
export const getAllTransactions = async (params?: {
	startDate?: string;
	endDate?: string;
	paymentMethod?: string;
	status?: string;
	limit?: number;
	offset?: number;
}): Promise<{ transactions: Transaction[]; total: number }> => {
	try {
		const response = await apiClient.get("/transactions/", { params });
		return response.data.data;
	} catch (error) {
		console.error("Error fetching transactions:", error);
		throw error;
	}
};

/**
 * Get transaction by ID
 */
export const getTransactionById = async (id: number): Promise<Transaction> => {
	try {
		const response = await apiClient.get(`/transactions/${id}`);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching transaction:", error);
		throw error;
	}
};

/**
 * Get transactions for a specific user
 */
export const getUserTransactions = async (
	userId: number
): Promise<Transaction[]> => {
	try {
		const response = await apiClient.get(`/transactions/user/${userId}`);
		const data = response.data?.data;
		return Array.isArray(data) ? data : [];
	} catch (error) {
		console.error("Error fetching user transactions:", error);
		throw error;
	}
};

/**
 * Process refund for a transaction
 */
export const refundTransaction = async (
	transactionId: number,
	reason?: string
): Promise<Transaction> => {
	try {
		const response = await apiClient.post(
			`/transactions/${transactionId}/refund`,
			{
				reason,
			}
		);
		return response.data.data;
	} catch (error) {
		console.error("Error processing refund:", error);
		throw error;
	}
};

/**
 * Get daily sales summary
 */
export const getDailySalesSummary = async (
	date?: string
): Promise<{
	totalSales: number;
	transactionCount: number;
	byPaymentMethod: { method: string; total: number; count: number }[];
	byCategory: { category: string; total: number; count: number }[];
}> => {
	try {
		const response = await apiClient.get("/transactions/summary/daily", {
			params: { date },
		});
		return response.data.data;
	} catch (error) {
		console.error("Error fetching sales summary:", error);
		throw error;
	}
};
