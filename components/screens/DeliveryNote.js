import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {COLOURS} from '../database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {addDeliveryNote, updateDeliveryNoteStatus_Orders} from '../APIs/deliveryNoteAPI';

const DeliveryNote = ({route, navigation}) => {
  // const [zip, setZip] = useState();
  const [zip, setZip] = useState();
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [phone, setPhone] = useState();
  const [isCreationSuccess, setIsCreationSuccess] = useState(false);

  const {OrderID} = route.params;

  const onSubmit = async () => {
    // console.log(zip, city, province, phone);

    if (
      zip.length > 0 &&
      city.length > 0 &&
      province.length > 0 &&
      phone.length > 0
    ) {
      console.log(zip, city, province, phone);
      console.log(OrderID);

      // axios call here...
      await addDeliveryNote(
        {orderId: OrderID, zip, city, province, siteManagerMobile: phone},
        setIsCreationSuccess,
      )
        .then(() => {
          console.log('Delivery note added');
          ToastAndroid.show('Delivert note added!', ToastAndroid.SHORT);
        })
        .catch(err => {
          console.log(err);
          ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
        });

      Keyboard.dismiss();

      await updateDeliveryNoteStatus_Orders(OrderID, true).then(() => {
        console.log("Delivery note updated")
      }).catch((err) => {
        console.log(err)
      })

      setCity('');
      setZip('');
      setProvince('');
      setPhone('');

      navigation.navigate('Home');
    }
  };

  return (
    <View
      style={{
        backgroundColor: COLOURS.white,
        height: '100%',
        width: '100%',
      }}>
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
      <ScrollView
        style={{
          height: '100%',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: 'row',
            marginTop: 20,
            marginHorizontal: 20,
          }}>
          <MaterialCommunityIcons
            name="chevron-left"
            style={{
              fontSize: 18,
              color: COLOURS.backgroundDark,
              padding: 12,
              backgroundColor: COLOURS.backgroundLight,
              borderRadius: 12,
              flexDirection: 'row',
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
            marginTop: 30,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              color: COLOURS.black,
            }}>
            Delivery note
          </Text>
        </View>
        <View>
          <View
            style={{
              marginHorizontal: 30,
              marginTop: 30,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 16,
              }}>
              Order ID :
            </Text>
            <Text
              style={{
                color: COLOURS.blue,
                marginHorizontal: 10,
              }}>
              {OrderID}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 10,
              marginTop: 20,
            }}>
            <Text
              style={{
                marginHorizontal: 30,
                fontSize: 15,
                marginBottom: 8,
                fontWeight: '700',
              }}>
              Zip code
            </Text>
            <TextInput
              placeholder="Enter Zip code"
              style={{
                backgroundColor: COLOURS.backgroundLight,
                borderRadius: 30,
                marginHorizontal: 20,
                paddingHorizontal: 20,
                paddingVertical: 8,
              }}
              onChangeText={setZip}
            />
          </View>
          <View
            style={{
              marginVertical: 10,
            }}>
            <Text
              style={{
                marginHorizontal: 30,
                fontSize: 15,
                marginBottom: 8,
                fontWeight: '700',
              }}>
              City
            </Text>
            <TextInput
              placeholder="Enter city"
              style={{
                backgroundColor: COLOURS.backgroundLight,
                borderRadius: 30,
                marginHorizontal: 20,
                paddingHorizontal: 20,
                paddingVertical: 8,
              }}
              onChangeText={setCity}
            />
          </View>
          <View
            style={{
              marginVertical: 10,
            }}>
            <Text
              style={{
                marginHorizontal: 30,
                fontSize: 15,
                marginBottom: 8,
                fontWeight: '700',
              }}>
              Province
            </Text>
            <TextInput
              placeholder="Enter Province"
              style={{
                backgroundColor: COLOURS.backgroundLight,
                borderRadius: 30,
                marginHorizontal: 20,
                paddingHorizontal: 20,
                paddingVertical: 8,
              }}
              onChangeText={setProvince}
            />
          </View>
          <View
            style={{
              marginVertical: 10,
            }}>
            <Text
              style={{
                marginHorizontal: 30,
                fontSize: 15,
                marginBottom: 8,
                fontWeight: '700',
              }}>
              Contact number of site manager
            </Text>
            <TextInput
              placeholder="Enter Contact number"
              type="number"
              style={{
                backgroundColor: COLOURS.backgroundLight,
                borderRadius: 30,
                marginHorizontal: 20,
                paddingHorizontal: 20,
                paddingVertical: 8,
              }}
              onChangeText={setPhone}
            />
          </View>

          <View
            style={{
              marginTop: 40,
              marginBottom: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                onSubmit()
              }}
              style={{
                paddingVertical: 14,
                marginHorizontal: 20,
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
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DeliveryNote;
