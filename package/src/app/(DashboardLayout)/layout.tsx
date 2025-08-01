import Header from "./layout/header/Header";
import Sidebar from "./layout/sidebar/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full min-h-screen">
      <div className="page-wrapper flex w-full">
        {/* Header/sidebar */}
        <Sidebar />
        <div className="body-wrapper w-full bg-white dark:bg-dark">
          {/* Top Header  */}
          <Header />
          {/* Body Content  */}
          <div
            className={`container mx-auto px-6  py-30`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
