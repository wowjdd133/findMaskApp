import React, { useState } from 'react';
import { SafeAreaView, GestureResponderEvent, Alert, InputAccessoryView, Keyboard, Button, TouchableOpacity } from 'react-native';
import TextInput from '../components/common/TextInput';
import Card from '../components/common/Card';
import ButtonC from '../components/common/Button';
import { WRITE_BOARD } from '../querys/Board';
import { useMutation } from '@apollo/react-hooks';

const WriteBoard = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writeBoard, { data }] = useMutation(WRITE_BOARD);

  if (data) {
    if (data.writeBoard) {
      //보드 보기로 변경하자 보드 만들고
      Alert.alert("성공", data.writeBoard);
    }
  }

  return (
    <>

      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity
          style={{flex:1, justifyContent:'center'}}
          onPress={Keyboard.dismiss}
        >
          <Card justifyContent="space-around">
            <TextInput
              height="10%"
              placeholder="제목"
              setValue={setTitle}
              value={title}
              maxLength={20}
            />

            <TextInput
              height="50%"
              placeholder="본문"
              setValue={setContent}
              value={content}
              maxLength={400}
              multiline
              numOfLines={10}
              onEndEditing={Keyboard.dismiss}
            />
            <ButtonC
              backgroundColor="#eeeeee"
              color="#000000"
              onPress={async (event: GestureResponderEvent) => {
                event.preventDefault()
                console.log(title);
                if (title.length >= 2) {
                  if (content.length >= 5) {
                    try {
                      await writeBoard({
                        variables: {
                          title: title,
                          content: content
                        }
                      });
                    } catch (err) {
                      Alert.alert("글쓰기 실패", err.message);
                    }
                    return;
                  }
                  Alert.alert("글쓰기 실패", "본문 글자 수 확인.");
                  return;
                }
                Alert.alert("글쓰기 실패", "제목 글자 수 확인.")
              }}
              width="80%"
              title="글쓰기"
            />
          </Card>
        </TouchableOpacity>
      </SafeAreaView>

    </>
  )
}

export default WriteBoard;