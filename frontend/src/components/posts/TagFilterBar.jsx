import React, {useState, useEffect} from 'react'
import PostTag from './PostTag'
import './PostComponentAll.scss'
import { createTag, deleteTag, getMyTags } from '@/api/tag.api'

const TagFilterBar = () => {

  const [tags, setTags] = useState([])

  const fetchTags = async () => {
    try {
      const res = await getMyTags()
      setTags(res)
    } catch (err) {
      console.error('태그 불러오기 실패:', err)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  // const handleDeleteTag = async (tagId) => {
  //   try {
  //     await deleteTag(tagId)
  //     await fetchTags()
  //   } catch (err) {
  //     console.error('태그 삭제 실패:', err)
  //   }
  // }

  return (
    <div className='tags'>
      <span>#tag:</span>
      {tags.map((tag, i) => (

        <PostTag
          key={tag.id || i}
          tag={tag.label}/>
          // onClick={() => handleDeleteTag(tag.id)} />
      ))}
    </div>
  )
}

export default TagFilterBar
