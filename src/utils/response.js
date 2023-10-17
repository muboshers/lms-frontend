// eslint-disable-next-line import/no-extraneous-dependencies
import toast from 'react-hot-toast';

export const ErrorHandle = (error) => {
  toast.error(error ?? 'Qandaydir xatolik mavjud!', {
    duration: 400,
  });

  return error;
};
