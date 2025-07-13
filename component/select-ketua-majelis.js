import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function SelectKetuaMajelis() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchKetuaMajelis() {
      try {
        const res = await fetch("/api/ketua-majelis");
        if (!res.ok) throw new Error("Failed to fetch");

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("❌ Error fetching ketua majelis:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchKetuaMajelis();
  }, []);

  return (
    <div className="relative h-10 flex items-center w-full">
      <select className="appearance-none w-full flex items-center h-10 rounded-lg outline-green-600 border border-gray-600 p-2 pr-10 text-sm font-semibold ">
        <option>Ketua Majelis</option>
        {loading ? (
          <option disabled>Loading...</option>
        ) : (
          data.map((ketua) => (
            <option key={ketua.id} value={ketua.id}>
              {ketua.name}
            </option>
          ))
        )}
      </select>

      <ChevronDown
        width={18}
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 "
      />
    </div>
  );
}
