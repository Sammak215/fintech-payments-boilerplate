import React from "react";

export default function BankDetailCard({ data }) {
  //   console.log(data, "data in banks");
  const { bankID, Currency } = data;
  return (
    <div className="border cursor-pointer shadow hover:border-gray-400 h-[70px] rounded-[10px] p-[12px] flex justify-center items-center">
      {Currency ? Currency : data}
    </div>
  );
}
