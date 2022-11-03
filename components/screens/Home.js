import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {COLOURS, Items} from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {viewProductsList} from '../APIs/productAPI';
// import { viewProductsList } from '../APIs/productAPI';

const Home = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      viewProductsList(setProductList);
    });

    return unsubscribe;
  }, [navigation]);

  //   get data from DB
  const getDataFromDB = () => {
    let productList = [];
    let accessoriesList = [];
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].category == 'product') {
        productList.push(Items[index]);
      } else if (Items[index].category == 'accessory') {
        accessoriesList.push(Items[index]);
      }
    }

    setProducts(productList);
    setAccessories(accessoriesList);
  };

  // create an product reusable card
  const ProductCard = ({data}) => {
    return (
      <TouchableOpacity
        style={{
          width: '48%',
          marginVertical: 14,
        }}
        onPress={() => navigation.navigate('ProductInfo', {productData: data})}>
        <View
          style={{
            width: '100%',
            height: 100,
            borderRadius: 10,
            backgroundColor: COLOURS.backgroundLight,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
          }}>
          {data.isOff ? (
            <View
              style={{
                position: 'absolute',
                width: '20%',
                height: '24%',
                backgroundColor: COLOURS.green,
                top: 0,
                left: 0,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.white,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}>
                {data.offPercentage}%
              </Text>
            </View>
          ) : null}

          {data.productImage && (
            <Image
              source={{uri: data.productImage}}
              style={{
                width: '80%',
                height: '80%',
                resizeMode: 'contain',
              }}
            />
          )}
        </View>
        <Text
          style={{
            fontSize: 12,
            color: COLOURS.black,
            fontWeight: '600',
            marginBottom: 2,
          }}>
          {data.title}
        </Text>
        {data.quantity > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesome
              name="circle"
              style={{
                fontSize: 12,
                marginRight: 6,
                color: COLOURS.green,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: COLOURS.green,
              }}>
              Available
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesome
              name="circle"
              style={{
                fontSize: 12,
                marginRight: 6,
                color: COLOURS.red,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: COLOURS.red,
              }}>
              Unavailable
            </Text>
          </View>
        )}
        <Text>$ {data.unitPrice}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
      }}>
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />

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
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
            onPress={() => navigation.navigate('ApprovedDeliveryNote')}>
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            margin: 14,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('OrderedItems')}>
            <MaterialCommunityIcons
              name="menu"
              style={{
                fontSize: 32,

                padding: 12,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            placeholder="Search . . ."
            style={{
              backgroundColor: COLOURS.backgroundLight,
              borderRadius: 30,
              marginHorizontal: 20,
              paddingHorizontal: 20,
              paddingVertical: 8,
            }}
            // onChangeText={setZip}
          />
        </View>
        {/* <View
          style={{
            marginBottom: 8,
            padding: 16,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: COLOURS.black,
              fontWeight: '500',
              letterSpacing: 1,
              marginBottom: 10,
            }}>
            Construction management
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: '400',
              letterSpacing: 1,
              lineHeight: 24,
            }}>
            This online store offeres ordering items realtime
          </Text>
        </View> */}

        <View
          style={{
            padding: 16,
          }}>
          <View
            style={{
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                }}>
                Products
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.black,
                  fontWeight: '400',
                  opacity: 0.5,
                  marginLeft: 10,
                }}>
                {productList.length}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: '400',
              }}>
              SeeAll
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              marginBottom: 30,
            }}>
            {productList.map(data => {
              return <ProductCard data={data} key={data._id} />;
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
