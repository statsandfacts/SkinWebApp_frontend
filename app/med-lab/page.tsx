"use client";

import { useState } from "react";
import SearchComponent from "./_component/SearchComponent";
import HeaderPart from "./_component/HeaderPart";

const HomePage = () => {
  const [searchType, setSearchType] = useState<"medicine" | "investigation">("medicine");

  return (
   
    <div className="p-10 md:px-40">
        <HeaderPart
          header="Digital Health Feed"
          subHeader="Stay informed with the latest in digital health and wellness."
          imageURL="/vector/health_feed.png"
        />
 <SearchComponent />
        
      </div>




   



    
  );
};

export default HomePage;
