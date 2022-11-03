import axios from 'axios';

const BACKEND_URL = 'https://construction-management.cyclic.app/api';

export const createOrder = async (
  {
    ownerId,
    owner,
    title,
    siteManager,
    productId,
    quantity,
    unitPrice,
    totalAmount,
  },
  setIsCreationSuccess,
) => {
  try {
    await axios
      .post(`${BACKEND_URL}/order/place-order`, {
        ownerId,
        owner,
        title,
        siteManager,
        productId,
        quantity,
        unitPrice,
        totalAmount,
      })
      .then(result => {
        setIsCreationSuccess(result.data.success);
      });
  } catch (err) {
    console.log(err);
    setIsCreationSuccess(false);
  }
};

export const getOrdersOfSM = async ({siteManagerId}, setOrdersList) => {
  try {
    await axios
      .get(`${BACKEND_URL}/order/sm-order-details`, {
        params: {siteManager: siteManagerId},
      })
      .then(result => {
        if (result) {
          setOrdersList(result.data.orders);
        } else {
          setOrdersList([]);
        }
      });
  } catch (err) {
    console.log(err);
    setOrdersList([]);
  }
};

export const deleteOrderById = async (orderId) => {
  try {
    await axios
      .delete(`${BACKEND_URL}/order/delete-order`,  {params: {orderId: orderId}})
      .then(() => {
        console.log("Product deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch {}
};

export const updateOrderQtyById = async ({orderId, quantity}) => {
  try {
    await axios.put(`${BACKEND_URL}/order/update-order-qty`, {orderId:orderId, quantity:quantity}).then((result) => {  
      console.log(result)
    });
  } catch (err) {
    console.log(err);
  }
};

