import { Box, styled } from "@mui/system";
import SolrufTextField from '../../components/TextField/TextField';

const Wrapper = styled(Box)(({ theme }) => {
    return {
        background: '#f3f3f3',
        padding: theme.spacing(0.5),
        borderRadius: theme.spacing(1.5),
        marginTop: theme.spacing(2),
    };
})

const Flex = styled(Box)(({ theme }) => {
    return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1rem',
    };
})

const SolrufTextFieldGray = styled(SolrufTextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
       background: '#f3f3f3',
    },
 }));

const ProductPageForMobile = () => {
  return (
    <Wrapper>
        <Flex>
            <SolrufTextFieldGray label="Product Name" />
        </Flex>
    </Wrapper>
  )
}

export default ProductPageForMobile