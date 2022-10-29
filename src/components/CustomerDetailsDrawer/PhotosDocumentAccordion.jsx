import React from "react";
import { Box } from "@mui/material";
import CustomAccordionForDrawer from "../Custom/CustomAccordionForDrawer/CustomAccordionForDrawer";
import PrimaryButton from "../Custom/PrimaryButton/PrimaryButton";
import FileUploadWithSliderPreview from "../Custom/FileUploadWithSliderPreview/FileUploadWithSliderPreview";
import UploadDocumentsWithName from "../Custom/UploadDocumentsWithName/UploadDocumentsWithName";

import uploadSvg from "./uploadDocument.svg";
import SolrufModal from "../Custom/SolrufModal/SolrufModal";

import { DownloadChip, Flex } from "./customerDetailsDrawer.style";

import ImageSlider from "./ImageSlider";

const PhotosDocumentAccordion = ({
  photos,
  setPhotos,
  customerImages,
  setFetchImages,
  setDocumentModalOpen,
  customerDocuments,
  handleDocDeleteClick,
  documentModalOpen,
  documents1,
  setDocuments1,
  handleDocumentUpload,
}) => {
  return (
    <CustomAccordionForDrawer
      title="Photos and Documents"
      titleStyle={{ fontSize: "1rem" }}
      sx={{
        my: 2,
        // boxShadow: 0,
        "& .MuiAccordionSummary-root": {
          // borderBottom: '1px solid #D0D7D9',
        },
      }}
    >
      <Box sx={{ display: "flex", mb: 2, mt: 2 }}>
        <FileUploadWithSliderPreview
          document={photos}
          setDocument={setPhotos}
          fileType={["image/png", "image/jpeg"]}
          slider={true}
        />
        <Box sx={{ ml: 5, width: "130px" }}>
          {/* <ResponsiveSliderMini
                                    images={customerImages}
                                    setFetchImages={setFetchImages}
                                 /> */}
          <ImageSlider
            images={customerImages}
            setFetchImages={setFetchImages}
          />
        </Box>
      </Box>

      <Box sx={{ mt: 1.5 }}>
        <img
          src={uploadSvg}
          alt=" upload svg"
          onClick={() => setDocumentModalOpen(true)}
          style={{ cursor: "pointer" }}
        />
      </Box>

      <Flex sx={{ mt: 1.5 }}>
        {customerDocuments.length > 0 &&
          customerDocuments.map((doc) => (
            <>
              <DownloadChip
                label={doc?.document_name}
                onClick={() => {
                  window.open(doc.document_url, "_blank");
                }}
                onDelete={() => handleDocDeleteClick(doc.document_id)}
              />
            </>
          ))}
      </Flex>

      {/* =========  document upload modal ========= */}
      <SolrufModal
        open={documentModalOpen}
        onClose={() => setDocumentModalOpen(false)}
      >
        <UploadDocumentsWithName
          documents={documents1}
          setDocuments={setDocuments1}
        />
        <PrimaryButton fullWidth onClick={handleDocumentUpload}>
          Done
        </PrimaryButton>
      </SolrufModal>
    </CustomAccordionForDrawer>
  );
};

export default PhotosDocumentAccordion;
