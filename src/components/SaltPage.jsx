import React, { useState } from "react";

function SaltPage({ saltForms }) {
  const [displayStrength, setDisplayStrength] = useState(
    saltForms.most_common.Form
  );
  const [displayPacking, setDisplayPacking] = useState(
    Object.keys(saltForms.salt_forms_json[displayStrength])[0] // Set initial value to the first packaging option
  );
  const [quantity, setQuantity] = useState(saltForms.most_common.Packing);
  const [pricing, setPricing] = useState(null);
  const [showMore, setShowMore] = useState(4);
  const [showStrengthMore, setShowStrengthMore] = useState(4);
  const [showHide, setShowHide] = useState(false);
  const [showStrengthHide, setShowStrengthHide] = useState(false);
  const [showPackingMore, setShowPackingMore] = useState(4);
  const [showPackingHide, setShowPackingHide] = useState(false);

  const [itemPrice, setItemPrice] = useState([]);

  function handleItem(e) {
    setDisplayStrength(e.target.innerText);
  }

  function handlePacking(e) {
    setDisplayPacking(e.target.innerText);
  }

  function handlePricing(e) {
    setPricing(null);
    const clickedQuantity = e.target.innerText;
    setQuantity(clickedQuantity);

    let lowestPrice = null;

    Object.entries(saltForms.salt_forms_json).forEach(([key, value]) => {
      if (key === displayStrength) {
        Object.entries(value).forEach(([innerkey, innervalue]) => {
          if (innerkey === displayPacking) {
            Object.entries(innervalue).forEach(([item, itemvalue]) => {
              if (clickedQuantity === String(item)) {
                Object.values(itemvalue).forEach((store) => {
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
      <div className="w-[80%]  flex mx-auto justify-between items-center p-5 bg-gradient-to-r from-[#FFFFFF] to-[#D5E7E6] gap-2 my-4 shadow-lg">
        <div className="  flex flex-col gap-2">
          <div className="flex items-start">
            <p className="w-[86px]">Form :</p>
            <div className="w-[200px] flex flex-wrap gap-2">
              {saltForms &&
                saltForms.available_forms &&
                saltForms.available_forms.slice(0, showMore).map((item) => {
                  return (
                    <div key={item} className="flex items-center">
                      <button
                        onClick={handleItem}
                        className={`px-[10px] py-[3px] border border-[#112D31] rounded-lg text-xs shadow-md ${
                          displayStrength === item
                            ? "ring-2 ring-[#00C5A166] ring-opacity-30"
                            : ""
                        }`}
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
                      : "hidden"
                  }`}
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
                  className={`${
                    saltForms &&
                    saltForms.available_forms &&
                    saltForms.available_forms.length >= 4 &&
                    showHide
                      ? "block"
                      : "hidden"
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
          <div className="flex items-start">
            <p className="w-[86px]">Strength :</p>
            <div>
              {Object.entries(saltForms.salt_forms_json).map(([key, value]) => {
                return (
                  <div
                    key={key}
                    className="flex flex-wrap gap-2 w-[300px]"
                    id="strength"
                  >
                    {key === displayStrength &&
                      Object.keys(value)
                        .slice(0, showStrengthMore)
                        .map((innerKey) => (
                          <div key={innerKey}>
                            <button
                              onClick={handlePacking}
                              className={`px-[10px] py-[3px] border border-[#112D31] rounded-lg text-xs ${
                                displayPacking === innerKey
                                  ? "ring-2 ring-[#00C5A166] ring-opacity-30"
                                  : ""
                              }`}
                            >
                              {innerKey}
                            </button>
                          </div>
                        ))}
                  </div>
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
                      .length >= 4
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
                      .length >= 4 &&
                    showStrengthHide
                      ? "block"
                      : "hidden"
                  }`}
                  onClick={() => {
                    setShowStrengthMore(4);
                    setShowStrengthHide(!showStrengthHide);
                  }}
                >
                  Hide
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-start">
            <p className="w-[86px]">Packaging :</p>
            <div>
              {Object.entries(saltForms.salt_forms_json).map(([key, value]) => {
                return (
                  <div key={key}>
                    {key === displayStrength &&
                      Object.entries(value).map(([innerkey, innervalue]) => (
                        <div
                          key={innerkey}
                          className="flex flex-wrap w-[200px] gap-2"
                        >
                          {innerkey === displayPacking &&
                            Object.keys(innervalue)
                              .slice(0, showPackingMore)
                              .map((packingValue) => {
                                return (
                                  <button
                                    key={packingValue}
                                    onClick={handlePricing}
                                    id="pack"
                                    className={`${
                                      saltForms &&
                                      packingValue === quantity &&
                                      pricing
                                        ? "border border-[#112D31] ring-2 ring-[#00C5A166] ring-opacity-30"
                                        : "border border-dashed border-black"
                                    } px-[10px] py-[3px] rounded-lg text-xs ${
                                      packingValue === quantity
                                        ? "ring-2 ring-[#00C5A166] ring-opacity-30"
                                        : ""
                                    }`}
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
                    ).length >= 4
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
                    ).length >= 4 &&
                    showPackingHide
                      ? "block"
                      : "hidden"
                  }`}
                  onClick={() => {
                    setShowPackingMore(4);
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
          <div className="flex flex-col  text-center w-[250px]  text-wrap">
            <h2 className="font-semibold flex flex-col  w-full h-full break-words">
              {saltForms.salt}
            </h2>
            <div className="flex my-2   w-full flex-wrap justify-center">
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
            <h2 className="font-bold">From ₹{pricing}</h2>
          ) : (
            <div className="w-[200px] h-[59px] border border-solid border-[#A7D6D4] bg-white text-center rounded-md py-1">
              <h2>No stores selling this product near you</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SaltPage;
