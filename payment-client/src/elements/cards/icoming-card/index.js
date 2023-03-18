import React from "react";

export default function IncomingCard() {
  return (
    <div className="flex flex-col p-[100px]">
      <div className="w-[628px] flex-col">
        <div className="text-[20px] font-bold mb-2">Incoming to </div>
        <div className="border-t border-b pt-2">
          <div className="flex flex-col justify-between mb-3 ">
            <div className="mb-2">Funds on hold</div>
            <div>
              These funds will start being paid out again once you have resolved
              the issue with your bank account above.
            </div>
          </div>
          <div className=" border-t py-3 flex items-center justify-between">
            <div className="font-semibold">Total for Jun 23 - Jun 30</div>
            <div className="font-semibold">$0.00</div>
          </div>
        </div>

        <div className="flex justify-between mt-2">
          <div className="font-semibold">Total overall</div>
          <div className="font-semibold">$0.00</div>
        </div>
      </div>
    </div>
  );
}
