"use client";

import { IUser } from "@/app/types";
import { BASE_API_URL } from "@/global";
import { put } from "@/lib/api-bridge";
import { getCookie } from "@/lib/client-cookies";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  ButtonPrimary,
  ButtonDanger,
  ButtonInfo,
  ButtonWarning,
} from "@/components/button";
import { InputGroupComponent } from "@/components/inputComponent";
import Modal from "@/components/modal";

const EditUser = ({ selectedUser }: { selectedUser: IUser }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({ ...selectedUser });
  const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false);
  const router = useRouter();
  const TOKEN = getCookie("token") || "";
  const formRef = useRef<HTMLFormElement>(null);

  const openModal = () => {
    setUser({ ...selectedUser });
    setIsShow(true);
    setShowPasswordInput(false);
    if (formRef.current) formRef.current.reset();
  };

  const editPassword = () => {
    setUser({ ...user, password: "" });
    setShowPasswordInput(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = `${BASE_API_URL}/user/update/${selectedUser.idUser}`;
    const { nama, email, password, hp, alamat } = user;

    const payload: Record<string, any> = {
      nama,
      email,
      hp,
      alamat,
    };

    if (showPasswordInput && password) {
      payload.password = password;
    }

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data?.status) {
        setIsShow(false);
        toast(data?.message, {
          containerId: `toastUser`,
          type: `success`,
        });
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast(data?.message, {
          containerId: `toastUser`,
          type: `warning`,
        });
      }
    } catch (error) {
      toast(`Terjadi kesalahan`, {
        containerId: `toastUser`,
        type: `error`,
      });
    }
  };

  return (
    <div>
      <ButtonInfo type="button" onClick={openModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 
              2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 
              0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 
              0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 
              5.25 6H10"
          />
        </svg>
      </ButtonInfo>

      <Modal isShow={isShow} onClose={(state) => setIsShow(state)}>
        <form onSubmit={handleSubmit} ref={formRef}>
          {/* Modal Header */}
          <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
            <div className="w-full flex items-center">
              <div className="flex flex-col">
                <strong className="font-bold text-2xl">Update User</strong>
                <small className="text-slate-400 text-sm">
                  Edit informasi pengguna.
                </small>
              </div>
              <div className="ml-auto">
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
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5">
            <InputGroupComponent
              id="nama"
              type="text"
              value={user.nama}
              onChange={(val) => setUser({ ...user, nama: val })}
              required={true}
              label="Nama Lengkap"
            />
            <InputGroupComponent
              id="email"
              type="email"
              value={user.email}
              onChange={(val) => setUser({ ...user, email: val })}
              required={true}
              label="Email"
            />
            <InputGroupComponent
              id="hp"
              type="text"
              value={user.hp}
              onChange={(val) => setUser({ ...user, hp: val })}
              required={true}
              label="Nomor HP"
            />
            <InputGroupComponent
              id="alamat"
              type="text"
              value={user.alamat}
              onChange={(val) => setUser({ ...user, alamat: val })}
              required={true}
              label="Alamat"
            />
          </div>

          {/* Modal Footer */}
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

export default EditUser;
