import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ text }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      type="submit"
      className="bg-blue-600 text-white font-semibold mt-4 rounded-lg px-5 py-3 hover:bg-green-300 transition-all"
    >
      {isSubmitting ? (
        <>
          <span className=""></span>sending
        </>
      ) : (
        text || "submit"
      )}
    </button>
  );
};

export default SubmitBtn;
