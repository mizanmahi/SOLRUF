import PushPinOutlined from '@mui/icons-material/PushPinOutlined';
import { CardMedia, Dialog, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { Box } from '@mui/system';
import React, {  useState } from 'react';

import ProductDetailList from '../ProductDetailList/ProductDetailList';
import CustomizeProduct from '../../pages/CustomizeProduct/CustomizeProduct';
import { useDispatch } from 'react-redux';
import { addSelectedProductByVendor } from '../../redux/slices/Vendor/VendorProductListSlice';
import { axiAuth } from '../../utils/axiosInstance';
import { toast } from "react-toastify";
import { KeyboardBackspace, PushPin } from '@mui/icons-material';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import DraggableBottomDialog from '../Custom/BottomDialog/DraggableBottomDialog';
import PrimaryButton from '../Custom/PrimaryButton/PrimaryButton';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { modalTopBackButtonStyle } from '../../theme/modalTopBackButtonStyle';

const TitleBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

const ProductList = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: ".8rem",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
}));

const Number = styled(Box)(({ theme }) => ({
    background: "#d0d7d9",
    color: "#4d4d4d",
    fontWeight: "bold",
    // mr: "0.8rem",
    borderRadius: "50%",
    padding: "0.5rem",
    width: "1.5rem",
    height: "1.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "0.8rem",
}));

const ButtonBox = styled(Box)(({ theme }) => {
    return {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    };
});



function ProductListView({ product, number, setFetchProducts }) {
    const dispatch = useDispatch();
    const { product_name } = product;
    const [productModal, setProductModal] = useState(false);
    const [editProduct, setEditProduct] = useState(false);

    // const [images, setImages] = useState([
    //     'https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_960_720.jpg',
    //     'https://cdn.pixabay.com/photo/2021/10/11/18/56/shoes-6701631_960_720.jpg',
    //     'https://cdn.pixabay.com/photo/2020/08/24/21/40/fashion-5515135_960_720.jpg',
    //     'https://cdn.pixabay.com/photo/2013/07/12/18/20/shoes-153310_960_720.png',
    //     'https://cdn.pixabay.com/photo/2014/10/27/19/18/baby-shoes-505471_960_720.jpg',
    //     'https://cdn.pixabay.com/photo/2020/07/01/17/21/skater-5360306_960_720.jpg',
    // ]);

    // useEffect(() => {
    //     const tmp = product.images.map((item) => { return item.image_url });
    //     setImages(tmp);
    // }, [])

    const handleModalOPen = (e) => {
        dispatch(addSelectedProductByVendor(product));
        setProductModal(true);
    };
    const handleModalClose = (e) => {
        setProductModal(false);
    };

    const [productDeleteConfirm, setProductDeleteConfirm] = useState({
        role: 'Product',
        isOpen: false,
        title: 'Delete Product?',
        message: 'Product will be deleted permanently once you continue!',
        cacheRole: 'User',
    });

    const handleProductDeleteClick = (e, product_id) => {
        e.stopPropagation();
        setProductDeleteConfirm({
            ...productDeleteConfirm,
            isOpen: true,
        });

        // setProductDeleteId(product_id);
    };

    const deleteHandler = async () => {
        try {
            const { status } = await axiAuth.delete(
                `api/vendor/products/${product.product_id}`
            );
            if (status === 200) {
                setProductDeleteConfirm({
                    ...productDeleteConfirm,
                    isOpen: false,
                });
                setFetchProducts((prev) => !prev);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const [pinned, setPinned] = useState(
        product?.details?.pinned ? true : false
    );

    const handlePinning = async (e) => {
        e.stopPropagation();
        // pin unpin product
        try {
            const { status, data } = await axiAuth.get(
                `api/vendor/products/${product.product_id}/pin`
            );
            if (status === 200) {
                if (data.message === 'Product Unpinned') {
                    setPinned(false);
                    toast.success('Product Unpinned Successfully');
                } else {
                    setPinned(true);
                    toast.success('Product Pinned Successfully');
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <ProductList sx={{ mb: 3, boxShadow: "0 4px 15px rgba(0,0,0,0.1)", border: '0.5px solid rgba(77,77,77,1)' }} onClick={handleModalOPen}>
            <TitleBox>
                <Number>{number || 1}</Number>
                <Typography fontWeight={600}>
                    {product_name.length < 15 ? product_name : product_name.slice(0, 20) + "..."}
                </Typography>
            </TitleBox>
            <DraggableBottomDialog
                bar={true}
                paddingValue="0px"
                handleClose={handleModalClose}
                open={productModal}
                specialCase={true}
            >
                <CardMedia
                    component="img"
                    height="250"
                    image={product.images[1].image_url}
                    alt="cart"
                    className=""
                />
                <Box sx={{ px: 3, py: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography
                                sx={{
                                    mt: 1.7,
                                    color: "#000000",
                                    fontWeight: "700",
                                    fontSize: "22px",
                                    lineHeight: "26px",
                                }}
                            >
                                {product.product_name}
                            </Typography>
                        </Box>
                        <IconButton size="small">
                            {pinned ? (
                                <PushPin
                                    sx={{ mt: 0.4, color: "black" }}
                                    onClick={handlePinning}
                                />
                            ) : (
                                <PushPinOutlined
                                    sx={{ mt: 0.4 }}
                                    onClick={handlePinning}
                                />
                            )}
                        </IconButton>
                    </Box>
                    {product.attributes?.slice(0, 3).map((attribute) => (
                        <ProductDetailList list={`${attribute.name}`} fontSize1="1.1rem" fontSize2={'1rem'} description='Rs 256/sq.ft.' />
                    ))}
                    <ButtonBox style={{ paddingTop: '25px' }}>
                        <PrimaryButton
                            sx={{
                                px: 3.5,
                                py: 0.5,
                                background: "transparent",
                                border: "2px solid #4D4D4D",
                                display: "flex",
                                alignItems: 'center',
                                flex: "1",
                                "&:hover": {
                                    border: "2px solid transparent",
                                },
                            }}
                            onClick={(e) => setEditProduct(true)}
                        >
                            <EditIcon />
                            Edit
                        </PrimaryButton>

                        <PrimaryButton
                            sx={{
                                px: 3.5,
                                py: 0.5,
                                background: "transparent",
                                border: "2px solid #F20519",
                                color: "#F20519",
                                flex: "1",
                                display: "flex",
                                alignItems: 'center',
                                marginLeft: "1rem",
                                "&:hover": {
                                    border: "2px solid transparent",
                                    background: "#F20519",
                                    color: "#ffffff",
                                },
                            }}
                            onClick={handleProductDeleteClick}
                        >
                            <DeleteIcon />
                            Delete
                        </PrimaryButton>
                    </ButtonBox>
                </Box>
            </DraggableBottomDialog>

            <Dialog
                fullScreen
                open={editProduct}
                handleClose={() => setEditProduct(false)}
            >
                <Box
                    sx={modalTopBackButtonStyle}
                    onClick={() => setEditProduct(false)}
                >
                    <KeyboardBackspace />
                    <Box>Back to Portfolio</Box>
                </Box>
                {editProduct && (
                    <Box sx={{ overflowY: "auto", pb: 15 }}>
                        <CustomizeProduct
                            setFetchProducts={true}
                            nextHandler={() => { }}
                            showProductPageHandler={() => setEditProduct(false)}
                        />
                    </Box>
                )}
            </Dialog>
            <ConfirmDialog
                confirmDialog={{
                    ...productDeleteConfirm,
                    onConfirm: deleteHandler,
                }}
                setConfirmDialog={setProductDeleteConfirm}
                variant='warning'
            />
        </ProductList>
    );
}

export default ProductListView;