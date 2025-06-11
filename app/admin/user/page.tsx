import { IUser } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import { BASE_API_URL, BASE_IMAGE_PROFILE } from "@/global";
import { get } from "@/lib/api-bridge";
import { AlertInfo } from "@/components/alert";
import Image from "next/image";
import EditUser from "./editUser";
import DeleteUser from "./deleteUser";

const getUser = async (): Promise<IUser[]> => {
  try {
    const TOKEN = await getCookies("token");
    const url = `${BASE_API_URL}/user/get/`;
    const { data } = await get(url, TOKEN);
    console.log(data);
    let result: IUser[] = [];
    if (data?.status) result = [...data.data];
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const UserPage = async () => {
  const user: IUser[] = await getUser();

  console.log(user);

  return (
    <div className="rounded-lg p-3">
      <h4 className="text-4xl font-bold mb-2">Data User</h4>
      <p className="text-sm text-secondary mb-4">
        Halaman ini menampilkan data user, memungkinkan admin untuk melihat
        detail dan mengelola informasi pengguna.
      </p>

      {user.length === 0 ? (
        <AlertInfo title="Informasi">Data user tidak tersedia.</AlertInfo>
      ) : (
        <div className="m-2">
          {user.map((data, index) => (
            <div
              key={`keyUser${index}`}
              className="flex flex-wrap shadow m-2 bg-slate-200 rounded-xl"
            >
              <div className="w-full md:w-1/12 p-2">
                <small className="text-sm font-bold text-primary">
                  ID User
                </small>
                <br />
                {data.idUser}
              </div>

              {/* <div className="w-full md:w-1/12 p-2">
                <small className="text-sm font-bold text-primary">Foto</small>
                <br />
                <Image
                  width={38}
                  height={38}
                  src={`${BASE_IMAGE_PROFILE}/${data.profile}`}
                  className="text-sm object-cover aspect-square rounded-sm overflow-hidden"
                  alt="preview"
                  unoptimized
                />
              </div> */}

              <div className="w-full md:w-2/12 p-2">
                <small className="text-sm font-bold text-primary">Nama</small>
                <br />
                {data.nama}
              </div>

              <div className="w-full md:w-2/12 p-2">
                <small className="text-sm font-bold text-primary">Email</small>
                <br />
                {data.email}
              </div>

              <div className="w-full md:w-2/12 p-2">
                <small className="text-sm font-bold text-primary">
                  Nomor HP
                </small>
                <br />
                {data.hp}
              </div>

              <div className="w-full md:w-3/12 p-2">
                <small className="text-sm font-bold text-primary">Alamat</small>
                <br />
                {data.alamat}
              </div>

              <div className="w-full md:w-1/12 p-2">
                <small className="text-sm font-bold text-primary">Aksi</small>
                <br />
                <div className="flex gap-1">
                  <EditUser selectedUser={data} />
                  <DeleteUser selectedUser={data} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPage;
