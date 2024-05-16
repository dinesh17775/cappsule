import React from "react";
import Salt from "./Salt";

function MedList({ MedData }) {
  return (
    <div>
      {MedData &&
        MedData.map((item) => {
          return <Salt saltForms={item} />;
        })}
    </div>
  );
}

export default MedList;
