"use client";
import { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { v4 } from "uuid";
import { Button } from "../ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useMediaQuery } from "react-responsive";
import { GSSP_NO_RETURNED_VALUE } from "next/dist/lib/constants";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const minWidh = 350;

export const PdfViewer = ({ url }) => {
  const [numPages, setNumPages] = useState();
  const [index, setIndex] = useState(1);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const changePage = (value) => {
    if ((index + value) < 1 || index + value > numPages) return;
    setIndex(index + value);
  };

  function getScale() {
    if (isBigScreen) return 2.2;
    if (isDesktopOrLaptop) return 1.5;
    return 1;
  }

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);
    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div className="w-full h-auto overflow-y-scroll">
      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={() => changePage(isMobile ? -1 : -2)}
        >
          <ArrowLeftIcon />
        </Button>
        <span>
          {index}/{isMobile ? numPages : (index + 1)}
        </span>
        <Button
          variant="ghost"
          onClick={() => changePage(isMobile ? 1 : 2)}
        >
          <ArrowRightIcon />
        </Button>
      </div>
      <Document
        file={url}
        options={options}
        onError={() => console.log(error)}
        onLoadSuccess={onDocumentLoadSuccess}
        className="flex justify-center gap-2"
      >
        <Page
          key={v4()}
          pageNumber={index}
          width={minWidh}
          scale={getScale(dimensions.width)}
        />
        {!isMobile && (numPages >= (index + 1)) && (
          <Page
            key={v4()}
            pageNumber={index + 1}
            width={minWidh}
            scale={getScale(dimensions.width)}
          />
        )}
      </Document>
    </div>
  );
};


