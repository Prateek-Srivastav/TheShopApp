export const SIGNUP = "SIGNUP";

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAua5y0TFs4bVX5FC9SPvsS9CQCIMlk_Jo",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    const resData = await response.json();
    console.log(resData);
    if (!response.ok) throw new Error("Something went wrong.");

    dispatch({ type: SIGNUP });
  };
};
