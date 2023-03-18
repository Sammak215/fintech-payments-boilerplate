import React from "react";
import InputUnderline from "elements/input-underline";

import { useMainContext } from "context/main";
import Button from "elements/Button";
import { BiRightArrowAlt } from "react-icons/bi";
import BankDetailCard from "elements/cards/bank-detail-card";
export default function BankDetails() {
  const { func, user } = useMainContext();
  const dummyBankArr = [
    "Chase",
    "Bank Of america",
    "wells fargo",
    "Chase",
    "Bank Of america",
    "wells fargo",
    "Chase",
    "Bank Of america",
    "wells fargo",
    "Chase",
    "Bank Of america",
    "wells fargo",
    "Chase",
    "Bank Of america",
    "wells fargo",
  ];
  console.log(user, "user");
  return (
    <div className="w-[520px] bg-[white] shadow border p-[20px]">
      <h1 className="text-[32px] font-medium leading-[40px] max-w-[420px]">
        Add your bank to receive payouts
      </h1>
      <p className="mt-[10px] text-[14px] max-w-[420px]">
        A payout is the transfer of funds from the app to your bank account.
        Link your account to seamlessly receive payouts and help us better
        understand your business.
      </p>

      <InputUnderline placeholder="Search" />

      <div className="grid grid-cols-3 gap-10 mt-[50px]">
        {user?.banks?.length === 0
          ? dummyBankArr.map((i, idx) => {
              return <BankDetailCard data={i} />;
            })
          : user?.banks.map((i) => {
              return (
                <>
                  <BankDetailCard data={i} />
                </>
              );
            })}
      </div>
      <p className="mt-[10px] text-[12px]">
        Linking your account will allow us to regularly receive, store and use
        your account data to assess your eligibility for financial services. By
        selecting your financial institution, you agree to our Terms and Privacy
        Policy. Learn more.
      </p>

      <Button
        // loading={state.loading}
        className="bg-[#635bff] flex items-center rounded-[10px] font-semibold text-[14px] w-full min-w-full mt-[20px]"
      >
        Continue
        <BiRightArrowAlt className="ml-1" size={18} />
      </Button>
    </div>
  );
}
