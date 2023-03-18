import React from "react";

export default function OutGoingCard() {
  return (
    <div className="flex flex-col p-[100px]">
      <div className="w-[628px] flex-col">
        <div className="text-[20px] font-bold mb-2">OutGoing from</div>
        <div className="border-t border-b py-2">
          <div className="flex justify-between mb-2">
            <div className="font-medium">
              Currently on the way to your bank account
            </div>
          </div>
          <div className="flex justify-between">
            <div>Funds on hold</div>
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <div className="font-semibold">Total</div>
          <div className="font-semibold">$0.00</div>
        </div>
      </div>
    </div>
  );
}
