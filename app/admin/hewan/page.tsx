import { IHewan } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import { BASE_API_URL, BASE_IMAGE_HEWAN } from "@/global";
import { get } from "@/lib/api-bridge";
import { AlertInfo } from "@/components/alert";
import Image from "next/image";
import SearchHewan from "./search";
import AddHewan from "./addHewan";
import EditHewan from "./editHewan";
import DeleteHewan from "./deleteHewan";

const getMenu = async (search: string): Promise<IHewan[]> => {
  try {
    const TOKEN = await getCookies("token");
    const url = `${BASE_API_URL}/hewan/get?search=${search}`;
    const { data } = await get(url, TOKEN);
    let result: IHewan[] = [];
    if (data?.status) result = [...data.data];
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const MenuPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const search = await (searchParams.search
    ? searchParams.search.toString()
    : ``);

  const hewan: IHewan[] = await getMenu(search);

  const category = (cat: string): React.ReactNode => {
    if (cat === "SAPI") {
      return (
        <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
          SAPI
        </span>
      );
    } else if (cat === "DOMBA") {
      return (
        <span className="bg-blue-100 text-lime-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-lime-900 dark:text-lime-300">
          DOMBA
        </span>
      );
    } else {
      return (
        <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
          KAMBING
        </span>
      );
    }
  };

  const status = (stat: string): React.ReactNode => {
    if (stat === "TERSEDIA") {
      return (
        <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
          TERSEDIA
        </span>
      );
    }
    return (
      <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
        HABIS
      </span>
    );
  };

  return (
    <div className="rounded-lg p-3">
      <h4 className="text-4xl font-bold mb-2">Data Hewan</h4>
      <p className="text-sm text-secondary mb-4">
        Halaman ini menampilkan data hewan, memungkinkan pengguna untuk melihat
        detail, mencari, dan mengelola informasi hewan dengan menambahkan,
        mengedit, atau menghapus data.
      </p>

      <div className="flex justify-between items-center mb-4">
        {/* Search Bar */}
        <div className="flex items-center w-full max-w-md flex-grow">
          {/* <SearchHewan url={`/admin/hewan`} search={search} /> */}
        </div>

        {/* Add Hewan Button */}
        <div className="ml-4">
          <AddHewan />
        </div>
      </div>

      {hewan.length === 0 ? (
        <AlertInfo title="Informasi">Data hewan tidak tersedia.</AlertInfo>
      ) : (
        <div className="m-2">
          {hewan.map((data, index) => (
            <div
              key={`keyHewan${index}`}
              className="flex flex-wrap shadow m-2 bg-slate-200 rounded-xl"
            >
              {/* ID Hewan */}
              <div className="w-full md:w-1/12 p-2">
                <small className="text-sm font-bold text-primary">
                  ID Hewan
                </small>
                <br />
                {data.idHewan}
              </div>

              {/* Foto */}
              <div className="w-full md:w-1/12 p-2">
                <small className="text-sm font-bold text-primary">Foto</small>
                <br />
                <Image
                  width={38}
                  height={38}
                  src={`${BASE_IMAGE_HEWAN}/${data.foto}`}
                  className="text-sm object-cover aspect-square rounded-sm overflow-hidden"
                  alt="preview"
                  unoptimized
                />
              </div>

              {/* Kategori */}
              <div className="w-full md:w-1/12 p-2">
                <small className="text-sm font-bold text-primary">
                  Kategori
                </small>
                <br />
                {category(data.kategori)}
              </div>

              {/* Berat */}
              <div className="w-full md:w-1/12 p-2">
                <small className="text-sm font-bold text-primary">Berat</small>
                <br />
                {data.berat}
              </div>

              {/* Umur */}
              <div className="w-full md:w-1/12 p-2">
                <small className="text-sm font-bold text-primary">
                  Umur Hewan
                </small>
                <br />
                {data.umur} tahun
              </div>

              {/* Harga */}
              <div className="w-full md:w-2/12 p-2">
                <small className="text-sm font-bold text-primary">Harga</small>
                <br />
                Rp {data.harga.toLocaleString()}
              </div>

              {/* Status */}
              <div className="w-full md:w-1/12 p-2">
                <small className="text-sm font-bold text-primary">Status</small>
                <br />
                {status(data.statusHewan)}
              </div>

              {/* Deskripsi */}
              <div className="w-full md:w-3/12 p-2">
                <small className="text-sm font-bold text-primary">
                  Deskripsi
                </small>
                <br />
                {data.deskripsi}
              </div>

              {/* Aksi */}
              <div className="w-full md:w-1/12 p-2">
                <small className="text-sm font-bold text-primary">Aksi</small>
                <br />
                <div className="flex gap-1">
                  <EditHewan selectedHewan={data} />
                  <DeleteHewan selectedHewan={data} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default MenuPage;
