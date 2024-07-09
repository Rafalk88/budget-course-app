import { toast } from 'react-toastify';

export function notificationsMiddleware() {
  return function (next) {
    return function (action) {
      if (action.successMessage && /(.*)_(SUCCESS)/.test(action.type)) {
        toast.success(action.successMessage, {
          position: 'top-center',
          autoClose: 3000,
          pauseOnHover: false,
        });
      }

      if (action.errorMessage && /(.*)_(FAILURE)/.test(action.type)) {
        toast.error(action.errorMessage, {
          position: 'top-center',
        });
      }

      next(action);
    };
  };
}
