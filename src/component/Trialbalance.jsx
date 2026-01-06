import React from "react";
import { Scale } from "lucide-react";

const TrialBalance = () => {
  const trialBalanceData = [
    // ASSETS
    {
      id: 1,
      ledger: "Cash in Hand",
      group: "Current Assets",
      debit: 125000,
      credit: 0,
    },
    {
      id: 2,
      ledger: "HDFC Bank",
      group: "Bank Accounts",
      debit: 1850000,
      credit: 0,
    },
    {
      id: 3,
      ledger: "ICICI Bank",
      group: "Bank Accounts",
      debit: 920000,
      credit: 0,
    },
    {
      id: 4,
      ledger: "Accounts Receivable",
      group: "Sundry Debtors",
      debit: 2485000,
      credit: 0,
    },
    {
      id: 5,
      ledger: "Inventory – Raw Materials",
      group: "Current Assets",
      debit: 3250000,
      credit: 0,
    },
    {
      id: 6,
      ledger: "Inventory – Finished Goods",
      group: "Current Assets",
      debit: 1850000,
      credit: 0,
    },
    {
      id: 7,
      ledger: "Prepaid Expenses",
      group: "Current Assets",
      debit: 95000,
      credit: 0,
    },

    // FIXED ASSETS
    {
      id: 8,
      ledger: "Plant & Machinery",
      group: "Fixed Assets",
      debit: 7800000,
      credit: 0,
    },
    {
      id: 9,
      ledger: "Office Equipment",
      group: "Fixed Assets",
      debit: 850000,
      credit: 0,
    },
    {
      id: 10,
      ledger: "Furniture & Fixtures",
      group: "Fixed Assets",
      debit: 420000,
      credit: 0,
    },

    // LIABILITIES
    {
      id: 11,
      ledger: "Accounts Payable",
      group: "Sundry Creditors",
      debit: 0,
      credit: 2150000,
    },
    {
      id: 12,
      ledger: "GST Output CGST",
      group: "Duties & Taxes",
      debit: 0,
      credit: 285000,
    },
    {
      id: 13,
      ledger: "GST Output SGST",
      group: "Duties & Taxes",
      debit: 0,
      credit: 285000,
    },
    {
      id: 14,
      ledger: "GST Output IGST",
      group: "Duties & Taxes",
      debit: 0,
      credit: 195000,
    },
    {
      id: 15,
      ledger: "GST Input CGST",
      group: "Duties & Taxes",
      debit: 165000,
      credit: 0,
    },
    {
      id: 16,
      ledger: "GST Input SGST",
      group: "Duties & Taxes",
      debit: 165000,
      credit: 0,
    },
    {
      id: 17,
      ledger: "GST Input IGST",
      group: "Duties & Taxes",
      debit: 125000,
      credit: 0,
    },

    // CAPITAL & LOANS
    {
      id: 18,
      ledger: "Capital Account",
      group: "Capital Account",
      debit: 0,
      credit: 9500000,
    },
    {
      id: 19,
      ledger: "Term Loan – SBI",
      group: "Secured Loans",
      debit: 0,
      credit: 3200000,
    },

    // INCOME
    {
      id: 20,
      ledger: "Sales – Domestic",
      group: "Revenue",
      debit: 0,
      credit: 12500000,
    },
    {
      id: 21,
      ledger: "Sales – Export",
      group: "Revenue",
      debit: 0,
      credit: 3850000,
    },
    {
      id: 22,
      ledger: "Other Income",
      group: "Revenue",
      debit: 0,
      credit: 185000,
    },

    // EXPENSES
    {
      id: 23,
      ledger: "Purchase – Raw Materials",
      group: "Direct Expenses",
      debit: 8250000,
      credit: 0,
    },
    {
      id: 24,
      ledger: "Manufacturing Expenses",
      group: "Direct Expenses",
      debit: 1650000,
      credit: 0,
    },
    {
      id: 25,
      ledger: "Salary & Wages",
      group: "Indirect Expenses",
      debit: 1250000,
      credit: 0,
    },
    {
      id: 26,
      ledger: "Electricity Charges",
      group: "Indirect Expenses",
      debit: 185000,
      credit: 0,
    },
    {
      id: 27,
      ledger: "Rent Expense",
      group: "Indirect Expenses",
      debit: 325000,
      credit: 0,
    },
    {
      id: 28,
      ledger: "Office Expenses",
      group: "Indirect Expenses",
      debit: 145000,
      credit: 0,
    },
    {
      id: 29,
      ledger: "Transportation & Freight",
      group: "Indirect Expenses",
      debit: 295000,
      credit: 0,
    },
    {
      id: 30,
      ledger: "Depreciation",
      group: "Indirect Expenses",
      debit: 425000,
      credit: 0,
    },
  ];

  const totalDebit = trialBalanceData.reduce((sum, i) => sum + i.debit, 0);
  const totalCredit = trialBalanceData.reduce((sum, i) => sum + i.credit, 0);

  return (
    <div className="p-6 min-h-screen mt-10">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-6">
        <Scale className="text-blue-600" />
        Trial Balance
      </h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Ledger</th>
              <th className="p-3 text-left">Group</th>
              <th className="p-3 text-right">Debit (₹)</th>
              <th className="p-3 text-right">Credit (₹)</th>
            </tr>
          </thead>
          <tbody>
            {trialBalanceData.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{row.ledger}</td>
                <td className="p-3 text-gray-600">{row.group}</td>
                <td className="p-3 text-right text-blue-700">
                  {row.debit ? row.debit.toLocaleString("en-IN") : "-"}
                </td>
                <td className="p-3 text-right text-green-700">
                  {row.credit ? row.credit.toLocaleString("en-IN") : "-"}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot className="bg-gray-100 font-bold">
            <tr>
              <td className="p-3" colSpan={2}>
                Total
              </td>
              <td className="p-3 text-right text-blue-800">
                ₹{totalDebit.toLocaleString("en-IN")}
              </td>
              <td className="p-3 text-right text-green-800">
                ₹{totalCredit.toLocaleString("en-IN")}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p
        className={`mt-4 font-semibold ${
          totalDebit === totalCredit ? "text-green-600" : "text-red-600"
        }`}
      >
        {totalDebit === totalCredit
          ? "✔ Trial Balance Matched"
          : "✖ Trial Balance Mismatch"}
      </p>
    </div>
  );
};

export default TrialBalance;
