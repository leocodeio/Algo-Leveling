export const checkSignin = () => {
  try {
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {} as { [key: string]: string });

    return !!cookies["Authorization"];
  } catch (error) {
    console.error("Error checking signin status:", error);
    return false;
  }
};
