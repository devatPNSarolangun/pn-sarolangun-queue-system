import { ChevronDown } from "lucide-react";
import SelectKetuaMajelis from "../select-ketua-majelis";

export default function InputPidanaModal({ setShowInputModal }) {
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
                className="w-full bg-white rounded-lg border outline-green-600 border-gray-600 text-sm p-1.5"
              />
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-2/5 ">Jaksa Penuntut Umum</div>
            <div className="w-3/5">
              <input
                type="text"
                className="w-full bg-white rounded-lg border outline-green-600 border-gray-600 text-sm p-1.5"
              />
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-2/5 ">Terdakwa</div>
            <div className="w-3/5">
              <input
                type="text"
                className="w-full bg-white rounded-lg border outline-green-600 border-gray-600 text-sm p-1.5"
              />
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-2/5 ">Ketua Majelis</div>
            <div className="w-3/5">
              <SelectKetuaMajelis />
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-2/5 ">Panitera Pengganti</div>
            <div className="w-3/5">
              <input
                type="text"
                className="w-full bg-white rounded-lg border outline-green-600 border-gray-600 text-sm p-1.5"
              />
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-2/5 ">Ruang Sidang</div>
            <div className="w-3/5">
              <div className="relative h-10 flex items-center w-full">
                <select className="appearance-none w-full flex items-center h-10 rounded-lg outline-green-600 border border-gray-600 p-2 pr-10 text-sm font-semibold ">
                  <option>Ruang Sidang Cakra</option>
                  <option>Ruang Sidang Candra</option>
                  <option>Ruang Sidang Anak</option>
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
              />
            </div>
          </div>
        </div>

        <div className="flex gap-6 mt-7 items-center justify-center">
          <button
            className="w-fit flex items-center gap-2 text-white bg-green-700 rounded-lg p-2 text-sm font-semibold transition delay-150 duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-105 hover:bg-green-800 cursor-pointer"
            // onClick={() => setShowInputModal(true)}
          >
            Submit
          </button>
          <button
            className="w-fit flex items-center gap-2 text-white bg-green-700 rounded-lg p-2 text-sm font-semibold transition delay-150 duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-105 hover:bg-green-800 cursor-pointer"
            onClick={() => setShowInputModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
