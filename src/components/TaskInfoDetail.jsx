import React from "react";

export default function TaskInfoDetail({ label, content }) {
  return (
    <div className="w-full flex justify-between ">
      <span className="text-gray-600 ">{label}</span>
      <span className="text-gray-600 ">{content}</span>
    </div>
  );
}
