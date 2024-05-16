import React, { useState } from "react";

function Salt({ saltForms }) {
  const [displayStrength, setDisplayStrength] = useState(
    saltForms.most_common.Form
  );
  const [displayPacking, setDisplayPacking] = useState(
    saltForms.most_common.Strength
  );
  const [quantity, setquantity] = useState("");
  const [pricing, setpricing] = useState(null);

  function handleItem(e) {
    setDisplayStrength(e.target.innerText);
  }

  function handlepacking(e) {
    setDisplayPacking(e.target.innerText);
  }

  function handlePricing(e) {
    setpricing(null);
    const clickedQuantity = e.target.innerText; // Store the clicked quantity
    setquantity(clickedQuantity); // Update the state with the clicked quantity

    let lowestPrice = null; // Initialize with null

    // Find the corresponding price based on the clicked quantity
    Object.entries(saltForms.salt_forms_json).forEach(([key, value]) => {
      if (key === displayStrength) {
        Object.entries(value).forEach(([innerkey, innervalue]) => {
          if (innerkey === displayPacking) {
            Object.entries(innervalue).forEach(([item, itemvalue]) => {
              if (clickedQuantity === String(item)) {
                Object.values(itemvalue).forEach((store) => {
                  // Check if store is defined and it has selling_price
                  if (store) {
                    const prices = store.map(
                      (availability) => availability.selling_price
                    );
                    const minPrice = Math.min(...prices);
                    if (lowestPrice === null || minPrice < lowestPrice) {
                      lowestPrice = minPrice;
                    }
                  }
                });
              }
            });
          }
        });
      }
    });

    if (lowestPrice !== null) {
      setpricing(lowestPrice);
    } else {
      console.log("No valid price found");
    }
  }

  return (
    <div className="max mx-auto ">
      <div className="w-3/4 border border-red-400 flex mx-auto justify-between items-center pl-[30px] py-7">
        <div className="border border-green-400">
          <div className="flex items-center">
            <p>Form :</p>
            {saltForms &&
              saltForms.available_forms.map((item) => {
                return (
                  <div key={item} className="flex items-center">
                    <button onClick={handleItem}>{item}</button>
                  </div>
                );
              })}
          </div>
          <div className="flex items-center">
            <p>Strength :</p>
            <div>
              {Object.entries(saltForms.salt_forms_json).map(([key, value]) => {
                return (
                  <div key={key} className="flex">
                    {key === displayStrength &&
                      Object.keys(value).map((innerKey) => (
                        <div key={innerKey}>
                          <button onClick={handlepacking}>{innerKey}</button>
                        </div>
                      ))}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <p>Packing :</p>
            <div>
              {Object.entries(saltForms.salt_forms_json).map(([key, value]) => {
                return (
                  <div key={key} className="">
                    {key === displayStrength &&
                      Object.entries(value).map(([innerkey, innervalue]) => (
                        <div key={innerkey} className="flex">
                          {innerkey === displayPacking &&
                            Object.keys(innervalue).map((packingValue) => {
                              return (
                                <button
                                  key={packingValue}
                                  onClick={handlePricing}
                                  id="pack"
                                >
                                  {packingValue}
                                </button>
                              );
                            })}
                        </div>
                      ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col border border-red-400 text-center">
            <h2 className="font-semibold">{saltForms.salt}</h2>
            <div className="flex my-2 border border-red-400 justify-center">
              <p className="px-[2px] font-medium text-[#2a527a] text-xs">
                {saltForms.most_common.Form}
              </p>
              <p className="px-[2px] font-medium text-[#2a527a] text-xs">
                | {saltForms.most_common.Strength}
              </p>
              <p className="px-[2px] font-medium text-[#2a527a] text-xs">
                | {saltForms.most_common.Packing}
              </p>
            </div>
          </div>
        </div>
        <div>
          {saltForms && pricing ? (
            <h2>From:{pricing}</h2>
          ) : (
            <h2>No store is available</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default Salt;
