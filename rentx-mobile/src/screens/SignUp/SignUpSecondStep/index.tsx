import { NavigationProp, ParamListBase, useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "styled-components";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { PasswordInput } from "../../../components/PasswordInput";
import { Form, FormTitle, Header, SignUpSecondStepContainer, Steps, SubTitle, Title } from "./styles";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string
  }
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const theme = useTheme()

  const route = useRoute()
  const { user } = route.params as Params

  function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Informe a senha e confirmação')
    }
    if (password != passwordConfirm) {
      return Alert.alert('As senhas precisam ser iguais')
    }

    navigation.navigate('Confirmation' , {
        title: 'Conta Criada',
        nextScreenRoute: 'SignIn'

    })
    // enviar para API
  }


  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <KeyboardAvoidingView
      behavior="position"
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SignUpSecondStepContainer>
          <Header>
            <BackButton onPress={handleGoBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Crie sua{'\n'}
            conta
          </Title>
          <SubTitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil.
          </SubTitle>

          <Form>
            <FormTitle>02. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button title="Cadastrar" onPress={handleRegister} color={theme.colors.success} />

        </SignUpSecondStepContainer>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  )
}
