import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLOURS, Items} from '../database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import {
  deleteOrderById,
  getOrdersOfSM,
  updateOrderQtyById,
} from '../APIs/orderAPI';
import moment from 'moment';
import {viewProduct} from '../APIs/productAPI';
import ProductImage from '../common/ProductImage';
import DropdownComponent from '../common/DropdownComponent';

const OrderedItems = ({navigation}) => {
  const [product, setProduct] = useState();
  const [total, setTotal] = useState(0);
  const [totalBudget, setTotalBudget] = useState(100000);
  const [orderStatus, setOrderStatus] = useState('approved');
  const [ordersList, setOrdersList] = useState();
  const [userId, setUserId] = useState('63610c9b67ab4384d0d8c35e');
  // const [projectBudget, setProjectBudget] = useState(100000)
  const [maximumAmount, setmaximumAmount] = useState(10000);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedQty, setSelectedQty] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getOrders();
    });

    return unsubscribe;
  }, [navigation]);

  const getTotal = () => {
    let total = 0;
    for (let index = 0; index < ordersList.length; index++) {
      let productPrice =
        ordersList[index].unitPrice * ordersList[index].quantity;
      total = total + productPrice;
    }
    setTotal(total);
  };

  useEffect(() => {
    if (ordersList) {
      getTotal();
    }
  }, [ordersList]);

  // get data from DB
  const getOrders = async () => {
    await getOrdersOfSM({siteManagerId: userId}, setOrdersList)
      .then(() => {
        console.log('Orders retrieved');
      })
      .catch(err => {
        console.log(err);
      });
  };

  // remove items
  const removeItemsFromCart = async id => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      for (let index = 0; index < array.length; index++) {
        if (array[index] == id) {
          array.splice(index, 1);
        }

        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        getOrders();
      }
    }
  };

  // remove orders
  const removeOrder = async orderId => {
    console.log(orderId);
    await deleteOrderById(orderId).then(() => {
      ToastAndroid.show('Order Deleted!', ToastAndroid.SHORT);
      getOrders();
    });
  };

  // update order
  const updateOrderQty = async orderId => {
    await updateOrderQtyById({orderId, quantity: selectedQty}).then(() => {
      ToastAndroid.show('Order Updated!', ToastAndroid.SHORT);
      getOrders();
    });

    setSelectedQty();
  };

  // render products
  const renderProducts = (data, index) => {
    return (
      <TouchableOpacity
        key={data._id}
        onPress={() =>
          navigation.navigate('ProductInfo', {productID: data._id})
        }
        style={{
          width: '100%',
          height: 130,
          marginVertical: 6,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '30%',
            height: 110,
            padding: 14,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOURS.backgroundLight,
            borderRadius: 10,
            marginRight: 22,
          }}>
          <ProductImage data={data} />
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'space-around',
            paddingVertical: 10,
          }}>
          <View>
            <Text
              style={{
                fontSize: 13,
                maxWidth: '100%',
                color: COLOURS.black,
                fontWeight: '600',
                // letterSpacing: ,
              }}>
              {data.title}
            </Text>

            <View>
              <Text>{data.quantity}</Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: '400',
                  opacity: 0.6,
                }}>
                From {data.owner}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  maxWidth: '85%',
                  marginRight: 4,
                  color: COLOURS.backgroundDark,
                }}>
                $ {data.unitPrice}
              </Text>
            </View>
            <View>
              {data.createdAt && (
                <Text
                  style={{
                    color: COLOURS.backgroundMedium,
                    fontSize: 13,
                  }}>
                  {/* {data.createdAt} */}
                  {moment(data.createdAt).format('L')}
                </Text>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {data.status == 'pending' ||
                (!data.status && (
                  <>
                    <FontAwesome
                      name="circle"
                      style={{
                        fontSize: 16,
                        marginRight: 6,
                        color: COLOURS.yellowLight,
                      }}
                    />
                    <Text
                      style={{
                        color: COLOURS.yellow,
                        fontWeight: '500',
                      }}>
                      Pending
                    </Text>
                  </>
                ))}
              {data.status == 'approved' && (
                <>
                  <FontAwesome
                    name="circle"
                    style={{
                      fontSize: 16,
                      marginRight: 6,
                      color: COLOURS.green,
                    }}
                  />
                  <Text
                    style={{
                      color: COLOURS.greenDark,
                      fontWeight: '500',
                    }}>
                    Approved
                  </Text>
                </>
              )}
              {data.status == 'rejected' && (
                <>
                  <FontAwesome
                    name="circle"
                    style={{
                      fontSize: 16,
                      marginRight: 6,
                      color: COLOURS.red2,
                    }}
                  />
                  <Text
                    style={{
                      color: COLOURS.redDark,
                      fontWeight: '500',
                    }}>
                    Rejected
                  </Text>
                </>
              )}
            </View>
          </View>

          {data.status == 'pending' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}></View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    // onPress={() => removeItemsFromCart(data.id)}

                    onPress={() => setUpdateModalVisible(true)}>
                    <MaterialCommunityIcons
                      name="square-edit-outline"
                      style={{
                        fontSize: 16,
                        color: COLOURS.backgroundDark,
                        backgroundColor: COLOURS.backgroundLight,
                        padding: 8,
                        borderRadius: 100,
                        marginHorizontal: 8,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    // onPress={() => removeOrder(data._id)}
                    onPress={() => setModalVisible(true)}>
                    <MaterialCommunityIcons
                      name="delete-outline"
                      style={{
                        fontSize: 16,
                        color: COLOURS.backgroundDark,
                        backgroundColor: COLOURS.backgroundLight,
                        padding: 8,
                        borderRadius: 100,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* modal start */}
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text
                      style={{
                        fontSize: 20,
                      }}>
                      Are you sure?
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 30,
                      }}>
                      <Pressable
                        style={{
                          borderRadius: 20,
                          padding: 10,
                          elevation: 2,
                          marginHorizontal: 10,
                          backgroundColor: COLOURS.backgroundLight,
                        }}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text
                          style={{
                            color: COLOURS.backgroundDark,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            paddingHorizontal: 6,
                          }}>
                          Cancel
                        </Text>
                      </Pressable>
                      <Pressable
                        style={{
                          borderRadius: 20,
                          padding: 10,
                          elevation: 2,
                          marginHorizontal: 10,
                          backgroundColor: COLOURS.red,
                        }}
                        onPress={() => {
                          setModalVisible(!modalVisible);
                          removeOrder(data._id);
                        }}>
                        <Text
                          style={{
                            color: COLOURS.white,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            paddingHorizontal: 6,
                          }}>
                          Delete
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
              {/* modal end */}

              {/* start */}

              <Modal
                animationType="fade"
                transparent={true}
                visible={updateModalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setUpdateModalVisible(!updateModalVisible);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text
                      style={{
                        fontSize: 16,
                      }}>
                      Update your quantity
                    </Text>
                    <View
                      style={{
                        width: 200,
                        marginTop: 10,
                      }}>
                      <DropdownComponent
                        selectedQty={selectedQty}
                        setSelectedQty={setSelectedQty}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 30,
                      }}>
                      <Pressable
                        style={{
                          borderRadius: 20,
                          padding: 10,
                          elevation: 2,
                          marginHorizontal: 10,
                          backgroundColor: COLOURS.backgroundLight,
                        }}
                        onPress={() => {
                          setUpdateModalVisible(!updateModalVisible);
                          setSelectedQty();
                        }}>
                        <Text
                          style={{
                            color: COLOURS.backgroundDark,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            paddingHorizontal: 6,
                          }}>
                          Cancel
                        </Text>
                      </Pressable>
                      <Pressable
                        style={{
                          borderRadius: 20,
                          padding: 10,
                          elevation: 2,
                          marginHorizontal: 10,
                          backgroundColor: COLOURS.greenDark,
                        }}
                        onPress={() => {
                          setUpdateModalVisible(!updateModalVisible);
                          updateOrderQty(data._id);
                        }}>
                        <Text
                          style={{
                            color: COLOURS.white,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            paddingHorizontal: 6,
                          }}>
                          Save
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>

              {/* end */}
            </>
          ) : (
            <>
              {data.status == 'approved' && (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}></View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('DeliveryNote', {
                            OrderID: data._id,
                          })
                        }>
                        <View
                          style={{
                            backgroundColor: COLOURS.backgroundLight,
                            borderRadius: 6,
                            paddingHorizontal: 8,
                            padding: 4,
                          }}>
                          <Text>Add Delivery</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
        position: 'relative',
      }}>
      {/*start - status bar icons - bottom */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: '6%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            zIndex: 999,
            backgroundColor: COLOURS.backgroundLight,
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            >
            <MaterialCommunityIcons
              name="home-outline"
              style={{
                fontSize: 20,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                backgroundColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={() => navigation.navigate('ApprovedDeliveryNote')}
          >
            <FontAwesome
              name="search"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                backgroundColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity 
          // onPress={() => navigation.navigate('OrderedItems')}
          >
            <FontAwesome
              name="user-o"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                backgroundColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OrderHistory')}>
            <MaterialCommunityIcons
              name="history"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                backgroundColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('OrderedItems')}>
            <MaterialCommunityIcons
              name="format-list-text"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                backgroundColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity>
          
        </View>
      </View>
      {/*end - status bar icons - bottom */}

      <ScrollView>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingTop: 16,
            paddingHorizontal: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundDark,
                padding: 12,
                backgroundColor: COLOURS.backgroundLight,
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: '400',
            }}>
            Details of orders
          </Text>
          <View></View>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: COLOURS.black,
            fontWeight: '500',
            letterSpacing: 1,
            paddingTop: 20,
            paddingLeft: 16,
            marginBottom: 10,
          }}>
          My Orders
        </Text>
        <View style={{paddingHorizontal: 16}}>
          {ordersList ? ordersList.map(renderProducts) : null}
        </View>
        <View>
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 40,
              marginBottom: 80,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
                fontWeight: '500',
                letterSpacing: 1,
                marginBottom: 20,
              }}>
              Order Info
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: COLOURS.black,
                  opacity: 0.5,
                }}>
                Reserved Budget
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: COLOURS.black,
                  opacity: 0.8,
                }}>
                $ {totalBudget}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 22,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: COLOURS.black,
                  opacity: 0.5,
                }}>
                Remaining from budget
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: COLOURS.black,
                  opacity: 0.8,
                }}>
                $ {totalBudget - total}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: COLOURS.black,
                  opacity: 0.5,
                }}>
                Total spend
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: COLOURS.black,
                }}>
                $ {total}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* <View
        style={{
          position: 'absolute',
          bottom: 10,
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => (total != 0 ? checkOut() : null)}
          style={{
            width: '86%',
            height: '90%',
            backgroundColor: COLOURS.blue,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 1,
              color: COLOURS.white,
              textTransform: 'uppercase',
            }}>
            CHECKOUT
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: '100%',
      height: '100%',
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 100,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default OrderedItems;
