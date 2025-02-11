import SearchComponent from "./_component/SearchComponent";
import HeaderPart from "./_component/HeaderPart";

const HomePage = () => {
  return (
    <div className="p-10 md:px-40">
      <HeaderPart
        header="Find Medicines & Investigations"
        subHeader="Search for medicines and lab investigations easily."
        imageURL="/vector/health_feed.png"
      />
      <SearchComponent />
    </div>
  );
};

export default HomePage;
