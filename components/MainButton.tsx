import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import React, { ReactNode } from 'react'

interface MainButtonProps {
    className?: string,
    children?: ReactNode
    title?: string,
    disabled?: boolean,
    isLoading?: boolean,
    onPress?: (event: any) => void
}

const MainButton = ({className, children, title, disabled, isLoading, onPress}: MainButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      onPress={onPress}
      className={`rounded-xl min-h-[62px] justify-center items-center ${className}`}
    >
      {isLoading ? <ActivityIndicator color="#161622" /> : children || <Text className="text-primary font-psemibold text-lg">{title ?? ""}</Text>}
    </TouchableOpacity>
  );
}

export default MainButton