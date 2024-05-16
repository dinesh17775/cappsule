import React from "react";
import Salt from "./Salt";

function MedList({ MedData }) {
  return (
    <section className="max mx-auto">
      {MedData &&
        MedData.map((item) => {
          return <Salt saltForms={item} />;
        })}
    </section>
  );
}

export default MedList;
