import { useState, useEffect } from 'react';
import { isValidCreditCardNumber } from 'functions/card-checker';
import Page from 'layout/page-auth';
import API from 'endpoint';
import moment from 'moment';
import { useMainContext } from 'context/main';

export default function CardHome() {
  const { user } = useMainContext();

  const [state, setState] = useState({
    user_id: '',
    card_number: '',
    exp_month: '',
    exp_year: '',
    cvc: '',
    name: '',
    address_line1: '',
    address_line2: '',
    address_city: '',
    address_state: '',
    address_zip: '',
    address_country: '',
    brand: '',
  });

  const [created, setCreated] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const cardok = isValidCreditCardNumber(state.card_number);

      if (cardok.status) {
        const { data } = await API.post('/cards', {
          ...state,
          brand: cardok.brand,
          user_id: user.uid,
        });

        setCreated(data.card);
      } else {
        setCreated(cardok.error);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleChage = (e) => {
    const { value, name } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <Page>
      <section className="container mx-auto">
        <GetAllCards />

        <div className="py-12">
          <div className="max-w-md bg-white shadow-lg rounded-lg md:max-w-xl mx-auto">
            {created && (
              <div
                className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                role="alert">
                <div className="flex">
                  <div className="py-1">
                    <svg
                      className="fill-current h-6 w-6 text-teal-500 mr-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20">
                      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold">{created}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="md:flex">
              <form className="w-full p-4 px-5 py-5" onSubmit={onSubmit}>
                <div className="flex flex-row">
                  <h2 className="text-3xl font-semibold">Card</h2>
                  <h2 className="text-3xl text-green-400 font-semibold"></h2>
                </div>
                <div className="flex flex-row text-xs pt-6 pb-5">
                  <span className="font-bold">Information</span>{' '}
                  <small className="text-gray-400 ml-1"></small>{' '}
                  <span className="text-gray-400 ml-1">Shopping</span>{' '}
                  <small className="text-gray-400 ml-1"></small>{' '}
                  <span className="text-gray-400 ml-1">Payment</span>{' '}
                </div>{' '}
                <span>Customer Information</span>
                <span>Shipping Address</span>
                <div className="grid md:grid-cols-2 md:gap-2">
                  <input
                    type="text"
                    name="exp_year"
                    className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                    placeholder="exp_year"
                    onChange={handleChage}
                    value={state.exp_year}
                  />{' '}
                </div>
                <input
                  type="name"
                  name="name"
                  className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                  placeholder="name"
                  onChange={handleChage}
                  value={state.name}
                />
                <div className="grid md:grid-cols-3 md:gap-2">
                  <input
                    type="address_line1"
                    name="address_line1"
                    className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                    placeholder="address_line1"
                    onChange={handleChage}
                    value={state.address_line1}
                  />{' '}
                  <input
                    type="address_line2"
                    name="address_line2"
                    className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                    placeholder="address_line2"
                    onChange={handleChage}
                    value={state.address_line2}
                  />{' '}
                  <input
                    type="address_city"
                    name="address_city"
                    className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                    placeholder="address_city"
                    onChange={handleChage}
                    value={state.address_city}
                  />{' '}
                </div>{' '}
                <input
                  type="address_state"
                  name="address_state"
                  className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                  placeholder="address_state"
                  onChange={handleChage}
                  value={state.address_state}
                />
                <input
                  type="address_zip"
                  name="address_zip"
                  className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                  placeholder="address_zip Number"
                  onChange={handleChage}
                  value={state.address_zip}
                />
                <label className="relative w-full flex flex-col">
                  <input
                    className="rounded h-10 w-full focus:outline-none focus:border-green-200 mt-2 text-sm  peer pl-12 pr-2 py-2 border"
                    type="text"
                    name="card_number"
                    placeholder="0000 0000 0000"
                    onChange={handleChage}
                    value={state.card_number}
                  />

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </label>
                <label className="relative flex-1 flex flex-col">
                  <input
                    className="rounded h-10 w-full focus:outline-none focus:border-green-200 mt-2 text-sm  peer pl-12 pr-2 py-2 border"
                    type="text"
                    name="exp_month"
                    placeholder="MM/YY"
                    onChange={handleChage}
                    value={state.exp_month}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </label>
                <label className="relative flex-1 flex flex-col">
                  <input
                    className="rounded h-10 w-full focus:outline-none focus:border-green-200 mt-2 text-sm  peer pl-12 pr-2 py-2 border"
                    type="text"
                    name="cvc"
                    placeholder="cvc"
                    onChange={handleChage}
                    value={state.cvc}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </label>
                <div className="flex justify-between items-center pt-2 mt-[20px]">
                  <button className="h-12 w-full rounded font-medium text-xs bg-blue-500 text-white">
                    Submit
                  </button>{' '}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}

const GetAllCards = ({}) => {
  const { user } = useMainContext();

  const [state, setState] = useState({ loading: true, data: [] });

  const getData = async () => {
    try {
      const { data } = await API.get(`/cards?userID=${user.uid}`);

      setState({
        ...state,
        data,
        loading: false,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {state.loading ? (
        <Loading />
      ) : (
        state.data.map((el, index) => {
          return (
            <div
              key={index}
              className="border border-gray-40 lg:border-gray-400 bg-white rounded-b p-4 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="text-gray-900 font-bold text-xl mb-2">{el.name}</div>
                  <p className="text-gray-700 text-base"> {el.brand}</p>
                </div>
                <p className="text-gray-700 text-base">0000 0000 0000 0000</p>
                <p className="text-gray-700 text-base">---- ---- ---- csv</p>
                <p className="text-gray-700 text-base">
                  {el.address_city && `City ${el.address_city},`}{' '}
                  {el.address_country && `Country ${el.address_country},`}{' '}
                  {`Address line1 ${el.address_line1},`} {`Address line2 ${el.address_line2},`}
                  {`State ${el.address_state},`} {`zip ${el.address_zip}`}
                </p>

                <p className="text-gray-700 text-base">
                  exp month {moment(el.exp_month).format('MM/DD')}
                </p>
                <p className="text-gray-700 text-base">
                  exp year {moment(el.exp_year).format('MM/YYYY')}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

const Loading = () => {
  return <div>Loading...</div>;
};
