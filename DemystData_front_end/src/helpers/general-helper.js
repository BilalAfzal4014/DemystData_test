export const performAfterAuthSteps = (store, router, token) => {
  storeToken(store, token)
    .then(() => {
      redirectToDashBoard(router);
    });
}

const storeToken = (store, token) => {
  return store.dispatch("auth/storeAuthTokenAction", token);
};

const redirectToDashBoard = (router) => {
  router.go("/dashboard/product");
}
