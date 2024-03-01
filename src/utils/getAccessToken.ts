export const getAccessToken = () =>
  localStorage.getItem("ACCESS_TOKEN") ? `Bearer ${localStorage.getItem("ACCESS_TOKEN")}` : null;
