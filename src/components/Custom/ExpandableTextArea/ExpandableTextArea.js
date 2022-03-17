import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/system';

const StyledTextareaAutosize = styled(TextareaAutosize)(({ theme }) => ({
   border: `2px solid ${theme.palette.primary.main}`,
   borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
}));

const ExpandableTextArea = ({placeholder, minRows, style}) => {
   return (
      <StyledTextareaAutosize
         aria-label='minimum height'
         minRows={minRows}
         placeholder={placeholder}
         style={{ width: "100%", ...style }}
      />
   );
};

export default ExpandableTextArea;
