const checkAuthenticationStatus = () => {
    const jsonWebToken = sessionStorage.getItem("jsonWebToken");
    if (jsonWebToken) {
        return true;
    } else {
        return false;
    }
};

export { checkAuthenticationStatus };
