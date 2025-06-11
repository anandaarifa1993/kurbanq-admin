"use client";

import { IHewan } from "@/app/types";
import { BASE_API_URL } from "@/global";
import { post } from "@/lib/api-bridge";
import { getCookie } from "@/lib/client-cookies";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  ButtonPrimary,
  ButtonSuccess,
  ButtonDanger,
} from "@/components/button";
import { InputGroupComponent } from "@/components/inputComponent";
import Modal from "@/components/modal";
import Select from "@/components/select";
import FileInput from "@/components/fileInput";

const AddHewan = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [hewan, setHewan] = useState<IHewan>({
    idHewan: 0,
    uuid: "",
    berat: "",
    umur: 0,
    harga: 0,
    kategori: "",
    deskripsi: "",
    foto: "",
    statusHewan: "TERSEDIA",
    createdAt: "",
    updatedAt: "",
  });

  const router = useRouter();
  const TOKEN = getCookie("token") || "";
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const openModal = () => {
    setHewan({
      idHewan: 0,
      uuid: "",
      berat: "",
      umur: 0,
      harga: 0,
      kategori: "",
      deskripsi: "",
      foto: "",
      statusHewan: "TERSEDIA",
      createdAt: "",
      updatedAt: "",
    });
    setIsShow(true);
    if (formRef.current) formRef.current.reset();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const url = `${BASE_API_URL}/hewan/add`;
      const { berat, umur, harga, kategori, deskripsi, statusHewan } = hewan;

      const payload = new FormData();
      payload.append("berat", berat);
      payload.append("umur", umur.toString());
      payload.append("harga", harga.toString());
      payload.append("kategori", kategori);
      payload.append("deskripsi", deskripsi);
      payload.append("statusHewan", statusHewan);
      if (file !== null) payload.append("foto", file);

      const { data } = await post(url, payload, TOKEN);

      if (data?.status) {
        setIsShow(false);
        toast.success(data?.message || "Berhasil menambahkan hewan.", {
          containerId: `toastHewan`,
        });
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast.warning(data?.message || "Gagal menambahkan data.", {
          containerId: `toastHewan`,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan.", {
        containerId: `toastHewan`,
      });
    }
  };

  return (
    <div>
      <ButtonSuccess type="button" onClick={openModal}>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Tambah Hewan
        </div>
      </ButtonSuccess>

      <Modal isShow={isShow} onClose={setIsShow}>
        <form onSubmit={handleSubmit} ref={formRef}>
          {/* Header */}
          <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
            <div className="flex items-center justify-between">
              <div>
                <strong className="text-2xl font-bold">
                  Tambah Hewan Baru
                </strong>
                <small className="block text-sm text-slate-400">
                  Form untuk menambahkan data hewan
                </small>
              </div>
              <button
                type="button"
                className="text-slate-400"
                onClick={() => setIsShow(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-5">
            <InputGroupComponent
              id="berat"
              label="Berat"
              type="text"
              value={hewan.berat}
              onChange={(val) => setHewan({ ...hewan, berat: val })}
              required
            />
            <InputGroupComponent
              id="umur"
              label="Umur"
              type="number"
              value={hewan.umur.toString()}
              onChange={(val) => setHewan({ ...hewan, umur: Number(val) })}
              required
            />
            <InputGroupComponent
              id="harga"
              label="Harga"
              type="number"
              value={hewan.harga.toString()}
              onChange={(val) => setHewan({ ...hewan, harga: Number(val) })}
              required
            />
            <Select
              id="kategori"
              label="Kategori"
              value={hewan.kategori}
              onChange={(val) => setHewan({ ...hewan, kategori: val })}
              required
            >
              <option value="">--- Pilih Kategori ---</option>
              <option value="SAPI">Sapi</option>
              <option value="DOMBA">Domba</option>
              <option value="KAMBING">Kambing</option>
            </Select>
            <InputGroupComponent
              id="deskripsi"
              label="Deskripsi"
              type="text"
              value={hewan.deskripsi}
              onChange={(val) => setHewan({ ...hewan, deskripsi: val })}
              required
            />
            <FileInput
              id="foto"
              label="Upload Foto"
              acceptTypes={["image/png", "image/jpeg", "image/jpg"]}
              onChange={(f) => setFile(f)}
              required={false}
            />
          </div>

          {/* Footer */}
          <div className="w-full p-5 flex rounded-b-2xl shadow">
            <div className="flex ml-auto gap-2">
              <ButtonDanger type="button" onClick={() => setIsShow(false)}>
                Batal
              </ButtonDanger>
              <ButtonPrimary type="submit">Simpan</ButtonPrimary>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddHewan;
