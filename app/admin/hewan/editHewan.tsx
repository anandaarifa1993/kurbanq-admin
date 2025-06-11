"use client";

import { IHewan } from "@/app/types";
import { BASE_API_URL } from "@/global";
import { put } from "@/lib/api-bridge";
import { getCookie } from "@/lib/client-cookies";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ButtonPrimary, ButtonDanger, ButtonInfo } from "@/components/button";
import { InputGroupComponent } from "@/components/inputComponent";
import Modal from "@/components/modal";
import Select from "@/components/select";
import FileInput from "@/components/fileInput";

const EditHewan = ({ selectedHewan }: { selectedHewan: IHewan }) => {
  const [isShow, setIsShow] = useState(false);
  const [hewan, setHewan] = useState<IHewan>({ ...selectedHewan });
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const TOKEN = getCookie("token") || "";
  const router = useRouter();

  const openModal = () => {
    setHewan({ ...selectedHewan });
    setIsShow(true);
    if (formRef.current) formRef.current.reset();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const url = `${BASE_API_URL}/hewan/update/${selectedHewan.idHewan}`;
      const { umur, kategori, berat, harga, deskripsi, statusHewan } = hewan;
      const payload = new FormData();
      payload.append("umur", umur?.toString() || "0");
      payload.append("kategori", kategori || "");
      payload.append("berat", berat || "");
      payload.append("harga", harga?.toString() || "0");
      payload.append("deskripsi", deskripsi || "");
      payload.append("statusHewan", statusHewan || "");
      if (file !== null) payload.append("foto", file);

      const { data } = await put(url, payload, TOKEN);

      if (data?.status) {
        setIsShow(false);
        toast.success(data.message, { containerId: "toastHewan" });
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast.warn(data.message, { containerId: "toastHewan" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat menyimpan data", {
        containerId: "toastHewan",
      });
    }
  };

  return (
    <div>
      <ButtonInfo type="button" onClick={openModal}>
        Edit
      </ButtonInfo>

      <Modal isShow={isShow} onClose={setIsShow}>
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
            <div className="flex justify-between items-center">
              <div>
                <strong className="text-2xl">Edit Data Hewan</strong>
                <small className="block text-slate-400 text-sm">
                  Ubah informasi hewan kurban yang sudah ada
                </small>
              </div>
              <button
                type="button"
                onClick={() => setIsShow(false)}
                className="text-slate-400"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-5">
            <InputGroupComponent
              id="umur"
              label="Umur"
              value={hewan.umur?.toString() || ""}
              onChange={(val) => setHewan({ ...hewan, umur: parseInt(val) })}
              required
              type="number"
            />
            <Select
              id="kategori"
              label="Kategori"
              value={hewan.kategori}
              required
              onChange={(val) => setHewan({ ...hewan, kategori: val })}
            >
              <option value="">-- Pilih Kategori --</option>
              <option value="KAMBING">Kambing</option>
              <option value="DOMBA">Domba</option>
              <option value="SAPI">Sapi</option>
            </Select>
            <InputGroupComponent
              id="berat"
              label="Berat (kg)"
              value={hewan.berat}
              onChange={(val) => setHewan({ ...hewan, berat: val })}
              required
              type="text"
            />
            <InputGroupComponent
              id="harga"
              label="Harga (Rp)"
              value={hewan.harga?.toString() || ""}
              onChange={(val) => setHewan({ ...hewan, harga: parseInt(val) })}
              required
              type="number"
            />
            <InputGroupComponent
              id="deskripsi"
              label="Deskripsi"
              value={hewan.deskripsi}
              onChange={(val) => setHewan({ ...hewan, deskripsi: val })}
              required
              type="text"
            />
            <Select
              id="statusHewan"
              label="status"
              value={hewan.statusHewan}
              onChange={(val) => setHewan({ ...hewan, statusHewan: val })}
              required
            >
              <option value="">--- Pilih Status ---</option>
              <option value="TERSEDIA">TERSEDIA</option>
              <option value="HABIS">HABIS</option>
            </Select>
            <FileInput
              acceptTypes={["image/png", "image/jpeg", "image/jpg"]}
              id="foto"
              label="Upload Foto"
              onChange={(f) => setFile(f)}
              required={false}
            />
          </div>

          <div className="p-5 flex justify-end gap-2">
            <ButtonDanger type="button" onClick={() => setIsShow(false)}>
              Batal
            </ButtonDanger>
            <ButtonPrimary type="submit">Simpan</ButtonPrimary>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EditHewan;
