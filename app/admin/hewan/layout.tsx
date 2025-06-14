import ManagerTemplate from "@/components/adminTemplate";
import { ToastContainer } from "react-toastify";

import MenuList from "../userList";
export const metadata = {
  title: "Hewan | KurbanQ Admin",
  description: "Generated by create next app",
};
type PropsLayout = {
  children: React.ReactNode;
};
const RootLayout = ({ children }: PropsLayout) => {
  return (
    <ManagerTemplate title="Hewan" id="Hewan" userList={MenuList}>
      {children}
      <ToastContainer containerId={"toastHewan"}></ToastContainer>
    </ManagerTemplate>
  );
};
export default RootLayout;
