import { Ionicons } from "@expo/vector-icons"
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { BackHandler, StatusBar, StyleSheet } from "react-native"
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { RFValue } from "react-native-responsive-fontsize"
import { useTheme } from "styled-components"
import Logo from "../../assets/logo.svg"
import { Car } from "../../components/Car"
import { Loading } from "../../components/Loading"
import { CarDTO } from "../../dtos/CarDTO"
import { api } from "../../services/axios"
import { CarList, Header, HeaderContent, HomeContainer, TotalCar } from "./styles"

const ButtonAnimated = Animated.createAnimatedComponent(RectButton)

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const theme = useTheme()

  const positionX = useSharedValue(0)
  const positionY = useSharedValue(0)

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.positionX = positionX.value
      ctx.positionY = positionY.value
    },
    onActive: (event, ctx: any) => {
      positionX.value = ctx.positionX + event.translationX
      positionY.value = ctx.positionY + event.translationY
    },
    onEnd: () => {
      positionX.value = withSpring(0)
      positionY.value = withSpring(0)
    },

  })

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },

      ]
    }
  })


  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  function handleMyCar() {
    navigation.navigate('MyCar')
  }

  useEffect(() => {
    async function fetchCar() {
      try {
        const response = await api.get('/cars')
        setCars(response.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCar()
  }, [])

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  }, [])

  return (
    <HomeContainer>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {
            !loading && (
              <TotalCar>Total de {cars.length} Carros</TotalCar>
            )
          }
        </HeaderContent>
      </Header>

      {
        loading
          ? <Loading />
          : <CarList
            data={cars}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
          />
      }

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22
            }
          ]}
        >
          <ButtonAnimated onPress={handleMyCar} style={[
            styles.button,
            { backgroundColor: theme.colors.main }
          ]}>

            <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </HomeContainer>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
