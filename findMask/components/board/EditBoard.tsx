import React from 'react';
import { Button, TextInput } from 'react-native-paper';
import CardC from '../common/Card';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputC from '../common/TextInput';
import { GestureResponderEvent } from 'react-native';

interface EditBoardProps {
  title:string;
  content:string;
  setTitle: any;
  setContent: any;
  handleModify: () => Promise<void>;
}

const EditBoard = (props:EditBoardProps) => {
  return(
    <SafeAreaView style={{flex:1}}>
      <CardC flex={1}>
        <CardC height="50px" align="flex-end">
          <Button 
            mode="outlined" 
            style={{marginTop:15, marginRight:25}}
            onPress={props.handleModify}>
            수정 완료
          </Button>
        </CardC>
        <CardC flex={10}>
          <TextInputC
            height="45px"
            placeholder="title"
            maxLength={20}
            setValue={props.setTitle}
            value={props.title}
          />
          <TextInputC
            marginTop={20}
            maxLength={400}
            height="80%"
            placeholder="content"
            value={props.content}
            setValue={props.setContent}
          />
        </CardC>
      </CardC>
    </SafeAreaView>
    
  )
}

export default EditBoard;