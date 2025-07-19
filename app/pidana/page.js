"use client";

import InputPidanaModal from "@/component/pidana/input-pidana-modal";
import SelectKetuaMajelis from "@/component/select-ketua-majelis";
import Table from "@/component/table";
import { Edit, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function PidanaList() {
  const columns = [
    "Antrian",
    "No. Perkara",
    "Jaksa Penuntun Umum",
    "Terdakwa",
    "Ketua Majelis",
    "Panitera Pengganti",
    "Ruang Sidang",
    "Keterangan",
    "Setting",
  ];

  const columnKeyMap = {
    Antrian: "antrian",
    "No. Perkara": "nomorPerkara",
    "Jaksa Penuntun Umum": "jaksaPenuntutUmum",
    Terdakwa: "terdakwa",
    "Ketua Majelis": "ketuaMajelis",
    "Panitera Pengganti": "paniteraPengganti",
    "Ruang Sidang": "ruangSidang",
    Keterangan: "keterangan",
    Setting: "setting", // Adjust or remove if needed
  };

  const [showInputModal, setShowInputModal] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(null);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/pidana?ketuaMajelisId=${filter || ""}`);
      if (!res.ok) throw new Error("Failed to fetch");

      const result = await res.json();
      console.log("result", result);

      const resultData = result.map((item, i) => ({
        antrian: i + 1,
        id: item.id,
        nomorPerkara: item.nomorPerkara,
        jaksaPenuntutUmum: item.jaksaPenuntutUmum,
        terdakwa: item.terdakwa,
        ketuaMajelis: item.ketuaMajelis?.name || "-",
        paniteraPengganti: item.paniteraPengganti?.name || "-",
        ruangSidang: item.ruangSidang,
        keterangan: item.keterangan,
      }));

      setData(resultData);
      setLoading(false);
    } catch (err) {
      console.error("❌ Error fetching pidana data:", err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    try {
      const res = await fetch(`/api/pidana/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      getData();
    } catch (err) {
      console.error("❌ Error deleting pidana:", err);
    }
  };

  const handleEdit = async (item) => {
    setEditData(null);
    try {
      const res = await fetch(`/api/pidana/${item.id}`);
      if (!res.ok) throw new Error("Failed to fetch record");
      const fullData = await res.json();

      setEditData(fullData);
      setShowInputModal(true);
    } catch (err) {
      console.error("❌ Error fetching full record:", err);
      alert("Failed to load data for edit");
    }
  };

  useEffect(() => {
    getData();
  }, [filter]);

  console.log("data", data);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-10">Daftar Check In Pidana</h2>
      <div className="flex gap-4 mb-10">
        <button
          className="w-fit flex items-center gap-2 text-white bg-green-700 rounded-lg p-2 text-sm font-semibold transition delay-150 duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-105 hover:bg-green-800 cursor-pointer"
          onClick={() => {
            setEditData(null);
            setShowInputModal(true);
          }}
        >
          <Plus width={18} />
          Daftar Check In Pidana
        </button>
        <div className="w-fit">
          <SelectKetuaMajelis type="filter" setKetua={setFilter} />
        </div>
      </div>

      {!loading ? (
        <Table
          columnKeyMap={columnKeyMap}
          columns={columns}
          data={data}
          renderCell={(row) => (
            <div className="flex place-content-evenly items-center gap-2">
              <Edit
                size={22}
                className="text-blue-600 cursor-pointer"
                onClick={() => handleEdit(row)}
              />
              <Trash
                size={22}
                className="text-red-600 cursor-pointer"
                onClick={() => handleDelete(row.id)}
              />
            </div>
          )}
        />
      ) : (
        <div className="flex items-center justify-center h-[500px]">
          <svg
            className="mr-3 w-[100px] h-[100px] animate-spin text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        </div>
      )}

      {showInputModal && (
        <InputPidanaModal
          setShowInputModal={setShowInputModal}
          getData={getData}
          editData={editData}
        />
      )}
    </div>
  );
}
