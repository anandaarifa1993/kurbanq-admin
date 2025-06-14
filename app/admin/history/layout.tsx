import ManagerTemplate from "@/components/adminTemplate";
import MenuList from "../userList";
export const metadata = {
  title: "History | KurbanQ Admin",
  description: "Generated by create next app",
};
type PropsLayout = {
  children: React.ReactNode;
};
const RootLayout = ({ children }: PropsLayout) => {
  return (
    <ManagerTemplate title="History" id="history" userList={MenuList}>
      {children}
    </ManagerTemplate>
  );
};
export default RootLayout;
