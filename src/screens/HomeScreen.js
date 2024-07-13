import { View, Text, ScrollView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Cog8ToothIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from '../components/categories';
import axios from 'axios';
import Recipes from '../components/recipes';
export default function HomeScreen() {

  const [activeCategory, setActiveCategory] = useState('doce');
  const [categories, setCategories] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(()=>{
    getCategories();
    getRecipes();
  },[])

  const handleChangeCategory = category=>{
    getRecipes(category);
    setActiveCategory(category);
    setDrinks([]);
  }

  const getCategories = async ()=>{
    try{
      const response = await axios.get('https://api-drinks-git-main-leondodes-projects.vercel.app/drinks/categorias');
     // console.log('got categories: ',response.data);
      if(response && response.data){
        setCategories(response.data);
      }
    }catch(err){
      console.log('error: ',err.message);
    }
  }
  const getRecipes = async (category="amargo")=>{
    try{
      const response = await axios.get(`https://api-drinks-git-main-leondodes-projects.vercel.app/drinks/tags/${category}`);
       //console.log('got recipes: ',response.data);
      if(response && response.data){
        setDrinks(response.data);
      }
    }catch(err){
      console.log('error: ',err.message);
    }
  }
 
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className="space-y-6 pt-14"
      >
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image source={require('../../assets/images/avatar.png')} style={{height: hp(5), width: hp(5.5)}} />
          <Cog8ToothIcon size={hp(3)} color="gray" />
          
        </View>


        <View className="mx-4 space-y-2 mb-2">
          <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">
            <Text className="text-green-600">DrinkHub</Text>
          </Text>
        </View>

        {/* search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder='Search any recipe'
            placeholderTextColor={'gray'}
            style={{fontSize: hp(1.7)}}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        {/* categorias */}
        <View>
          { categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} /> }
        </View>

        
        <View>
        <Recipes drinks={drinks} categories={categories} /> 
        </View>
      </ScrollView>
    </View>
  )
}