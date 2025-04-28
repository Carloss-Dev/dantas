import { Bounce, ToastContainer } from "react-toastify";
import { TargetAudienceTable } from "./TargetAudienceTable";

export const TargetAudiencePage = () => {
  return (
    <section className="flex items-center justify-center">
      <TargetAudienceTable />

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
