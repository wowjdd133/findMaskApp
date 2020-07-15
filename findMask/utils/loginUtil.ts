import { AsyncStorage } from "react-native";

export const isEmail = (email:string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email);
};

export const isLogin = async () => {
  const token = await AsyncStorage.getItem('token');

  return token != null;
}