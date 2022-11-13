import axios from 'axios';

const BACKEND_URL = 'https://construction-management.cyclic.app/api';

export const getUserDetails = async (userId, setUserDetails) => {
  try {
    await axios
      .get(`${BACKEND_URL}/user/get-user-details`, {
        params: {userId: userId},
      })
      .then(result => {
        if (result.data.success == true) {
            // console.log("Called")
          setUserDetails(result.data.user);
        } else {
          console.log('Error');
          setUserDetails([]);
        }
      });
  } catch (err) {
    console.log(err);
    setUserDetails([]);
  }
};

export const updateSMtotalSpent = async (userId, amount) => {
  
  try {
    await axios.put(`${BACKEND_URL}/user/increment-sm-totalSpent`, {userId, amount}).then((result) => {  
      console.log(result)
    });
  } catch (err) {
    console.log(err);
  }
};

export const decrementSMtotalSpent = async (userId, {amount}) => {
  
  try {
    await axios.put(`${BACKEND_URL}/user/decrement-sm-totalSpent`, {userId, amount}).then((result) => {  
      console.log(result)
    });
  } catch (err) {
    console.log(err);
  }
};
