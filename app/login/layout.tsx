export const metadata = {
  title: `Login | QurbanQ Admin`,
  description: `App Made By Fantastic Four Team`,
};

type PropsLayout = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: PropsLayout) => {
  return <div>{children}</div>;
};

export default RootLayout;
