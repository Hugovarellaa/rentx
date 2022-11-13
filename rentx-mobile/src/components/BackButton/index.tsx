import { MaterialIcons } from "@expo/vector-icons"
import { TouchableOpacityProps } from "react-native"
import { useTheme } from "styled-components"
import { BackButtonContainer } from "./styles"

interface BackButtonProps extends TouchableOpacityProps {
  color?: string
}

export function BackButton({ color, ...rest }: BackButtonProps) {
  const theme = useTheme()
  return (
    <BackButtonContainer {...rest}>
      <MaterialIcons name="chevron-left" size={24} color={color ? color : theme.colors.text} />
    </BackButtonContainer>
  )
}
