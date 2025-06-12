import React, { useState } from "react";
import "./Login.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

import { useLoginHook } from "../hooks/useLoginHook";
import {  useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, loading, error } = useLoginHook();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(formData);

    if (result) {
      // Save token, navigate, etc.
      navigate("/dashboard");
    } else {
      console.error("Login failed");
    }
  };

  return (
    <MDBContainer className="py-5">
      <MDBRow>
        <MDBCol col="6" className="mb-5">
            <div className="text-center">
              <img
                src={`${process.env.PUBLIC_URL}/app_logo_light.png`}
                style={{ width: "185px" }}
              alt="logo"
              className="mx-auto"
              />
              <h4 className="mt-1 mb-5 pb-1 satoshi-title">Engineering Resources. Streamlined. Simplified.</h4>
            </div>
          <div className="d-flex flex-column mt-5 shadow-lg rounded-xl p-4">

            <p className="font-medium satoshi-title text-center">Login</p>

            <form onSubmit={handleSubmit} className="w-[80%] mx-auto">
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="form1"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form2"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />

              {error && <p style={{ color: "red" }}>{error}</p>}

              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn
                  type="submit"
                  className="mb-4 w-100 gradient-custom-2"
                  disabled={loading}>
                  {loading ? "Logging in..." : "Sign in"}
                </MDBBtn>
                <a className="text-muted" href="#!">
                  Forgot password?
                </a>
              </div>
            </form>

            <div className="d-flex flex-row align-items-center justify-content-center">
              <p className="mb-0">Don't have an account?</p>
              <MDBBtn outline className="mx-2" color="dark">
                Register
              </MDBBtn>
            </div>
          </div>
        </MDBCol>

        <MDBCol col="6" className="mb-5">
          <div className="flex flex-column justify-content-center gradient-custom-2 h-100 mb-4 rounded-2xl shadow-lg">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4 satoshi-title">Smart Resource Planning for Modern Engineering Teams</h4>
              <p className="small mb-0">
                Here are the login credentials for testing different roles:
                <br />
                Manager Role:
                <span className="font-medium block">Email: manager@company.com</span>
                <span className="font-medium block">Password: manager123</span>
                <br />
                Engineer Role:
                <span className="font-medium block">Email: john.engineer@company.com</span>
                <span className="font-medium block">Password: engineer123</span>


              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
