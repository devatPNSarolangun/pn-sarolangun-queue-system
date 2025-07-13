"use client";

import InputPidanaModal from "@/component/pidana/input-pidana-modal";
import SelectKetuaMajelis from "@/component/select-ketua-majelis";
import Table from "@/component/table";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function PidanaList() {
  const [showInputModal, setShowInputModal] = useState(false);

  const columns = ["id", "name", "status", "createdAt"];
  const data = [
    { id: 1, name: "Queue A", status: "Active", createdAt: "2025-07-10" },
    { id: 2, name: "Queue B", status: "Pending", createdAt: "2025-07-11" },
    { id: 3, name: "Queue C", status: "Completed", createdAt: "2025-07-12" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-10">Daftar Check In Pidana</h2>
      <div className="flex gap-4 mb-5">
        <button
          className="w-fit flex items-center gap-2 text-white bg-green-700 rounded-lg p-2 text-sm font-semibold transition delay-150 duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-105 hover:bg-green-800 cursor-pointer"
          onClick={() => setShowInputModal(true)}
        >
          <Plus width={18} />
          Daftar Check In Pidana
        </button>
        <div className="w-fit">
          <SelectKetuaMajelis type="filter" />
        </div>
      </div>

      <Table columns={columns} data={data} />

      {showInputModal && (
        <InputPidanaModal setShowInputModal={setShowInputModal} />
      )}
    </div>
  );
}
