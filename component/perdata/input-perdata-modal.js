import { ChevronDown } from "lucide-react";
import SelectKetuaMajelis from "../select-ketua-majelis";
import SelectPaniteraPengganti from "../select-panitera-pengganti";
import { useEffect, useState } from "react";

export default function InputPerdataModal({
  setShowInputModal,
  getData,
  editData,
}) {
  const [noPerkara, setNoPerkara] = useState("");
  const [penggugat, setPenggugat] = useState("");
  const [tergugat, setTergugat] = useState("");
  const [ketua, setKetua] = useState("");
  const [panitera, setPanitera] = useState("");
  const [ruangSidang, setRuangSidang] = useState("Ruang Sidang Cakra");
  const [keterangan, setKeterangan] = useState("");

  useEffect(() => {
    if (editData) {
      setNoPerkara(editData.nomorPerkara || "");
      setPenggugat(editData.penggugat || "");
      setTergugat(editData.tergugat || "");
      setKetua(editData.ketuaMajelis?.id || "");
      setPanitera(editData.paniteraPengganti?.id || "");
      setRuangSidang(editData.ruangSidang || "Ruang Sidang Cakra");
      setKeterangan(editData.keterangan || "");
    }
  }, [editData]);

  const handleSubmit = async () => {
    const payload = {
      nomorPerkara: noPerkara,
      penggugat: penggugat,
      tergugat: tergugat,
      keterangan: keterangan || null,
      ketuaMajelisId: parseInt(ketua),
      paniteraPenggantiId: parseInt(panitera),
      ruangSidang: ruangSidang,
    };

    const endpoint = editData ? `/api/perdata/${editData.id}` : "/api/perdata";
    const method = editData ? "PUT" : "POST";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowInputModal(false);
        getData();
      } else {
        console.error("❌ Failed to save record");
        alert("Failed to save record");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
      <div
        className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xl font-bold mb-6">Check In Pidana</div>
        <div className="flex flex-col space-y-5">
          <div className="w-full flex">
            <div className="w-2/5 ">Nomor Perkara</div>
            <div className="w-3/5">
              <input
                type="text"
                className="w-full h-10 bg-white rounded-lg border outline-green-600 border-gray-600 text-sm p-1.5"
                value={noPerkara}
                onChange={(e) => setNoPerkara(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-2/5 ">Penggugat</div>
            <div className="w-3/5">
              <input
                type="text"
                className="w-full h-10 bg-white rounded-lg border outline-green-600 border-gray-600 text-sm p-1.5"
                value={penggugat}
                onChange={(e) => setPenggugat(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-2/5 ">Tergugat</div>
            <div className="w-3/5">
              <input
                type="text"
                className="w-full h-10 bg-white rounded-lg border outline-green-600 border-gray-600 text-sm p-1.5"
                value={tergugat}
                onChange={(e) => setTergugat(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-2/5 ">Ketua Majelis</div>
            <div className="w-3/5">
              <SelectKetuaMajelis
                type="input"
                ketua={ketua}
                setKetua={setKetua}
              />
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-2/5 ">Panitera Pengganti</div>
            <div className="w-3/5">
              <SelectPaniteraPengganti
                panitera={panitera}
                setPanitera={setPanitera}
              />
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-2/5 ">Ruang Sidang</div>
            <div className="w-3/5">
              <div className="relative h-10 flex items-center w-full">
                <select
                  className="appearance-none w-full flex items-center h-10 rounded-lg outline-green-600 border border-gray-600 p-2 pr-10 text-sm font-semibold "
                  value={ruangSidang}
                  onChange={(e) => setRuangSidang(e.target.value)}
                >
                  <option value="Ruang Sidang Cakra">Ruang Sidang Cakra</option>
                  <option value="Ruang Sidang Candra">
                    Ruang Sidang Candra
                  </option>
                  <option value="Ruang Sidang Anak">Ruang Sidang Anak</option>
                </select>

                <ChevronDown
                  width={18}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 "
                />
              </div>
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-2/5 ">Keterangan</div>
            <div className="w-3/5">
              <textarea
                rows={3}
                className="w-full bg-white rounded-lg border outline-green-600 border-gray-600 text-sm p-1.5"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-6 mt-7 items-center justify-center">
          <button
            className="w-20 flex items-center text-center justify-center gap-2 text-white bg-green-700 rounded-lg p-2 text-sm font-semibold transition delay-150 duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-105 hover:bg-green-800 cursor-pointer"
            onClick={() => handleSubmit()}
          >
            {editData ? "Edit" : "Submit"}
          </button>
          <button
            className="w-20 flex items-center text-center justify-center gap-2 text-white bg-green-700 rounded-lg p-2 text-sm font-semibold transition delay-150 duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-105 hover:bg-green-800 cursor-pointer"
            onClick={() => setShowInputModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
