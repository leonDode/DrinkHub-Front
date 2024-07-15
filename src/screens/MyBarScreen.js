import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PlusCircleIcon, HomeIcon, BookmarkIcon, IdentificationIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { URL } from '../helpers/url';

export default function MyBarScreen() {
  const [items, setItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getIngredientes();
  }, []);

  const getIngredientes = async () => {
    try {
      const response = await axios.get(`${URL}/ingredientes`);
      if (response && response.data) {
        setItems(response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
    }
  };







  const renderItem = ({ item }) => (
    <View className='flex-1 items-center m-2 p-4 bg-white rounded-lg shadow-lg'>
      <Image source={{ uri: item.img_ingrediente }} style={{ width: wp(24), height: hp(15), resizeMode: 'contain' }} />

      <View className='mt-2 items-center' style={{ height: hp(10), justifyContent: 'space-between' }}>
      <Text className='mt-2  text-center' style={{fontSize: hp(1.8)}}>{item.nome}</Text>
      <TouchableOpacity className='mt-2 w-8 h-8 rounded-full items-center justify-center bg-white' >
        <PlusCircleIcon />
      </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className='flex-1 bg-gray'>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle='p-2'
      />
      <View className="flex-row justify-around items-center p-4 bg-white border-t border-gray-200">
       <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
           <HomeIcon size={hp(3)} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity >
          <IdentificationIcon size={hp(3)} color="black"/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> navigation.navigate('Saved')}>
         <BookmarkIcon size={hp(3)} color="gray"  />

        </TouchableOpacity>
        </View>
    </View>
    
  );
}
