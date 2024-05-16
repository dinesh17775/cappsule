import React, { useState, useEffect } from "react";
import MedList from "./MedList";
function SaltList() {
  const [searchName, setSearchName] = useState("");
  const [MedData, setMedData] = useState([]);

  useEffect(() => {
    if (MedData && MedData.data && MedData.data.saltSuggestions) {
      console.log(MedData.data.saltSuggestions);
    }
  }, [MedData]); // This effect will run whenever MedData changes
  // This effect will run whenever MedData changes

  async function getData() {
    const MedApi = `https://backend.cappsule.co.in/api/v1/new_search?q=${searchName}&pharmacyIds=1,2,3`;
    const MedResponse = await fetch(MedApi);
    const data = await MedResponse.json();
    setMedData(data);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("form submitted");
    getData();
  }

  function handleInputChange(e) {
    setSearchName(e.target.value);
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <input
            type="search"
            name=""
            id=""
            onChange={handleInputChange}
            value={searchName}
            className=" border-2 border-solid border-red-400"
          />
        </div>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
      <MedList MedData={MedData?.data?.saltSuggestions} />
    </div>
  );
}

export default SaltList;
