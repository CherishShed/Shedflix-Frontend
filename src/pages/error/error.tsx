import React from "react";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <h2 className=" text-3xl text-green-500">Error</h2>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="text-orange-700 border rounded-sm"
      >
        Go back
      </button>
    </div>
  );
}

export default Error;
