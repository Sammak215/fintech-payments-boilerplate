import { useState, useRef, useEffect } from "react";
import { useMainContext } from "context/main";
import Spinner from "react-spinners/SyncLoader";
import Link from "next/link";
import Button from "elements/Button";
import InputUnderline from "elements/input-underline";
import { BiError } from "react-icons/bi";
import Page from "layout/page";
import { motion } from "framer-motion";

const initState = { email: "", first_name: "", last_name: "", password: "" };

export default function Signup({}) {
  const { func, authLoading, error, animateForm } = useMainContext();

  const [state, setState] = useState(initState);
  // const [error, seterror] = useState({
  //   errorEmail: "",
  //   errorFirstName: "",
  //   errorLastName: "",
  //   errorCountry: "",
  //   errorPassword: "",
  // });
  // const [animateForm, setanimateForm] = useState(false);

  //  refs
  let emailInput = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });

    try {
      func.createNewUser(state);
    } catch (error) {
      console.log(error.message);
    }
    // }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    // if (name === 'email') {
    //   let re =
    //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //   if (value.length < 3) {
    //     // setState({ ...state, error: { errorMsg: "Length is too short" } });
    //     seterror({ ...error, errorMsg: 'Length is too short' });
    //   } else if (re.test(value)) {
    //     // this is a valid email address
    //     // call setState({email: email}) to update the email
    //     // or update the data in redux store.
    //     seterror({ ...error, errorMsg: '' });
    //   } else {
    //     seterror({ ...error, errorMsg: 'Email is not valid' });

    //     // invalid email, maybe show an error to the user.
    //   }
    // } else {
    //   seterror({ ...error, errorMsg: '' });
    // }

    setState({
      ...state,
      [name]: value,
    });
  };

  // useEffect(() => {
  //   console.log(error, "error");
  //   console.log(state, "state");
  // }, [error]);

  return (
    <Page noFooter noHeader>
      <section className="h-screen">
        <div className="flex justify-center items-center h-full  bg-whit">
          {/* px-4 py-5 */}
          <motion.div
            // transition={{
            //   type: "spring",
            //   stiffness: 100,
            //   damping: 10,
            // }}
            // animate={{
            //   x: animateForm ? [-10, 15, 10, 5, 0] : "0px",
            // }}
            className="p-[50px] border shadow-lg"
          >
            <div className="text-left p-0 font-sans">
              <h1 className=" text-gray-800 text-3xl font-medium">
                Create an account for free
              </h1>
              <h3 className="p-1 text-gray-700">
                Free forever. No payment needed.
              </h3>
            </div>
            <form action="#" className="p-0" onSubmit={onSubmit}>
              <div className="mt-5">
                <label htmlFor="email" className="sc-bqyKva ePvcBv font-medium">
                  Email
                </label>
                {/* <input
                type="email"
                className="block w-full mt-[12px] p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                placeholder="Email"
                value={state.email}
                name="email"
                onChange={handleChange}
                ref={emailInput}
                onMouseOut={() => handleMouseOut(emailInput.current)}
              /> */}
                <InputUnderline
                  type="email"
                  className="block w-full mt-[12px] p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                  placeholder="Email"
                  value={state.email}
                  name="email"
                  onChange={handleChange}

                  // ref={emailInput}
                />
                {error.signUpEmail && <AlertMsg msg={error.signUpEmail} />}
              </div>
              <div className="mt-5">
                <label htmlFor="email" className="sc-bqyKva ePvcBv font-medium">
                  First Name
                </label>
                {/* <input
                onChange={handleChange}
                type="text"
                className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                placeholder="First Name"
                value={state.first_name}
                name="first_name"
              /> */}
                <InputUnderline
                  onChange={handleChange}
                  type="text"
                  className="block w-full p-2 border  border-gray-300  "
                  placeholder="First Name"
                  value={state.first_name}
                  name="first_name"
                />
                {error.errorFirstName && (
                  <AlertMsg msg={error.errorFirstName} />
                )}
              </div>
              <div className="mt-5">
                <label htmlFor="email" className="sc-bqyKva ePvcBv font-medium">
                  Last Name
                </label>

                {/* <input
                onChange={handleChange}
                type="text"
                className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent  "
                placeholder="Last Name"
                value={state.last_name}
                name="last_name"
              /> */}
                <InputUnderline
                  onChange={handleChange}
                  type="text"
                  className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent  "
                  placeholder="Last Name"
                  value={state.last_name}
                  name="last_name"
                />
                {error.errorLastName && <AlertMsg msg={error.errorLastName} />}
              </div>

              <div className="mt-5">
                <label
                  htmlFor="password"
                  className="sc-bqyKva ePvcBv font-medium"
                >
                  Password
                </label>

                {/* <input
                onChange={handleChange}
                type="password"
                className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent  "
                placeholder="Last Name"
                value={state.password}
                name="password"
              /> */}
                <InputUnderline
                  onChange={handleChange}
                  type="password"
                  className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent  "
                  placeholder="Password"
                  value={state.password}
                  name="password"
                />
                {error.signPassword && <AlertMsg msg={error.signPassword} />}
              </div>

              <div className="mt-10">
                {/* <button
                disabled={authLoading}
                className="py-3 bg-green-500 text-white w-full rounded hover:bg-green-600"
                type="submit"
              >
                {authLoading ? <Spinner color="#fff" size={10} /> : "Sign up"}
              </button> */}
                <Button
                  // disabled2
                  className="bg-[#635bff] min-h-[44px] rounded-[4px] w-full min-w-full"
                >
                  {authLoading ? <Spinner color="#fff" size={5} /> : "Submit"}
                </Button>
              </div>
            </form>
            <Link href="/login">
              <span className="block  p-5 text-center text-gray-600  text-xs ">
                Have an account? <a href="/login"> Login </a>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </Page>
  );
}

const AlertMsg = ({ msg }) => {
  return (
    <div className="text-[red] text-[12px] flex items-center mt-2">
      <BiError />
      <div className="ml-1">{msg}</div>
    </div>
  );
};
