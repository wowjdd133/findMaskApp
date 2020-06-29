import React from 'react';
import styled from 'styled-components/native';

interface TextInputType extends TextInputStyleType {
  value: string;
  setValue: any;
  onChangeText?: (text: string) => void;
  placeholder: string,
  isPassword?: boolean
}

interface TextInputStyleType {
  height: number,
  radius?: number,
  marginTop: number,
}

const TextInput = styled.TextInput`
  width: 80%;
  borderRadius: ${(props: TextInputStyleType) => props.radius}px;
  height: ${(props: TextInputStyleType) => props.height}px;
  borderWidth: 1px;
  marginTop: ${(props: TextInputStyleType) => props.marginTop}px;
  paddingLeft: 10px;
  backgroundColor: #f8f9fa;
  borderColor: #e9ecef;
`

const TextInputC = ({
  height = 30,
  onChangeText,
  value,
  setValue,
  placeholder,
  radius = 5,
  marginTop = 0,
  isPassword = false
}: TextInputType) => {

  onChangeText = (text) => {
    setValue(text);
  }

  return (
    isPassword ?
      <TextInput
        secureTextEntry={true}
        marginTop={marginTop}
        placeholder={placeholder}
        height={height}
        onChangeText={onChangeText}
        value={value}
        radius={radius}
      /> : <TextInput
        marginTop={marginTop}
        placeholder={placeholder}
        height={height}
        onChangeText={onChangeText}
        value={value}
        radius={radius}
      />

  )
}

export default TextInputC;