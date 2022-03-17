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
