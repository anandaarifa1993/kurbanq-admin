"use client";

import { IHewan } from "@/app/types";
import { BASE_API_URL } from "@/global";
import { drop } from "@/lib/api-bridge";
import { getCookie } from "@/lib/client-cookies";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { ButtonDanger, ButtonPrimary } from "@/components/button";
import Modal from "@/components/modal";

const DeleteHewan = ({ selectedHewan }: { selectedHewan: IHewan }) => {
  const [isShow, setIsShow] = useState(false);
  const [hewan, setHewan] = useState<IHewan>({ ...selectedHewan });
  const TOKEN = getCookie("token") || "";
  const router = useRouter();

  const openModal = () => {
    setHewan({ ...selectedHewan });
    setIsShow(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const url = `${BASE_API_URL}/hewan/${selectedHewan.idHewan}`;
      const { data } = await drop(url, TOKEN);

      if (data?.status) {
        setIsShow(false);
        toast.success(data.message, { containerId: "toastHewan" });
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast.warn(data.message, { containerId: "toastHewan" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat menghapus data", {
        containerId: "toastHewan",
      });
    }
  };

  return (
    <div>
      <ButtonDanger type="button" onClick={openModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </ButtonDanger>

      <Modal isShow={isShow} onClose={(state) => setIsShow(state)}>
        <form onSubmit={handleSubmit}>
          <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
            <div className="flex justify-between items-center">
              <div>
                <strong className="text-2xl">Hapus Hewan</strong>
                <small className="block text-slate-400 text-sm">
                  Data hewan yang terhubung dengan transaksi tidak dapat
                  dihapus.
                </small>
              </div>
              <button
                type="button"
                className="text-slate-400"
                onClick={() => setIsShow(false)}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-5">
            Apakah Anda yakin ingin menghapus hewan <b>{hewan.kategori}</b>{" "}
            dengan ID <b>{hewan.idHewan}</b>?
          </div>

          <div className="w-full p-5 flex justify-end gap-2">
            <ButtonDanger type="button" onClick={() => setIsShow(false)}>
              Batal
            </ButtonDanger>
            <ButtonPrimary type="submit">Hapus</ButtonPrimary>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DeleteHewan;
