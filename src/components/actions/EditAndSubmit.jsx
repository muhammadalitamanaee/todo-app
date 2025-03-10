import React from "react";

export default function EditAndSubmit({ editableField, id, setEditableField }) {
  return (
    <div className="flex gap-2 items-center">
      <button
        disabled={!(editableField === id) && editableField !== null}
        type="submit"
      >
        submit
      </button>

      <button
        type="button"
        disabled={editableField === id && editableField !== null}
        onClick={() => {
          setEditableField(id);
        }}
      >
        Edit
      </button>
    </div>
  );
}
