"use client";

import { useRegister } from "../hooks/useRegister";
import RegisterFormUI from "./RegisterFormUI";

const RegisterForm = () => {
  const {
    name,
    email,
    password,
    confirmPassword,
    ageGroup,
    gender,
    isLoading,
    errorMessage,
    successMessage,
    showPassword,
    showConfirmPassword,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    setAgeGroup,
    setGender,
    handleSubmit,
    handleGoogleSignUp,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useRegister();

  return (
    <RegisterFormUI
      name={name}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      ageGroup={ageGroup}
      gender={gender}
      isLoading={isLoading}
      errorMessage={errorMessage}
      successMessage={successMessage}
      showPassword={showPassword}
      showConfirmPassword={showConfirmPassword}
      setName={setName}
      setEmail={setEmail}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
      setAgeGroup={setAgeGroup}
      setGender={setGender}
      handleSubmit={handleSubmit}
      handleGoogleSignUp={handleGoogleSignUp}
      togglePasswordVisibility={togglePasswordVisibility}
      toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
    />
  );
};

export default RegisterForm;
