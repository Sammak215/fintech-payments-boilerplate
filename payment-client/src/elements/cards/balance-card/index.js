import { useState, useEffect } from "react";
import { useMainContext } from "context/main";
import API from "endpoint";
import { async } from "@firebase/util";

export default function BalanceCard() {
  const { user, ctx } = useMainContext();
  const [balances, setBalances] = useState();

  console.log(ctx);

  useEffect(() => {
    getBalances();
  }, [ctx]);

  const getBalances = async () => {
    try {
      const { data } = await API.get("/balances");
      if (data) {
        const find = data.find((i) => i._id === ctx.user.balance);
        if (find) {
          setBalances(find.available[0].amount);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col p-[100px]">
      <div className="w-[628px] flex-col">
        <div className="text-[20px] font-bold mb-2">USD Balance </div>
        <div className="border-t border-b py-2">
          <div className="flex flex-col justify-between mb-2">
            <div className="mb-2 flex items-center justify-between">
              <div>Currently on the way to your bank account</div>
              <div className="">${balances ? balances : 0}</div>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <div>These funds should arrive in your bank account soon.</div>
              <div className="">$0.00</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <div className="font-semibold">Total</div>
          <div className="">${balances ? balances : 0}</div>
        </div>
      </div>
    </div>
  );
}
