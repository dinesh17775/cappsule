import React, { useState, useEffect } from "react";
import MedList from "./MedList";

function SaltList() {
  const [searchName, setSearchName] = useState("");
  const [medicineData, setMedicineData] = useState(null);

  useEffect(() => {
    if (
      medicineData &&
      medicineData.data &&
      medicineData.data.saltSuggestions
    ) {
      console.log(medicineData.data.saltSuggestions);
    }
  }, [medicineData]);

  async function fetchData() {
    const medApi = `https://backend.cappsule.co.in/api/v1/new_search?q=${searchName}&pharmacyIds=1,2,3`;
    const medResponse = await fetch(medApi);
    const data = await medResponse.json();
    setMedicineData(data);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted");
    fetchData();
  }

  function handleInputChange(e) {
    setSearchName(e.target.value);
  }

  return (
    <div className="max mx-auto mt-[120px]">
      <div className="mb-5">
        <h2 className="text-center font-normal text-2xl">
          Cappsule web development test
        </h2>
      </div>
      <div className="w-3/4 mx-auto py-5">
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full py-5 flex items-center border border-red-400"
        >
          <div className="w-full">
            <input
              type="search"
              name=""
              id=""
              onChange={handleInputChange}
              value={searchName}
              className="w-full border border-gray-500/60 rounded-full h-[60px] shadow-lg px-[100px] py-2 text-base"
              placeholder="Type your medicine name here"
            />
          </div>
          <div className="w-[100px] -mx-[100px]">
            <button
              type="submit"
              className="font-bold text-[#2a527a] text-base"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {!medicineData ||
      !medicineData.data ||
      !medicineData.data.saltSuggestions ? (
        <div>
          <h2>Find medicines with amazing discount</h2>
        </div>
      ) : (
        <MedList MedData={medicineData.data.saltSuggestions} />
      )}
    </div>
  );
}

export default SaltList;
