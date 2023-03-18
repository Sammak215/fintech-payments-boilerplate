import { useState, useRef, useEffect } from "react";
import { useMainContext } from "context/main";
import Spinner from "react-spinners/SyncLoader";
import Link from "next/link";
import InputUnderline from "elements/input-underline";
import Button from "elements/Button";
import { motion } from "framer-motion";
import { BiError } from "react-icons/bi";

const initState = {
  email: "",
  password: "",
  loading: false,
};

export default function LoginForm() {
  const { func, authLoading, animateForm, error, setanimateForm } =
    useMainContext();
  // const [error, seterror] = useState({
  //   errorEmail: "",
  //   errorPassword: "",
  // });
  const [state, setState] = useState(initState);
  // const [animateForm, setanimateForm] = useState(false);
  const inputReference = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });
    // let re =
    //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // setInterval(() => {
    //   setanimateForm(false);
    // }, 1000);

    // if (state.email === "") {
    //   setState({ ...state, loading: false });
    //   setanimateForm(true);

    //   seterror({ ...error, errorEmail: "Please enter your email" });
    // } else if (!re.test(state.email)) {
    //   setState({ ...state, loading: false });
    //   setanimateForm(true);

    //   seterror({
    //     ...error,
    //     errorEmail: `Invalid email address:${state.email}`,
    //   });
    // } else if (state.password === "") {
    //   setState({ ...state, loading: false });
    //   setanimateForm(true);

    //   seterror({
    //     ...error,
    //     errorPassword: `Incorrect email or password`,
    //   });
    // } else {
    //   seterror({ ...error, errorEmail: "", errorPassword: "" });
    try {
      func.login(state);
    } catch (error) {
      console.log(error.message);
    }
    // }
    // try {
    //   func.login(state);
    // } catch (error) {
    //   console.log(error.message);
    // }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(error, "error");
  }, [error]);

  return (
    <section className="h-screen">
      <div className="flex justify-center items-center h-full  bg-white">
        <motion.div
          // transition={{
          //   type: 'spring',
          //   stiffness: 100,
          //   damping: 10,
          // }}
          // animate={{
          //   x: animateForm ? [-10, 15, 10, 5, 0] : '0px',
          // }}
          className="p-[50px] border shadow-lg"
        >
          <div className="text-left p-0 font-sans">
            <h1 className=" text-gray-800 text-3xl font-medium">
              Login into your account
            </h1>
          </div>
          <form action="#" className="p-0" onSubmit={onSubmit}>
            <div className="mt-5">
              <label htmlFor="email" className="sc-bqyKva ePvcBv font-medium">
                Email
              </label>
              {/* <input
                type="email"
                className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                placeholder="Email"
                value={state.email}
                name="email"
                // autoFocus
                onChange={handleChange}
                ref={inputReference}
              /> */}
              <InputUnderline
                type="email"
                className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                placeholder="Email"
                value={state.email}
                name="email"
                onChange={handleChange}
                // ref={inputReference}
              />
              {error.errorEmail && <AlertMsg msg={error.errorEmail} />}
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
              {error.errorPassword && <AlertMsg msg={error.errorPassword} />}
            </div>

            <div className="mt-10">
              {/* <button
                disabled={authLoading}
                className="py-3 bg-green-500 text-white w-full rounded hover:bg-green-600"
                type="submit"
              >
                {authLoading ? <Spinner color="#fff" size={10} /> : "Login"}
              </button> */}
              <Button
                // loading={state.loading}
                className="bg-[#635bff] rounded-[4px] w-full min-w-full"
              >
                {authLoading ? <Spinner color="#fff" size={5} /> : "Login"}
              </Button>
            </div>
          </form>
          {/* <motion.div
            transition={{ type: "spring", stiffness: 200, duration: 1 }}
            whileHover={{ y: "-10px" }}
          >
            osama
          </motion.div> */}

          <Link href="/signup">
            <span className="block  p-5 text-center text-gray-600 text-xs ">
              Don't have an account? <a href="/signup"> Signup </a>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
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
