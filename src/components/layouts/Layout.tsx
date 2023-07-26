import HeaderComponent from "@/components/layouts/HeaderComponent";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderComponent />
      {children}
    </>
  );
};

export default Layout;
