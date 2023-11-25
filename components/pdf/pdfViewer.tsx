import { useState } from "react";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import ReactPaginate from "react-paginate";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
const options = {
  cMapUrl: "../../node_modules/pdfjs-dist/cmaps",
};

const PDFViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const paginate = ({ selected }: { selected: number }) =>
    setPageNumber(selected + 1);
  const toNextPage = () => setPageNumber(pageNumber + 1);
  const toPreviousPage = () => setPageNumber(pageNumber - 1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className="flex justify-center mt-8 ">
      <Document
        options={options}
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className={"border border-black pb-4"}
      >
        <div>
          <p className="font-bold pl-7 pt-7">{pageNumber}</p>
          <Page pageNumber={pageNumber} />
        </div>
        <ReactPaginate
          onPageChange={paginate}
          pageCount={numPages || 0}
          pageRangeDisplayed={5}
          marginPagesDisplayed={0}
          previousLabel={
            <TfiArrowCircleLeft
              size={24}
              className="hover:bg-black bg-white rounded-full hover:border hover:border-black hover:text-white"
              onClick={toPreviousPage}
            />
          }
          nextLabel={
            <TfiArrowCircleRight
              size={24}
              className="hover:bg-black bg-white rounded-full hover:border hover:border-black hover:text-white"
              onClick={toNextPage}
            />
          }
          containerClassName={" flex justify-center gap-8 mt-8"}
          pageLinkClassName={
            " px-[8px] py-[1px] hover:border-b-2 hover:border-primary-900  "
          }
          previousLinkClassName={"font-bold"}
          nextLinkClassName={"font-bold"}
          activeLinkClassName={"border-b-4 border-primary-900 "}
        />
      </Document>
    </div>
  );
};

export default PDFViewer;
