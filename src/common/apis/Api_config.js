const _token = localStorage.getItem("token");

const authenticationLogIn = {
  _token: null,
  RequestMethod: "ServiceManager.Login",
};

const authenticationSignUp = {
  _token: null,
  RequestMethod: "ServiceManager.SignUp",
};

const authticcationRoles = {
  _token: null,
  RequestMethod: "ServiceManager.RoleList",
};
export { authenticationLogIn, authenticationSignUp, authticcationRoles };
