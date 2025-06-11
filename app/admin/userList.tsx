import { ReactNode } from "react";

import { FaUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { LuHistory } from "react-icons/lu";
import { PiCowDuotone } from "react-icons/pi";

interface IPropMenu {
  id: string;
  path: string;
  label: string;
  icon: ReactNode;
}

let menuList: IPropMenu[] = [
  {
    id: `dashboard`,
    path: `/admin/dashboard`,
    label: `Dashboard`,
    icon: <IoHomeOutline size={28} />,
  },
  {
    id: `hewan`,
    path: `/admin/hewan`,
    label: `Hewan`,
    icon: <PiCowDuotone size={28} />,
  },
  {
    id: `dataUser`,
    path: `/admin/user`,
    label: `User Data`,
    icon: <FaUser size={28} />,
  },
  {
    id: `transaction`,
    path: `/admin/history`,
    label: `Transaction`,
    icon: <LuHistory size={28} />,
  },
];

export default menuList;
