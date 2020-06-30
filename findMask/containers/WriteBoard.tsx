import React, { useState } from 'react';
import {SafeAreaView, GestureResponderEvent, Alert } from 'react-native';
import TextInput from '../components/common/TextInput';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import {WRITE_BOARD} from '../querys/Board';
import { useMutation } from '@apollo/react-hooks';

const WriteBoard = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writeBoard, {data}] = useMutation(WRITE_BOARD);

  if(data){
    if(data.writeBoard){
      //보드 보기로 변경하자 보드 만들고
      Alert.alert("성공",data.writeBoard);
    }
  }

  return (
    <SafeAreaView style={{flex:1, justifyContent:'center'}}>
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
        />
        <Button
          onPress={async (event: GestureResponderEvent) => {
            try{
              await writeBoard({
                variables:{
                  title: title,
                  content: content
                }
              });
            }catch(err){
              Alert.alert("글쓰기 실패", err.message);
            }
            
          }}
          width="80%"
          title="글쓰기"
        />
      </Card>
    </SafeAreaView>
  )
}

export default WriteBoard;