import React from "react";

export function StatusBadge({ status }) {
  const statusStyles = {
    present: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
    },
    absent: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
    late: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-200",
    },
    excuse: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
    },
  };

  const style = statusStyles[status?.toLowerCase()] || statusStyles.absent;

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-lg border ${style.bg} ${style.text} ${style.border}`}
    >
      {status}
    </span>
  );
}

export default function Table({ columns, data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-8 text-center">
        <p className="text-slate-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-slate-50 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={`${rowIndex}-${col.key}`}
                    className="px-6 py-4 text-sm text-slate-700"
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
