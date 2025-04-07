import React, { useState } from 'react';
import './Auth_form.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validate = () => {
    const newErrors = {};
    const nameregex = /^[A-Za-z\s]+$/;
    const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;
    
    if (!formData.id.trim()) {
      newErrors.id = 'Name is required';
    } 
    else if (!nameregex.test(formData.id)) {
      newErrors.id = 'Invalid input. Only letters and spaces allowed';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    else if(!passwordregex.test(formData.password)){
      newErrors.password = "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character"
    }

    if (isRegister) {
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

//----------------Submit--------------------------//  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    const users = JSON.parse(localStorage.getItem('users')) || {};
  
    if (isRegister) {
      if (users[formData.id]) {
        setErrors({ id: 'User already exists' });
        return;
      }
      users[formData.id] = formData.password;
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration successful! You can now login.');
      setIsRegister(false);
      return;
    }

    if (users[formData.id] !== formData.password) {
      setErrors({ password: 'Invalid credentials' });
      return;
    }
  
    localStorage.setItem('loggedInUser', formData.id);
    window.location.href = '/notes';
  };
  
  return (
    <div className="auth-container">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="id"
          placeholder='Enter your name'
          value={formData.id}
          onChange={handleChange}
        />
        {errors.id && <p className="error">{errors.id}</p>}

        <label>Password:</label>
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder='Enter Password'
            value={formData.password}
            onChange={handleChange}
          />
          <span 
            className="password-toggle-icon" 
            onClick={togglePasswordVisibility}
          >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>
        {errors.password && <p className="error">{errors.password}</p>}

        {isRegister && (
          <>
          <label>Confirm Password:</label>
          <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder='Confirm Password'
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <span 
                className="password-toggle-icon" 
                onClick={toggleConfirmPasswordVisibility}
              >
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
            )}
          </>
        )}

        <button type="submit">
          {isRegister ? 'Register' : 'Login'}
        </button>

        <p className="switch-text">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          <span onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? ' Login here' : ' Register here'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
