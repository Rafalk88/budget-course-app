import { toast } from 'react-toastify';

export function notificationsMiddleware() {
  return function (next) {
    return function (action) {
      if (/(.*)_(SUCCESS)/.test(action.type)) {
        toast('Success', {
          position: 'top-center',
        });
      }

      next(action);
    };
  };
}
