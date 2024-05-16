import React, { useState } from "react";

function Salt({ saltForms }) {
  const [displayStrength, setDisplayStrength] = useState(
    saltForms.most_common.Form
  );
  const [displayPacking, setDisplayPacking] = useState(
    saltForms.most_common.Strength
  );
  const [quantity, setQuantity] = useState("");
  const [pricing, setPricing] = useState(null);
  const [showMore, setShowMore] = useState(4);
  const [showStrengthMore, setShowStrengthMore] = useState(6);
  const [showHide, setShowHide] = useState(false);
  const [showStrengthHide, setShowStrengthHide] = useState(false);
  const [showPackingMore, setShowPackingMore] = useState(6);
  const [showPackingHide, setShowPackingHide] = useState(false);

  function handleItem(e) {
    setDisplayStrength(e.target.innerText);
  }

  function handlePacking(e) {
    setDisplayPacking(e.target.innerText);
  }

  function handlePricing(e) {
    setPricing(null);
    const clickedQuantity = e.target.innerText; // Store the clicked quantity
    setQuantity(clickedQuantity); // Update the state with the clicked quantity

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
      setPricing(lowestPrice);
    } else {
      console.log("No valid price found");
    }
  }
  return (
    <div className="max mx-auto">
      <div className="w-3/4 border border-red-400 flex mx-auto justify-between items-center pl-[20px] py-5">
        <div className="border border-green-400">
          <div className="flex items-center">
            <p>Form :</p>
            <div className="grid grid-cols-2 gap-2">
              {saltForms &&
                saltForms.available_forms &&
                saltForms.available_forms.slice(0, showMore).map((item) => {
                  return (
                    <div
                      key={item}
                      className="flex items-center border border-red-500"
                    >
                      <button
                        onClick={handleItem}
                        className="px-[10px] py-[3px] my-1 border border-[#112D31] rounded-lg text-xs"
                      >
                        {item}
                      </button>
                    </div>
                  );
                })}
              <div>
                <button
                  type="button"
                  className={`${!showHide ? "block" : "hidden"} ${
                    saltForms &&
                    saltForms.available_forms &&
                    saltForms.available_forms.length >= 4
                      ? "block"
                      : " hidden"
                  } `}
                  onClick={() => {
                    setShowMore(
                      saltForms && saltForms.available_forms
                        ? saltForms.available_forms.length
                        : 0
                    );
                    setShowHide(!showHide);
                  }}
                >
                  More
                </button>
                <button
                  type="button"
                  className={` ${
                    saltForms &&
                    saltForms.available_forms &&
                    saltForms.available_forms.length >= 4 &&
                    showHide
                      ? "block"
                      : " hidden"
                  }`}
                  onClick={() => {
                    setShowMore(4);
                    setShowHide(!showHide);
                  }}
                >
                  hide
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <p>Strength :</p>
            <div>
              {Object.entries(saltForms.salt_forms_json).map(([key, value]) => {
                return (
                  <>
                    <div
                      key={key}
                      className="grid grid-cols-3  gap-2"
                      id="strength"
                    >
                      {key === displayStrength &&
                        Object.keys(value)
                          .slice(0, showStrengthMore)
                          .map((innerKey) => (
                            <div key={innerKey}>
                              <button
                                onClick={handlePacking}
                                className="px-[10px] py-[3px] mx-1 border border-[#112D31] rounded-lg text-xs"
                              >
                                {innerKey}
                              </button>
                            </div>
                          ))}
                    </div>
                  </>
                );
              })}
              <div>
                <button
                  type="button"
                  className={`${!showStrengthHide ? "block" : "hidden"} ${
                    saltForms &&
                    saltForms.salt_forms_json &&
                    saltForms.salt_forms_json[displayStrength] &&
                    Object.keys(saltForms.salt_forms_json[displayStrength])
                      .length >= 6
                      ? "block"
                      : "hidden"
                  }`}
                  onClick={() => {
                    setShowStrengthMore(
                      saltForms &&
                        saltForms.salt_forms_json &&
                        saltForms.salt_forms_json[displayStrength]
                        ? Object.keys(
                            saltForms.salt_forms_json[displayStrength]
                          ).length
                        : 0
                    );
                    setShowStrengthHide(!showStrengthHide);
                  }}
                >
                  More
                </button>
                <button
                  type="button"
                  className={`${
                    saltForms &&
                    saltForms.salt_forms_json &&
                    saltForms.salt_forms_json[displayStrength] &&
                    Object.keys(saltForms.salt_forms_json[displayStrength])
                      .length >= 6 &&
                    showStrengthHide
                      ? "block"
                      : "hidden"
                  }`}
                  onClick={() => {
                    setShowStrengthMore(6);
                    setShowStrengthHide(!showStrengthHide);
                  }}
                >
                  Hide
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <p>Packing :</p>
            <div>
              {Object.entries(saltForms.salt_forms_json).map(([key, value]) => {
                return (
                  <div key={key}>
                    {key === displayStrength &&
                      Object.entries(value).map(([innerkey, innervalue]) => (
                        <div key={innerkey} className="grid grid-cols-3">
                          {innerkey === displayPacking &&
                            Object.keys(innervalue)
                              .slice(0, showPackingMore)
                              .map((packingValue) => {
                                return (
                                  <button
                                    key={packingValue}
                                    onClick={handlePricing}
                                    id="pack"
                                    className="px-[10px] py-[3px] mx-1 border border-[#112D31] rounded-lg text-xs my-1"
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
              <div>
                <button
                  type="button"
                  className={`${!showPackingHide ? "block" : "hidden"} ${
                    saltForms &&
                    saltForms.salt_forms_json &&
                    saltForms.salt_forms_json[displayStrength] &&
                    saltForms.salt_forms_json[displayStrength][
                      displayPacking
                    ] &&
                    Object.keys(
                      saltForms.salt_forms_json[displayStrength][displayPacking]
                    ).length > 6
                      ? "block"
                      : "hidden"
                  }`}
                  onClick={() => {
                    setShowPackingMore(
                      saltForms &&
                        saltForms.salt_forms_json &&
                        saltForms.salt_forms_json[displayStrength] &&
                        saltForms.salt_forms_json[displayStrength][
                          displayPacking
                        ]
                        ? Object.keys(
                            saltForms.salt_forms_json[displayStrength][
                              displayPacking
                            ]
                          ).length
                        : 0
                    );
                    setShowPackingHide(!showPackingHide);
                  }}
                >
                  More
                </button>
                <button
                  type="button"
                  className={`${
                    saltForms &&
                    saltForms.salt_forms_json &&
                    saltForms.salt_forms_json[displayStrength] &&
                    saltForms.salt_forms_json[displayStrength][
                      displayPacking
                    ] &&
                    Object.keys(
                      saltForms.salt_forms_json[displayStrength][displayPacking]
                    ).length > 6 &&
                    showPackingHide
                      ? "block"
                      : "hidden"
                  }`}
                  onClick={() => {
                    setShowPackingMore(6);
                    setShowPackingHide(!showPackingHide);
                  }}
                >
                  Hide
                </button>
              </div>
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
