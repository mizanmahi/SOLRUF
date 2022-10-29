import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import PushPinOutlined from '@mui/icons-material/PushPinOutlined';
import { Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import AddProduct from '../../pages/AdminPages/AddProduct/AddProduct';
import FullScreenDialog from '../Custom/BottomDialog/BottomDialog';
import ProductSlider from '../ProductSlider/ProductSlider';
import YellowButton from '../YellowButton/YellowButton';
import BottomSheet from '../Custom/BottomDialog/PortfolioBottomSheet';
import ProductDetailList from '../ProductDetailList/ProductDetailList';
import CustomizeProduct from '../../pages/CustomizeProduct/CustomizeProduct';
import { useDispatch } from 'react-redux';
import { addSelectedProductByVendor } from '../../redux/slices/Vendor/VendorProductListSlice';
import { axiAuth } from '../../utils/axiosInstance';
import { toast } from "react-toastify";
import { Close, PushPin } from '@mui/icons-material';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import DraggableBottomDialog, { Bar } from '../Custom/BottomDialog/DraggableBottomDialog';
import { Flex } from '../../pages/EnquiryPage/enquiryPage.style';

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

const ImageBox = styled(Box)(({ theme }) => {
    return {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1.5rem",
        marginBottom: '1.5rem',
    };
});

function ProductListView({ product, number, setFetchProducts }) {
    const dispatch = useDispatch();
    const { product_name } = product;
    const [productModal, setProductModal] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [productDeleteId, setProductDeleteId] = React.useState(null);
    const [images, setImages] = useState([
        'https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_960_720.jpg',
        'https://cdn.pixabay.com/photo/2021/10/11/18/56/shoes-6701631_960_720.jpg',
        'https://cdn.pixabay.com/photo/2020/08/24/21/40/fashion-5515135_960_720.jpg',
        'https://cdn.pixabay.com/photo/2013/07/12/18/20/shoes-153310_960_720.png',
        'https://cdn.pixabay.com/photo/2014/10/27/19/18/baby-shoes-505471_960_720.jpg',
        'https://cdn.pixabay.com/photo/2020/07/01/17/21/skater-5360306_960_720.jpg',
    ]);

    useEffect(() => {
        const tmp = product.images.map((item) => { return item.image_url });
        setImages(tmp);
    }, [])
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

        setProductDeleteId(product_id);
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
                // paddingValue="0px"
                handleClose={handleModalClose}
                open={productModal}
            >
                <ImageBox>
                    <ProductSlider images={images} view="mobile" />
                </ImageBox>
                <Box sx={{ mb: 3, p: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1.5 }}>
                        {product.product_name}
                    </Typography>
                    {product.attributes?.map((attribute) => (
                        <ProductDetailList list={`${attribute.name}`} description='Rs 256/sq.ft.' />
                    ))}
                </Box>

                <Box sx={{ p: 0 }}>
                    {pinned ?
                        <YellowButton
                            style={{
                                width: '100%',
                                border: "2px solid #FFD05B",
                                color: "#4D4D4D",
                                background: "#F3F3F3",
                                padding: ".7rem 1.5rem",
                                marginBottom: '4rem',
                            }}
                            onClick={handlePinning}
                        >

                            <PushPin /> UNPIN
                        </YellowButton>
                        :
                        <YellowButton
                            style={{
                                width: '100%',
                                border: "2px solid #FFD05B",
                                color: "#4D4D4D",
                                background: "#F3F3F3",
                                padding: ".7rem 1.5rem",
                                marginBottom: '4rem',
                            }}
                            onClick={handlePinning}
                        >
                            <PushPinOutlined /> PIN
                        </YellowButton>
                    }
                    <Box sx={{ display: 'flex', width: '100%', p: 0 }}>
                        <YellowButton
                            style={{
                                border: "2px solid #FFD05B",
                                color: "#4D4D4D",
                                background: "#F3F3F3",
                                padding: ".7rem 1.5rem",
                                width: '50%',
                                borderRadius:0
                            }}

                            onClick={(e) => setEditProduct(true)}
                        >
                            {" "}
                            <Edit /> Edit
                        </YellowButton>
                        <YellowButton
                            style={{
                                border: "2px solid red",
                                color: "red",
                                background: "#F3F3F3",
                                padding: ".7rem 1.5rem",
                                width: '50%',
                                borderRadius:0
                            }}
                            onClick={handleProductDeleteClick}
                        >

                            <Delete /> Delete
                        </YellowButton>
                    </Box>
                </Box>
            </DraggableBottomDialog>

            <BottomSheet
                open={editProduct}
                handleClose={() => setEditProduct(false)}
                height="100%"
                backText="Back to Portfolio"
            >
                {editProduct && (
                    <Box sx={{ overflowY: "scroll", pb: 15 }}>
                        <CustomizeProduct
                            setFetchProducts={setFetchProducts}
                            nextHandler={() => { }}
                            showProductPageHandler={() => setEditProduct(false)}
                        />
                    </Box>
                )}
            </BottomSheet>
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