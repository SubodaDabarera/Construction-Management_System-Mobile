import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {viewProduct} from '../APIs/productAPI';

const ProductImage = ({data}) => {
  const [productDetails, setProductDetails] = useState();

  useEffect(() => {
    async function getProductDetails() {
      await viewProduct(data.productId, setProductDetails)
        .then(() => {
          console.log('Product data retrieved');
        })
        .catch(err => {
          console.log(err);
        });
    }

    getProductDetails();
  }, [data._id]);

  return (
    <>
      {productDetails && (
        <>
          <Image
            source={{uri: productDetails.productImage}}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </>
      )}
    </>
  );
};

export default ProductImage;
