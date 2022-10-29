export const formatDocumentUrl = (documents) => {
  return documents
    .filter((document) => document.error.length === 0)
    .map((document) => {
      console.log(document);
      return {
        name: document.file.givenName,
        url: document.url,
      };
    });
};

// errors version of formatDocumentUrl
export const formatDocumentUrl0 = (documents) => {
  console.log(documents);
  return documents
    .filter((document) => document?.errors?.length === 0)
    .map((document) => {
      console.log(document);
      return {
        name: document.file.givenName,
        url: document.url,
      };
    });
};

export const formatDocumentUrl1 = (documents) => {
  return documents
    .filter((document) => document.error.length === 0)
    .map((document) => {
      return {
        name: document.file.givenName,
        url: document.url,
      };
    });
};

export const formatDocumentsWithNameAndUrl = (documents) => {
  console.log(documents);
  return documents
    .filter((document) => document.errors.length === 0)
    .map((document) => {
      return {
        name: document.file.givenName
          ? document.file.givenName
          : document.file.name,
        url: document.url,
      };
    });
};

export const formatYoutubeVideoUrl = (url) => {
  // format youtube video url
  return (
    url &&
    url
      .replace("watch?v=", "embed/")
      .replace("/shorts/", "/embed/")
      .split("?")[0]
      .split("&")[0]
  );
};

// counting due date from today
export const countDueDate = (date, days) => {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
};
