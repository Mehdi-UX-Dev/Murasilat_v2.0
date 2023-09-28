import React from "react";

function MaktoobFormat({ body }: { body: string | undefined }) {
  return (
    <section
      dangerouslySetInnerHTML={{
        __html: body || "",
      }}
      id="body"
      className="row-span-3 pr-4 pt-2 quill-container"
    ></section>
  );
}

export default MaktoobFormat;
