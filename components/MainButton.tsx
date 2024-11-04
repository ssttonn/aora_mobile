import { TouchableOpacity, Text } from 'react-native'
import React, { ReactNode } from 'react'

interface MainButtonProps {
    className?: string,
    children?: ReactNode
    title?: string,
    onPress?: (event: any) => void
}

const MainButton = ({className, children, title, onPress}: MainButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${className}`}
    >
      {children || <Text className="text-primary font-psemibold text-lg">{title ?? ""}</Text>}
    </TouchableOpacity>
  );
}

export default MainButton