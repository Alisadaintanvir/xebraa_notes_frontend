import Header from "../ui/Header";

function MainLayout({ children }) {
  return (
    <div className="h-screen bg-gray-100 overflow-auto">
      <Header />
      <div className="main-content pt-12 relative">{children}</div>
    </div>
  );
}

export default MainLayout;
