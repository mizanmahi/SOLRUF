import ListViewTable from '../../../components/ListViewTable/ListViewTable';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { axiAuth } from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';

const DragDrop = ({ tabType, viewType, setDataList, dragProps }) => {
   const { productFields, setProductFields, onClickEdit } = dragProps;

   const reorder = (list, startIndex, endIndex) => {
      // reordering the ui of the list
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      console.log(removed);
      result.splice(endIndex, 0, removed);
      return result;
   };

   const handleDragEnd = (result, dataList, setDataList) => {
      console.log({
         result,
         dataList,
      });

      if (!result.destination) {
         return;
      }
      const items = reorder(
         dataList,
         result.source.index,
         result.destination.index
      );

      const getNanoId = items.map((item) => item.nanoid);

      const filterData = productFields.filter((data) => {
         if (!getNanoId.includes(data.nanoid)) {
            return data;
         }
         return null;
      });

      const allData = items.map((item, index) => {
         const product = productFields.find(
            (ele) => ele.nanoid === item.nanoid
         );
         console.log(product);
         return {
            ...product,
            views: {
               ...product.views,
               [tabType]: { level: index, visibility: true },
            },
         };
      });

      console.log(filterData);
      console.log(allData);

      setDataList(allData);
      setProductFields(filterData?.concat(allData));

      const updatedAttributes = {
         levels: [
            ...filterData?.concat(allData).map((attribute) => ({
               attribute_value_id: attribute.attribute_id,
               views: attribute.views,
            })),
         ],
      };

      console.log(updatedAttributes);

      try {
         const { status, data } = axiAuth.post(
            `api/admin/attributes/levels`,
            updatedAttributes
         );
         if (status === 200) {
            console.log(data);
            toast.success('Attribute levels updated successfully');
         }
      } catch (error) {
         console.log(error);
      }
   };

   const getListStyle = (isDraggingOver) => ({
      background: isDraggingOver && '#faefd4',
   });

   return (
      <DragDropContext
         onDragEnd={(result) => handleDragEnd(result, viewType, setDataList)}
      >
         <Droppable droppableId='droppable'>
            {(provided, snapshot) => (
               <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
               >
                  {viewType.map(({ nanoid }, id, index) => (
                     <Draggable key={nanoid} draggableId={nanoid} index={id}>
                        {(provided, snapshot) => (
                           <div
                              draggable='true'
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                           >
                              <ListViewTable
                                 list={index[id]}
                                 onClickEdit={() => {
                                    onClickEdit(index[id].nanoid);
                                 }}
                              />
                           </div>
                        )}
                     </Draggable>
                  ))}
                  {provided.placeholder}
               </div>
            )}
         </Droppable>
      </DragDropContext>
   );
};

export default DragDrop;
