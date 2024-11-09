import { FlatList, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { HomeAppDispatch, HomeRootState } from '@/stores/homeStore'
import { searchActions } from '@/reducers/main/searchReducer'
import VideoCard from '@/components/VideoCard'

const SearchPage = () => {
  const {query} = useLocalSearchParams()
  const dispatch = useDispatch<HomeAppDispatch>()
  const {posts, status} = useSelector((state: HomeRootState) => state.search)

  useEffect(() => {
    dispatch(searchActions.searchPosts(query as string || ''))
  }, [query])

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList 
        data={[] as any}
        renderItem={({ item }) => <VideoCard videoPost={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  )
}

export default SearchPage