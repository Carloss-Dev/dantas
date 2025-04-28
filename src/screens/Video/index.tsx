import { Bounce, ToastContainer } from "react-toastify";
import { VideoTable } from "./VideoTable";

export const VideoPage = () => {
  return (
    <section className="flex items-center justify-center">
      <VideoTable />
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
