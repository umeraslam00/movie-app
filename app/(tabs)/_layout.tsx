import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'

const TabIcon = ({ name, icon, focused }: {
  name: string
  icon: any // or ImageSourcePropType for better typing
  focused: boolean
}) => {

  if (focused) {
    return (
      <ImageBackground source={images.highlight}
      className='flex-1 flex-row rounded-full w-full min-w-[86px] h-full min-h-[55px] mt-4 items-center justify-center overflow-hidden mr-2 p-2'
      >
        <Image source={icon} tintColor="#151312" className='size-5' />
        <Text className='text-secondary text-base font-semibold ml-2'>{name}</Text>
      </ImageBackground>
    )
  }
  return (
    <View className='flex flex-row items-center justify-center rounded-full w-full min-w-[112px] h-14 mt-4 bg-transparent'>
        <Image source={icon} tintColor="#A8B5DB" className='size-5' />
        <Text className='text-secondary text-base font-semibold ml-2'>{name}</Text>

    </View>

  )
}


const _layout = () => {
  return (
    
    <Tabs screenOptions={{
      tabBarShowLabel: false,
      tabBarItemStyle: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      },
      tabBarStyle: {
        backgroundColor: '#0f0d23',
        borderRadius: 50,
        marginHorizontal: 20,
        marginBottom: 36,
        height: 52,
        position: 'absolute',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#0f0d23'
      }
    }}>

        <Tabs.Screen
            name='index'
            options={{
                headerShown: false,
                title: 'Home',
                tabBarIcon: ({ focused }) => (
                  <TabIcon name={'Home'} icon={icons.home} focused={focused}/>
                )
            }}
        />

        <Tabs.Screen
          name='profile'
          options={{
            headerShown: false,
            title: 'Profile',
            tabBarIcon: ({focused}) => (
              <TabIcon name={'Profile'} icon={icons.person} focused={focused}/>
            )
          }}
        />

        <Tabs.Screen
          name='saved'
          options={{
            headerShown: false,
            title: 'Saved',
            tabBarIcon: ({focused}) => (
              <TabIcon name={'saved'} icon={icons.save} focused={focused}/>
            )
          }}
        />

        <Tabs.Screen
          name='search'
          options= {{
            headerShown: false,
            title: 'Search',
            tabBarIcon: ({focused}) => (
              <TabIcon name={'Search'} icon={icons.search} focused={focused}/>
            )

          }}
        />

    </Tabs>
  )
}

export default _layout