import { StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { Button } from "../../components/Button";
import { Footer, Header, SignInContainer, SubTitle, Title } from "./styles";

export function SignIn() {
  const theme = useTheme()

  return (
    <SignInContainer>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Header>
        <Title>Estamos {'\n'}quase lá.</Title>
        <SubTitle>
          Faça seu login para começar{'\n'}
          uma experiência incrível.
        </SubTitle>
      </Header>

      <Footer>
        <Button
          title="Login"
          onPress={() => { }}
        />
        <Button
          title="Criar conta gratuita"
          onPress={() => { }}
          light
          color={theme.colors.background_secondary}
        />
      </Footer>
    </SignInContainer>
  )
}
