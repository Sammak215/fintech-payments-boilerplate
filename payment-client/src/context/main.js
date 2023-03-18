import { createContext, useContext, useState, useEffect } from "react";
import { firebase } from "functions/firebase/config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";
import API from "endpoint";
import axios from "axios";

export const cookietypes = {
  token: "app_token",
  user: "app_user",
  email: "app_email",
};

const MainContext = createContext();

export const useMainContext = () => useContext(MainContext);

export const MainContextProvider = (props) => {
  const [state, setState] = useState({
    user: {},
    authenticated: false,
    loading_auth: true,
    emailVerified: false,
  });

  const [authLoading, setAuthLoading] = useState(false);
  const [animateForm, setanimateForm] = useState(false);
  const [error, seterror] = useState({
    errorEmail: "",
    errorPassword: "",

    signUpEmail: "",
    signPassword: "",
    errorFirstName: "",
    errorLastName: "",
  });
  const { push } = useRouter();

  const { children } = props;

  useEffect(() => {
    getUser();
  }, []);

  const createNewUser = async ({ email, password, first_name, last_name }) => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    setInterval(() => {
      setanimateForm(false);
    }, 1000);

    if (email === "") {
      setState({ ...state, loading: false });
      setanimateForm(true);

      seterror({
        ...error,
        signUpEmail: "Please enter your email",
        signPassword: "",
        errorFirstName: "",
        errorLastName: "",
      });
    } else if (!re.test(email)) {
      setState({ ...state, loading: false });
      setanimateForm(true);

      seterror({
        ...error,
        signUpEmail: `Invalid email address:${email}`,
        signPassword: "",
        errorFirstName: "",
        errorLastName: "",
      });
    } else if (first_name === "") {
      setState({ ...state, loading: false });
      setanimateForm(true);

      seterror({
        ...error,
        signUpEmail: ``,
        signPassword: "",
        errorFirstName: "First Name is empty",
        errorLastName: "",
      });
    } else if (last_name === "") {
      setState({ ...state, loading: false });
      setanimateForm(true);

      seterror({
        ...error,
        signPassword: ``,
        signUpEmail: "",
        errorFirstName: "",
        errorLastName: "First Name is empty",
      });
    } else if (password === "") {
      setState({ ...state, loading: false });
      setanimateForm(true);

      seterror({
        ...error,
        signPassword: `Incorrect email or password`,
        signUpEmail: "",
        errorFirstName: "",
        errorLastName: "",
      });
    } else if (password.length < 6) {
      setState({ ...state, loading: false });
      setanimateForm(true);

      seterror({
        ...error,
        signPassword: `Password length must be greater than 6 characters`,
        signUpEmail: "",
        errorFirstName: "",
        errorLastName: "",
      });
    } else {
      seterror({
        ...error,
        signPassword: ``,
        signUpEmail: "",
        errorFirstName: "",
        errorLastName: "",
      });
      try {
        setAuthLoading(true);

        const { user } = await createUserWithEmailAndPassword(
          firebase.auth,
          email,
          password
        );

        await API.post("/users", {
          id: user.uid,
          email,
          first_name,
          last_name,
        });
        seterror({
          ...error,
          signPassword: `User has been added successfully`,
        });

        setState({
          ...state,
          authenticated: true,
          loading_auth: false,
          user: {
            uid: user.uid,
            email,
            first_name,
            last_name,
          },
        });

        push("/");

        setAuthLoading(false);
      } catch (e) {
        console.log(e.message, "sign up error message");
        setAuthLoading(false);

        seterror({
          ...error,
          signPassword: e.message,
        });

        setState({
          ...state,
          loading_auth: false,
        });
      }
    }
  };
  const getUser = (redirect) => {
    onAuthStateChanged(firebase.auth, async (user) => {
      if (user) {
        const uid = user.uid;

        try {
          const { data } = await API.get(`/users/${uid}`);

          const [first_name, last_name] = data.name?.split(" ");

          setState({
            ...state,
            authenticated: true,
            loading_auth: false,
            user: {
              uid: user.uid,
              email: data.email,
              first_name,
              last_name,
              banks: data.banks,
              balance: data.balance,
            },
          });

          redirect && push(redirect);
        } catch (error) {
          console.log(error.message);
        }
      } else {
        setState({
          ...state,
          loading_auth: false,
        });
      }
    });
  };

  const login = async ({ email, password }) => {
    // validations

    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    setInterval(() => {
      setanimateForm(false);
    }, 1000);

    if (email === "") {
      setState({ ...state, loading: false });
      setanimateForm(true);

      seterror({
        ...error,
        errorEmail: "Please enter your email",
        errorPassword: "",
      });
    } else if (!re.test(email)) {
      setState({ ...state, loading: false });
      setanimateForm(true);

      seterror({
        ...error,
        errorEmail: `Invalid email address:${email}`,
        errorPassword: "",
      });
    } else if (password === "") {
      setState({ ...state, loading: false });
      setanimateForm(true);

      seterror({
        ...error,
        errorPassword: `Incorrect email or password`,
        errorEmail: "",
      });
    } else {
      seterror({ ...error, errorEmail: "", errorPassword: "" });

      try {
        setAuthLoading(true);
        await signInWithEmailAndPassword(firebase.auth, email, password);
        getUser("/");
        setAuthLoading(false);
      } catch (error) {
        setAuthLoading(false);

        seterror({
          ...error,
          errorEmail: "",
          errorPassword: "This user does not exists2",
        });

        console.log(error.message, "error message on login");
      }
    }

    // try {
    //   setAuthLoading(true);
    //   await signInWithEmailAndPassword(firebase.auth, email, password);
    //   getUser("/");
    //   setAuthLoading(false);
    // } catch (error) {
    //   console.log(error.message, "error message on login");
    // }
  };

  const logout = async () => {
    await signOut(firebase.auth);

    setState({
      ...state,
      loading_auth: false,
      authenticated: false,
      user: {},
    });
  };

  return (
    <MainContext.Provider
      value={{
        ctx: state,
        user: state.user,
        authLoading,
        animateForm,
        setanimateForm,
        error,
        func: {
          createNewUser,
          login,
          logout,
        },
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
