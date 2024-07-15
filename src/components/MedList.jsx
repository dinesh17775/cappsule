import React from "react";
import SaltPage from "./SaltPage";

function MedList({ MedData }) {
  return (
    <section className="max mx-auto">
      {MedData &&
        MedData.map((item) => {
          return <SaltPage saltForms={item} key={item.id} />;
        })}
    </section>
  );
}

export default MedList;
