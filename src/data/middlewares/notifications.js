export function notificationsMiddleware() {
  return function (next) {
    return function (action) {
      if (/(.*)_(SUCCESS)/.test(action.type)) {
        // notyfikacja
        console.log(action);
      }

      next(action);
    };
  };
}
