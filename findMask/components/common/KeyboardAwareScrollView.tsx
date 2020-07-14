import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface KeyboardAwareScrollViewComponentProps {
  children: React.ReactNode;
}

const KeyboardAwareScrollViewComponent = ({children}:KeyboardAwareScrollViewComponentProps) => {
  return(
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      extraHeight={0}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      resetScrollToCoords={{ x: 0, y: 0 }}
    >
      {children}
    </KeyboardAwareScrollView>
  )
}

export default KeyboardAwareScrollViewComponent;