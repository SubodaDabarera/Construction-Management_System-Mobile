import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  Animated,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLOURS, Items} from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownComponent from '../common/DropdownComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createOrder} from '../APIs/orderAPI';

const ProductInfo = ({route, navigation}) => {
  const {productData} = route.params;
  const [product, setProduct] = useState(productData);
  const [totalBudget, setTotalBudget] = useState(100000);
  const [value, setValue] = useState(null);
  const [selectedQty, setSelectedQty] = useState(null);
  const [isCreationSuccess, setIsCreationSuccess] = useState(false);
  const [userId, setUserId] = useState('63610c9b67ab4384d0d8c35e');
  const [deliveryFee, setDeliveryFee] = useState(100);

  const width = Dimensions.get('window').width;
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     getDataFromDB();
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  //   product horizontal scroll product card
  const renderProduct = ({item, index}) => {
    return (
      <View
        style={{
          width: width,
          height: 240,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: item}}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  };

  //   add to cart
  const addToCart = async id => {
    if (selectedQty) {
      await console.log(selectedQty);
    } else {
      ToastAndroid.show('Please select Quantity', ToastAndroid.SHORT);
      return;
    }

    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);

      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show(
          'Item Added successfully to cart',
          ToastAndroid.SHORT,
        );
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show(
          'Item Added successfully to cart',
          ToastAndroid.SHORT,
        );
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    }
  };

  // add items to database
  const placeOrder = async product => {
    if (!selectedQty) {
      ToastAndroid.show('Please select Quantity', ToastAndroid.SHORT);
      return;
    }

    // checking the conditions

    // make axios call and send data to backend
    await createOrder(
      {
        ownerId: product.ownerId,
        owner: product.owner,
        title: product.title,
        siteManager: userId,
        productId: product._id,
        quantity: selectedQty,
        unitPrice: product.unitPrice,
        totalAmount: product.unitPrice * selectedQty + deliveryFee,
      },
      setIsCreationSuccess,
    ).then(() => {
      console.log('Order has placed');
      ToastAndroid.show('Order placed', ToastAndroid.SHORT);
      navigation.navigate('Home');
    });
  };

  return (
    <>
      {product && (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: COLOURS.white,
            position: 'relative',
          }}>
          <StatusBar
            backgroundColor={COLOURS.backgroundLight}
            barStyle="dark-content"
          />

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
                backgroundColor: COLOURS.backgroundLight,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 4,
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 16,
                  paddingLeft: 16,
                }}>
                <TouchableOpacity onPress={() => navigation.goBack('Home')}>
                  <Entypo
                    name="chevron-left"
                    style={{
                      fontSize: 18,
                      color: COLOURS.backgroundDark,
                      padding: 12,
                      backgroundColor: COLOURS.white,
                      borderRadius: 10,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <FlatList
                data={
                  product.productImageList ? product.productImageList : null
                }
                horizontal
                renderItem={renderProduct}
                showsHorizontalScrollIndicator={false}
                decelerationRate={0.0}
                snapToInterval={width}
                bounces={false}
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {x: scrollX}}}],
                  {useNativeDriver: false},
                )}
              />
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                  marginTop: 32,
                }}>
                {product.productImageList
                  ? product.productImageList.map((data, index) => {
                      let opacity = position.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.2, 1, 0.2],
                        extrapolate: 'clamp',
                      });

                      return (
                        <Animated.View
                          key={index}
                          style={{
                            width: '16%',
                            height: 2.4,
                            backgroundColor: COLOURS.black,
                            opacity,
                            marginHorizontal: 4,
                            borderRadius: 100,
                          }}></Animated.View>
                      );
                    })
                  : null}
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 16,
                marginTop: 6,
                marginBottom: 130,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 4,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: '600',
                    letterSpacing: 0.5,
                    marginVertical: 4,
                    color: COLOURS.black,
                    maxWidth: '100%',
                  }}>
                  {product.title}
                </Text>
              </View>
              <Text
                style={{
                  ontSize: 12,
                  color: COLOURS.black,
                  fontWeight: '400',
                  letterSpacing: 1,
                  opacity: 0.5,
                  // lineHeight: 20,
                  maxWidth: '85%',
                  // maxHeight: 44,
                  marginBottom: 18,
                }}>
                {product.description}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 6,
                  borderBottomColor: COLOURS.backgroundLight,
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '80%',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      color: COLOURS.blue,
                      backgroundColor: COLOURS.backgroundLight,
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 12,
                      borderRadius: 100,
                      marginRight: 10,
                    }}>
                    <Entypo
                      name="location-pin"
                      style={{
                        fontSize: 16,
                        color: COLOURS.blue,
                      }}
                    />
                  </View>
                  <Text> {product.location}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 6,
                  borderBottomColor: COLOURS.backgroundLight,
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                }}>
                <View
                  style={{
                    // paddingHorizontal: 16,
                    flexDirection: 'row',
                    width: '80%',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      color: COLOURS.blue,
                      backgroundColor: COLOURS.backgroundLight,
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 12,
                      borderRadius: 100,
                      marginRight: 10,
                    }}>
                    <MaterialCommunityIcons
                      name="truck-fast-outline"
                      style={{
                        fontSize: 16,
                        color: COLOURS.blue,
                      }}
                    />
                  </View>
                  <View>
                    <Text>Delivery fee ~ ${deliveryFee}</Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 18,
                  borderBottomColor: COLOURS.backgroundLight,
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                }}>
                <View
                  style={{
                    // paddingHorizontal: 16,
                    flexDirection: 'row',
                    width: '80%',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      color: COLOURS.blue,
                      backgroundColor: COLOURS.backgroundLight,
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 12,
                      borderRadius: 100,
                      marginRight: 10,
                    }}>
                    <MaterialCommunityIcons
                      name="cash"
                      style={{
                        fontSize: 16,
                        color: COLOURS.blue,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text>Total</Text>
                    </View>

                    <View>
                      <Text>
                        = $ {deliveryFee} + ${product.unitPrice}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '500',
                          maxWidth: '85%',
                          color: COLOURS.black,
                          marginBottom: 4,
                        }}>
                        = $ {deliveryFee + product.unitPrice}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* start - dropdown */}
              <View
                style={{
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    marginHorizontal: 20,
                  }}>
                  Select Quantity
                </Text>
                <DropdownComponent
                  qtyUnit={'cubes'}
                  selectedQty={selectedQty}
                  setSelectedQty={setSelectedQty}
                />
              </View>

              {/* end - dropdown */}
            </View>
          </ScrollView>

          {/* overflow button */}
          <View
            style={{
              position: 'absolute',
              bottom: 50,
              height: '8%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() =>
                product.quantity > 0 ? placeOrder(product) : null
              }
              style={{
                width: '86%',
                height: '90%',
                backgroundColor: COLOURS.yellow,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  letterSpacing: 1,
                  color: COLOURS.white,
                  textTransform: 'uppercase',
                }}>
                {product.quantity > 0 ? 'Place order' : 'Not Available'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default ProductInfo;
