import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import http from "../http-common";
import LoginRegister from "../components/LoginRegister";
import Swal from "sweetalert2";
import validator from "validator";
export default function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  async function submitHandler(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please Fill All Fields");
      return;
    }
    if (!validator.isEmail(email)) {
      setError("Email is invalid");
      return;
    }
    setLoading(true);
    try {
      const { data } = await http.post("/users/login", { email, password })
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      if (data.user) {

        Swal.fire("Login Successful", `${data.user.username}, welcome to EveryNaija`, '', 'success')

          .then(() => history.push("/"));
        setLoading(false);

      }
    } catch (error) {
      error.response && error.response.data.message
        ? setError(error.response.data.message)
        : setError(error.message);
      setLoading(false);

    }

    // history.push("/");
  }

  let userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
      return;
    }
  }, [userInfo, props.history])

  return <>
    <LoginRegister page="login" />


    <form className="main-form" onSubmit={submitHandler}>
      <h3>Login</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3 ">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
      </div>

      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
      </div>
      <button disabled={loading} type="submit" className="btn btn-green w-100 mb-2"> {loading ?   <div class="spinner-border text-light" role="status">
          <span class="sr-only">Loading...</span>
        </div> : <span>Login</span>  } 

      
      </button>
    </form>
  </>
}