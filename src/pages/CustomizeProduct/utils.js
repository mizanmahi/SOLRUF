export const formatAttribute = (attribute, index) => {
   console.log(attribute);
   if (attribute.length > 0) {
      return attribute.map((price) => ({
         id: price.attribute_values[index].id,
         value: price.attribute_values[index].value
            ? price.attribute_values[index].value
            : '-',
         value_unit: price.attribute_values[index].value_unit,
      }));
   }
   return [];
};
