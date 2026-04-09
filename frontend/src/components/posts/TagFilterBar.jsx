import React from 'react'
import PostTag from './PostTag'
import './PostComponentAll.scss'
import { createTag, deleteTag, getMyTags } from '@/api/tag.api'

const TagFilterBar = ({tags}) => {
  return (
    <div className='tags'>
      <span>#tag:</span>
      {tags.map((tag, i) => (

        <PostTag
          key={`${tag}-${i}`}
          tag={tag} />
      ))}

    </div>
  )
}

export default TagFilterBar
