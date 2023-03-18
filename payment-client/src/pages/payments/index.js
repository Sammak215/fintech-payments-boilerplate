import axios from "axios";
import { useState, useEffect } from "react";
import Page from "layout/page-auth";
import { BsCurrencyDollar } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { isValidCreditCardNumber } from "functions/card-checker";
import { Button, Modal, Table, Select } from "antd";
import { useMainContext } from "context/main";
import API from "endpoint";
const { Option } = Select;

import moment from "moment";

export default function Home() {
  const { user } = useMainContext();
  console.log(user);

  const [state, setState] = useState({
    user_id: "",
    amount: 0,
    currency: "",
    customer: "",
    source: "",
    description: "",
    receipt_email: "",
    card_number: "",
  });
  const [userData, setUser] = useState();
  const [userloading, setUserLoading] = useState(false);
  const [paymentsdata, setPaymentsData] = useState();
  const [paymentsloading, setPaymentLoading] = useState();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [created, setCreated] = useState("");

  const columns = [
    {
      title: "customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "paid",
      dataIndex: "paid",
      key: "paid",
      render: (text) => <div>{text ? "Success" : "Fail"}</div>,
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <div>{moment(text).fromNow()}</div>,
    },
  ];

  useEffect(() => {
    setState({ ...state, user_id: user.uid });
  }, [user]);

  useEffect(() => {
    fetchData();
    fetchUsers();
  }, []);

  const fetchData = async () => {
    setPaymentLoading(true);

    const { data } = await API.get("/payments");
    if (data) {
      setPaymentsData(data);
    }
    setPaymentLoading(false);
  };

  const fetchUsers = async () => {
    setUserLoading(true);

    const { data } = await API.get("/users");
    if (data) {
      setUser(data);
    }
    setUserLoading(false);
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("currentUser", user);

      if (user.uid) {
        const cardok = isValidCreditCardNumber(state.card_number);

        if (cardok.status) {
          if (user.uid) {
            const data = await API.post("/payments", state);

            console.log("data", data);

            setCreated(data.success);
          }

          setLoading(false);
        } else {
          setCreated(cardok.error);
          setLoading(false);
        }
      }
    } catch (e) {
      console.log(e.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    console.log(value, name);

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleChange = (value) => {
    // console.log(`selected ${value}`);

    setState({ ...state, customer: value });
  };

  const showModal = () => {
    console.log("work");
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Page>
      <section className="container mx-auto">
        <Button onClick={showModal}>Create Payment</Button>
        <div className="mt-2">
          {paymentsloading ? (
            <div>Loading....</div>
          ) : (
            <Table columns={columns} dataSource={paymentsdata} />
          )}
        </div>

        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {created && (
            <div
              className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <svg
                    className="fill-current h-6 w-6 text-teal-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">{created}</p>
                </div>
              </div>
            </div>
          )}

          <div className="md:flex ">
            <form className="w-full p-4 px-5 py-5" onSubmit={onSubmit}>
              <div className="flex flex-row">
                <h2 className="text-3xl font-semibold mr-2">
                  Create A Payment
                </h2>
                {/* <h2 className="text-3xl text-green-400 font-semibold">
                    $100
                  </h2> */}
              </div>

              {/* <input
                type="customer"
                name="customer"
                className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                placeholder="Full Name"
                onChange={handleInputChange}
                value={state.name}
              /> */}
              <label className="relative w-full flex flex-col">
                <input
                  className="rounded h-10 w-full focus:outline-none focus:border-green-200 mt-2 text-sm  peer pl-12 pr-2 py-2 border"
                  type="text"
                  name="amount"
                  placeholder="Amount"
                  onChange={handleInputChange}
                  value={state.amount}
                />

                <BsCurrencyDollar className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" />
              </label>
              <label className="relative flex-1 flex flex-col">
                <div className="rounded h-10 w-full focus:outline-none focus:border-green-200 mt-2 text-sm  peer pl-12 pr-2 py-2 border">
                  <Select
                    defaultValue=""
                    name="customer"
                    style={{
                      width: "100%",
                    }}
                    bordered={false}
                    onChange={handleChange}
                  >
                    {userData?.map((i) => {
                      return <Option value={i._id}>{i.email}</Option>;
                    })}
                  </Select>
                </div>

                {/* <input
                  className="rounded h-10 w-full focus:outline-none focus:border-green-200 mt-2 text-sm  peer pl-12 pr-2 py-2 border"
                  type="text"
                  name="customer"
                  placeholder="Customer"
                  onChange={handleInputChange}
                  value={state.customer}
                /> */}
                <FiUser className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" />
              </label>
              <label className="relative flex-1 flex flex-col">
                <input
                  className="rounded h-10 w-full focus:outline-none focus:border-green-200 mt-2 text-sm  peer pl-12 pr-2 py-2 border"
                  type="text"
                  name="description"
                  placeholder="Description"
                  onChange={handleInputChange}
                  value={state.description}
                />
                <FiUser className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" />
              </label>
              <label className="relative w-full flex flex-col">
                <input
                  className="rounded h-10 w-full focus:outline-none focus:border-green-200 mt-2 text-sm  peer pl-12 pr-2 py-2 border"
                  type="text"
                  name="card_number"
                  placeholder="0000 0000 0000"
                  onChange={handleInputChange}
                  value={state.card_number}
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
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
                  onChange={handleInputChange}
                  value={state.exp_month}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
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
                  onChange={handleInputChange}
                  value={state.cvc}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
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
                  {loading ? "Loading..." : "Pay"}
                </button>{" "}
              </div>
            </form>
          </div>
        </Modal>
      </section>
    </Page>
  );
}
