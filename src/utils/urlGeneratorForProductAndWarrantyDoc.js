export const generateUrl = (documents) => {
   console.log(documents);
   return documents
      .filter((fw) => (fw.errors ? fw.errors?.length === 0 : fw))
      .map((fw) => {
         return {
            name: fw.file.givenName,
            url: fw.url,
            type: fw.type,
         };
      });
};

export const generatePrevUrl = (documents) => {
   return documents.map((ele) => {
      return {
         name: ele.doc_name,
         url: ele.doc_url,
         type: ele.doc_type,
      };
   })
};