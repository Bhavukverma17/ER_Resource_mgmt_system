import React, { useState } from 'react';
import './Login.css';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';

import useLogin from '../hooks/useLogin'; // Adjust path if needed
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { handleSubmit } = useLogin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                style={{ width: '185px' }} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
            </div>

            <p>Please login to your account</p>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(formData, setLoading, setError, navigate);
            }}>
              <MDBInput
                wrapperClass='mb-4'
                label='Email address'
                id='form1'
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
              <MDBInput
                wrapperClass='mb-4'
                label='Password'
                id='form2'
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
              />

              {error && <p style={{ color: 'red' }}>{error}</p>}

              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn type="submit" className="mb-4 w-100 gradient-custom-2" disabled={loading}>
                  {loading ? 'Logging in...' : 'Sign in'}
                </MDBBtn>
              </div>
            </form>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>
              <MDBBtn outline className='mx-2' color='danger'>
                Register
              </MDBBtn>
            </div>
          </div>
        </MDBCol>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are more than just a company</h4>
              <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
