import React, {useState, useEffect} from 'react'
import PostTag from './PostTag'
import './PostComponentAll.scss'
import { createTag, deleteTag, getMyTags } from '@/api/tag.api'

const TagFilterBar = ({ tags, selectedTag, onChangeTag }) => {

  const [myTags, setMyTags] = useState([])

  const fetchTags = async () => {
    try {
      const res = await getMyTags()
      setMyTags(res)
    } catch (err) {
      console.error('태그 불러오기 실패:', err)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  return (
    <div className='tags'>
      <span>#tag:</span>
      {tags.map((tag, i) => (

        <PostTag
          key={i}
          tag={tag}
          className={selectedTag === tag ? 'active' : ''}
          onClick={() => onChangeTag(tag)}
          showDelete={false} />
      ))}
    </div>
  )
}

export default TagFilterBar
