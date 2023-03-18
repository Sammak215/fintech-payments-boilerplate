import { useMainContext } from "context/main";
import API from "endpoint";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Banks({ banks }) {
  const [banksData, setBanksData] = useState({
    loading: true,
    data: false,
  });
  const [addedbank, setAddedBank] = useState(false);
  const [accoutnNumber, setAccoutnNumber] = useState("");
  const { ctx } = useMainContext();
  const router = useRouter();

  console.log(ctx);

  const getBanks = async () => {
    try {
      const { data } = await API.get("/bankAccounts");
      setBanksData({
        loading: false,
        data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBanks();
  }, [addedbank]);

  const handleBank = async (id) => {
    try {
      await API.put(`/users/${ctx.user.uid}`, {
        banks: {
          bankID: id,
          accoutnNumber,
        },
      });
      setAddedBank(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-white p-5 rounded-[6px] shadow">
      <div className="flex items-center justify-center">
        {banksData.loading ? (
          "Loading"
        ) : (
          <>
            {banks && banks.length ? (
              <>
                {banks.map((el) => {
                  const findBank = banksData.data.find(
                    (ff) => ff._id === el.bankID
                  );

                  return (
                    <div key={el.bankID} className="text-center">
                      <div className="mb-3 font-semibold text-lg">
                        {findBank.name}
                      </div>
                      <div>{el.Currency}</div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="text-center flex items-cener justify-center flex-col">
                <h2 className="mb-5">Choose a bank</h2>

                <input
                  type="text"
                  className="block w-full mb-5 text-sm p-1 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                  placeholder="Account Number"
                  value={accoutnNumber}
                  onChange={(e) => setAccoutnNumber(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-5 ">
                  {banksData.data.map((el) => {
                    return (
                      <div
                        key={el._id}
                        onClick={() => handleBank(el._id)}
                        className="text-sm flex justify-center items-center py-1 px-3  rounded border text-black bg-white hover:bg-green-200 cursor-pointer"
                      >
                        {el.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
