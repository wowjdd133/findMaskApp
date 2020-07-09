import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Keyboard, Image, Alert, GestureResponderEvent, TouchableWithoutFeedback } from 'react-native';
import CardC from '../common/Card';
import TextInputC from '../common/TextInput';
import ButtonC from '../common/Button';
import TextC from '../common/Text';

interface WriteBoardProps {
  handleGetImage: (e: GestureResponderEvent) => Promise<void>;
  handleWrite: (e: GestureResponderEvent) => Promise<void>;
  title: string;
  setTitle: any;
  content: string;
  setContent: any;
  selected: {
    image: string | null
  };
}

const WriteBoard = (props: WriteBoardProps) => {

  const {
    handleGetImage,
    handleWrite,
    title,
    setTitle,
    content,
    setContent,
    selected,
  } = props;

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        extraHeight={0}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
      >
        <TouchableWithoutFeedback
          accessible={false}
          style={{ flex: 1, justifyContent: 'center' }}
          onPress={Keyboard.dismiss}
        >
          <CardC justifyContent="space-evenly" flex={1}>
            <CardC flex={2}>
              <TextInputC
                marginTop={40}
                height="45px"
                placeholder="제목"
                setValue={setTitle}
                value={title}
                maxLength={20}
              />
              <TextInputC
                marginTop={15}
                height="300px"
                width="90%"
                placeholder="본문"
                setValue={setContent}
                value={content}
                maxLength={400}
                multiline
                numOfLines={10}
                onEndEditing={Keyboard.dismiss}
              />
            </CardC>
            <CardC flex={1} marginTop={40}>
              <CardC flex={1} height="40%" row justifyContent="space-around">
                {selected.image ?
                  <Image source={{ uri: selected.image }} style={{ width: 100, height: 100, alignSelf: 'center', resizeMode: 'contain' }} /> :
                  <CardC height="100px" backgroundColor='#999999'>
                    <TextC fontSize={32}>사진</TextC></CardC>}
                <ButtonC
                  backgroundColor="#eeeeee"
                  color="#000000"
                  onPress={handleGetImage}
                  title="사진 올리기"
                />
              </CardC>
              <CardC flex={1} marginTop={30}>
                <ButtonC
                  backgroundColor="#eeeeee"
                  color="#000000"
                  onPress={handleWrite}
                  width="80%"
                  title="글쓰기"
                />
              </CardC>
            </CardC>
          </CardC>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
};

export default WriteBoard;