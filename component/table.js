export default function Table({ columnKeyMap, columns, data }) {
  console.log("Data", data);

  const getValue = (row, keyPath) => {
    return keyPath
      .split(".")
      .reduce((obj, key) => (obj ? obj[key] : null), row);
  };

  return (
    <div className="relative">
      {/* Table wrapper with both X and Y scroll */}
      <div className="overflow-x-auto overflow-y-auto rounded-lg border border-gray-200 shadow max-h-[500px]">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          {/* Table Header */}
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="w-fit px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {data ? (
              data.length !== 0 ? (
                data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    {columns.map((col) => {
                      const key = columnKeyMap[col];
                      const value = getValue(row, key);
                      return (
                        <td
                          key={col}
                          className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap"
                        >
                          {value ?? "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-16 text-center text-gray-500 text-lg"
                  >
                    Data tidak tersedia!
                  </td>
                </tr>
              )
            ) : (
              "loading"
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
