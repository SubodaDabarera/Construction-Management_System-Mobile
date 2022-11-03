import {View, Text, StatusBar, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOURS} from '../database/Database';

const ApprovedDeliveryNote = ({navigation}) => {
  const [zip, setZip] = useState();
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [phone, setPhone] = useState();

  const onSubmit = () => {
    console.log(zip, city, province, phone);
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
              marginVertical: 10,
              marginTop: 30,
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
              marginVertical: 10,
            }}>
            <Text
              style={{
                marginHorizontal: 30,
                fontSize: 15,
                marginBottom: 8,
                fontWeight: '700',
                color: COLOURS.red2
              }}>
              Add details related to the delivery when it is approved automatically
            </Text>
            <TextInput
              placeholder="Enter Contact number"
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
                onSubmit();
              }}
              style={{
                paddingVertical: 14,
                marginHorizontal: 20,
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
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ApprovedDeliveryNote;
