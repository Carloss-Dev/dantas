import { Bounce, ToastContainer } from "react-toastify";
import { TagTable } from "./TagTable";

export const TagPage = () => {
  return (
    <section className="flex items-center justify-center">
      <TagTable />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        draggable
        theme="light"
        transition={Bounce}
      />
    </section>
  );
};
