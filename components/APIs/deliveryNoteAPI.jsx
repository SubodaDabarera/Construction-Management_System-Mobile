import axios from 'axios';

const BACKEND_URL = 'https://construction-management.cyclic.app/api';


export const addDeliveryNote = async (
    { orderId, zip, city, province, siteManagerMobile },
    setIsCreationSuccess
  ) => {
    try {
      await axios
        .post(`${BACKEND_URL}/deliveryNote/add-delivery-note`, {
            orderId, zip, city, province, siteManagerMobile
        })
        .then((result) => {
          setIsCreationSuccess(result.data.success);
        });
    } catch (err) {
      console.log(err);
      setIsCreationSuccess(false);
    }
  };


  // update delivery note status on orders
  export const updateDeliveryNoteStatus_Orders = async (orderId, status) => {
  
    try {
      await axios.put(`${BACKEND_URL}/order/update-deliveryNote-status`, {orderId, status}).then((result) => {  
        console.log(result)
      });
    } catch (err) {
      console.log(err);
    }
  };