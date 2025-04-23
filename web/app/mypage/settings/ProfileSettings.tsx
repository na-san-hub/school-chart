"use client";

import { useProfileSettings } from "./hooks/useProfileSettings";
import ProfileSettingsUI from "./components/ProfileSettingsUI";

export default function ProfileSettings() {
  const {
    isLoading,
    isDeleting,
    errorMessage,
    successMessage,
    showConfirmation,
    name,
    gender,
    ageGroup,
    email,
    setName,
    setGender,
    setAgeGroup,
    handleSubmit,
    handleDeleteAccount,
    handleCancelDelete,
  } = useProfileSettings();

  return (
    <ProfileSettingsUI
      isLoading={isLoading}
      isDeleting={isDeleting}
      errorMessage={errorMessage}
      successMessage={successMessage}
      showConfirmation={showConfirmation}
      name={name}
      gender={gender}
      ageGroup={ageGroup}
      email={email}
      setName={setName}
      setGender={setGender}
      setAgeGroup={setAgeGroup}
      handleSubmit={handleSubmit}
      handleDeleteAccount={handleDeleteAccount}
      handleCancelDelete={handleCancelDelete}
    />
  );
}
