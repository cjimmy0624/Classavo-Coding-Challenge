import React, { useMemo } from "react";
import {
  createPlateEditor,
  Plate,
  PlateContent,
} from "@udecode/plate-common";

function PlateEditor({ value, onChange }) {
  const editor = useMemo(() => createPlateEditor(), []);

  return (
    <Plate editor={editor} value={value} onChange={onChange}>
      <PlateContent
        placeholder="Write your chapter content..."
        style={{
          border: "1px solid #ccc",
          padding: "12px",
          minHeight: "250px",
          borderRadius: "8px",
        }}
      />
    </Plate>
  );
}

export default PlateEditor;