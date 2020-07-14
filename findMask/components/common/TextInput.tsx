import React from 'react';
import styled from 'styled-components/native';
import { TextInputEndEditingEventData, NativeSyntheticEvent } from 'react-native';

interface TextInputType extends TextInputStyleType {
  value: string;
  setValue: any;
  onChangeText?: (text: string) => void;
  onEndEditing?: (event: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
  placeholder: string,
  isPassword?: boolean,
  maxLength?: number,
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'name-phone-pad' | 'visible-password' | 'twitter' | 'web-search';
  multiline?: boolean,
  numOfLines?: number,
  InputAccessoryViewID?: string,
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send' | 'none' | 'previous' | 'default' | 'emergency-call' | 'google' | 'join' | 'route' | 'yahoo';
}

interface TextInputStyleType {
  height?: string,
  width?: string,
  radius?: number,
  marginTop?: number,
}

const TextInput = styled.TextInput`
  height:${(props: TextInputStyleType) => props.height};
  width:${(props: TextInputStyleType) => props.width};
  borderRadius: ${(props: TextInputStyleType) => props.radius}px;
  borderWidth: 1px;
  marginTop: ${(props: TextInputStyleType) => props.marginTop}px;
  paddingLeft: 10px;
  backgroundColor: #f8f9fa;
  borderColor: #e9ecef;
  fontSize: 18px;
  ${(props: TextInputType) => props.multiline ? 'textAlignVertical: top;' : ''}
`

const TextInputC = ({
  height = "30px",
  width = "80%",
  onChangeText,
  value,
  setValue,
  placeholder,
  radius = 5,
  marginTop = 0,
  isPassword = false,
  keyboardType = 'default',
  maxLength = 40,
  onEndEditing,
  multiline,
  numOfLines,
  InputAccessoryViewID,
  returnKeyType,
}: TextInputType) => {

  if (!onChangeText) {
    onChangeText = (text) => {
      setValue(text);
    }
  }

  const textInputProps = {
    onChangeText,
    height,
    value,
    setValue,
    placeholder,
    radius,
    marginTop,
    isPassword,
    keyboardType,
    maxLength,
    onEndEditing,
    multiline,
    numOfLines,
    width,
    InputAccessoryViewID,
    returnKeyType,
  }

  return (
    isPassword ?
      (<TextInput
        secureTextEntry={true}
        {...textInputProps}
      />) : (
        <TextInput
          {...textInputProps}
        />
      )
  )
}

export default TextInputC;