import React, { useState } from 'react';
import { GestureResponderEvent, Alert, Platform, Keyboard, TouchableOpacity, Image } from 'react-native';
import TextInput from '../components/common/TextInput';
import * as Permissions from 'expo-permissions';
import ButtonC from '../components/common/Button';
import { WRITE_BOARD } from '../querys/Board';
import { useMutation } from '@apollo/react-hooks';
import * as ImagePicker from 'expo-image-picker';
import CardC from '../components/common/Card';
import TextC from '../components/common/Text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import WriteBoard from '../components/board/WriteBoard';

interface selectType {
  image: string | null;
}

const WriteBoardContainer = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writeBoard, { data }] = useMutation(WRITE_BOARD);
  const [selected, setSelected] = useState<selectType>({ image: null });

  const Navigation = useNavigation();

  if (data) {
    if (data.writeBoard) {
      //보드 보기로 변경하자 보드 만들고
      Alert.alert("성공", "글쓰기 성공");
      Navigation.navigate("Board", {
        id: data.writeBoard
      });
    }
  }

  const requestPermission = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      return status === 'granted';
    }

    return true;
  }

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });

      if (!result.cancelled) {
        setSelected({ image: result.uri });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleGetImage = async (e: GestureResponderEvent): Promise<void> => {
    e.preventDefault();
    if (await requestPermission()) {
      await _pickImage();
    } else {
      Alert.alert("실행 실패", "권한을 허용해야 사용이 가능합니다.");
    }
  }

  const handleWrite = async (event: GestureResponderEvent) => {
    event.preventDefault()
    if (title.length >= 2) {
      if (content.length >= 5) {
        try {
          if (selected) {
            await writeBoard({
              variables: {
                title: title,
                content: content,
                image: selected.image
              }
            });
          } else {
            await writeBoard({
              variables: {
                title: title,
                content: content
              }
            });
          }
        } catch (err) {
          Alert.alert("글쓰기 실패", err.message);
        }
        return;
      }
      Alert.alert("글쓰기 실패", "본문 글자 수 확인.");
      return;
    }
    Alert.alert("글쓰기 실패", "제목 글자 수 확인.")
  }

  return (
    <WriteBoard
      content={content}
      handleGetImage={handleGetImage}
      handleWrite={handleWrite}
      selected={selected}
      setContent={setContent}
      setTitle={setTitle}
      title={title}
    />
  )
}

export default WriteBoardContainer;