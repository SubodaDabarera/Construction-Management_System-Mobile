import {
  View,
  Text,
  ToastAndroid,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {COLOURS} from '../database/Database';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordPass, setIsPasswordPass] = useState(false);
  const [isEmailPass, setIsEmailPass] = useState(false);

  const onSignIn = async () => {
    let emailPass;
    let passwordPass;

    if (email.length > 0) {
      setIsEmailPass(true);
      emailPass = true;
    } else {
      setIsEmailPass(false);
      emailPass = false;
    }
    if (password.length > 0) {
      setPassword(true);
      passwordPass = true;
    } else {
      setIsPasswordPass(false);
      passwordPass = false;
    }

    if (email.length > 0 && password.length > 0) {
      ToastAndroid.show('LogIn success!', ToastAndroid.SHORT);
      navigation.navigate('Home');
    } else {
      ToastAndroid.show('Please use correct credential', ToastAndroid.SHORT);
    }
  };

  return (
    <View
      style={{
        backgroundColor: COLOURS.white,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
      }}>
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
      <ImageBackground
        source={{
          uri: 'https://media.gettyimages.com/photos/happy-construction-worker-cleaning-his-gloves-from-sawdust-at-in-picture-id1161937292?b=1&k=20&m=1161937292&s=170667a&w=0&h=41OKMqjQgWG0jD1WkTiqjRTyIlWEF3CR1YiKTJGfnnc=',
        }}
        resizeMode="cover">
        <ScrollView
          style={{
            height: '100%',
            backgroundColor: 'rgba(52, 52, 52, 0.4)',
          }}>
          {/* <View
          style={{
            height: 200,
          }}>
          <Image
            source={{
              uri: 'https://thumbs.dreamstime.com/b/construction-site-safety-protective-hard-hat-headphones-gloves-glasses-masks-wooden-background-copy-space-top-view-118925419.jpg',
            }}
            style={{
              width: '100%',
              height: '100%',
              // resizeMode: 'contain',
            }}
          />
        </View> */}

          <View
            style={{
              marginVertical: '45%',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '700',
                  color: COLOURS.white,
                }}>
                Sign In
              </Text>
            </View>
            <View>
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
                    color: COLOURS.light,
                  }}>
                  Email address
                </Text>
                <TextInput
                  placeholder="Enter Email"
                  style={{
                    backgroundColor: COLOURS.backgroundLight,
                    borderRadius: 30,
                    marginHorizontal: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 8,
                  }}
                  onChangeText={setEmail}
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
                    color: COLOURS.light,
                  }}>
                  Password
                </Text>
                <TextInput
                  placeholder="Enter Password"
                  secureTextEntry={true}
                  style={{
                    backgroundColor: COLOURS.backgroundLight,
                    borderRadius: 30,
                    marginHorizontal: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 8,
                  }}
                  onChangeText={setPassword}
                />
              </View>

              <View
                style={{
                  marginTop: 40,
                  marginBottom: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    onSignIn();
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
                      fontSize: 14,
                      fontWeight: '500',
                      letterSpacing: 1,
                      color: COLOURS.white,
                      textTransform: 'uppercase',
                    }}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default SignIn;
