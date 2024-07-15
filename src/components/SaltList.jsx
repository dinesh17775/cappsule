import React, { useState, useEffect } from "react";
import MedList from "./MedList";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

function SaltList() {
  const [searchName, setSearchName] = useState("");
  const [medicineData, setMedicineData] = useState(null);
  const [showIcon, setShowIcon] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchMed, setSearchMed] = useState(false);

  useEffect(() => {
    if (
      medicineData &&
      medicineData.data &&
      medicineData.data.saltSuggestions
    ) {
      const found = medicineData.data.saltSuggestions.some(
        (item) => item.salt.toLowerCase() === searchName.toLowerCase()
      );
      setSearchMed(found);
    }
  }, [medicineData, searchName]);

  async function fetchData() {
    const medApi = `https://backend.cappsule.co.in/api/v1/new_search?q=${searchName}&pharmacyIds=1,2,3`;
    const medResponse = await fetch(medApi);
    const data = await medResponse.json();
    setMedicineData(data);
    setSearchPerformed(true);

    // Check if the search returned any valid results
    if (
      data &&
      data.data &&
      data.data.saltSuggestions &&
      data.data.saltSuggestions.length === 0
    ) {
      // setShowIcon(false); // Hide the results if no valid results are found
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowIcon(true);
    setSearchMed(false); // Reset searchMed for new search
    fetchData();
  }

  function handleInputChange(e) {
    setSearchName(e.target.value);
  }

  return (
    <div className="max mx-auto mt-[50px]">
      <div className="mb-5">
        <h2 className="text-center font-normal text-2xl">
          Cappsule web development test
        </h2>
      </div>
      <div className="w-[80%] mx-auto py-5">
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full py-5 flex items-center "
        >
          <div className="w-full relative">
            <div className="absolute ml-[30px] top-1/2 transform -translate-y-1/2">
              {!showIcon ? (
                <CiSearch className="text-[20px] cursor-pointer" />
              ) : (
                <FaArrowLeftLong
                  className="text-[20px] cursor-pointer"
                  onClick={() => {
                    setShowIcon(false);
                    setSearchName("");
                  }}
                />
              )}
            </div>
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
          <div className="w-[100px] -mx-[100px] z-10">
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
      !medicineData.data.saltSuggestions ||
      (searchPerformed && medicineData.data.saltSuggestions.length === 0) ||
      !searchMed ? (
        <div className="w-full  mt-[200px]">
          {!showIcon ? (
            <h2 className="mx-auto w-1/2  text-center text-[#888888]">
              "Find your best medicine"
            </h2>
          ) : (
            <h2 className="mx-auto w-1/2  text-center text-[#888888]">
              "Sorry we did not find any results"
            </h2>
          )}
        </div>
      ) : showIcon && searchMed ? (
        <MedList MedData={medicineData.data.saltSuggestions} />
      ) : null}
    </div>
  );
}

export default SaltList;
