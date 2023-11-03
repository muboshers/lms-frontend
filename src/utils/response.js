// eslint-disable-next-line import/no-extraneous-dependencies
import toast from "react-hot-toast";

export const ErrorHandle = (error) => {
  toast.error(error?.data?.message ?? "Qandaydir xatolik mavjud!", {
    duration: 1000,
  });

  return error;
};
