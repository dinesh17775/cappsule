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
    <div>
      <div>
        <div>
          <p>Form</p>
          {saltForms &&
            saltForms.available_forms.map((item) => {
              return (
                <div key={item}>
                  <button
                    onClick={handleItem}
                    className="px-4 py-2 bg-slate-500 my-2"
                  >
                    {item}
                  </button>
                </div>
              );
            })}
        </div>
        <div>
          <p>Strength</p>
          <div>
            {Object.entries(saltForms.salt_forms_json).map(([key, value]) => {
              return (
                <div key={key}>
                  <p>{key === displayStrength && key}</p>
                  {key === displayStrength &&
                    Object.keys(value).map((innerKey) => (
                      <div key={innerKey}>
                        <button
                          className="px-4 py-2 bg-slate-500 my-2"
                          onClick={handlepacking}
                        >
                          {innerKey}
                        </button>
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <p>Packing</p>
          <div>
            {Object.entries(saltForms.salt_forms_json).map(([key, value]) => {
              return (
                <div key={key}>
                  {key === displayStrength &&
                    Object.entries(value).map(([innerkey, innervalue]) => (
                      <div key={innerkey}>
                        {innerkey === displayPacking &&
                          Object.keys(innervalue).map((packingValue) => {
                            return (
                              <button
                                key={packingValue}
                                className="px-4 py-2 bg-slate-500 mx-2 my-2"
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
        <div>
          <h2>{saltForms.salt}</h2>
          <p>{saltForms.most_common.Form}</p>
          <p>{saltForms.most_common.Strength}</p>
          <p>{saltForms.most_common.Packing}</p>
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
  );
}

export default Salt;
