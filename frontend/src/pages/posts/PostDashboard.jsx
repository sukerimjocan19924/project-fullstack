import PostHeader from '@/components/posts/PostHeader'
import PostList from '@/components/posts/PostList'
import TagFilterBar from '@/components/posts/TagFilterBar'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useEffect, useState } from 'react'
import './PostPagesAll.scss'
import { getPosts } from '../../api/post.api'
import { useNavigate } from 'react-router-dom'

const PostDashboard = () => {

    const [selectedTag, setSelectedTag] = useState('전체')
    const [searchKeyword, setSearchKeyword] = useState('')
    const [tags, getTags] = useState(['전체'])

    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await getPosts()

                const rawPosts = Array.isArray(response) ? response : response.data

                const mappedPosts = (rawPosts || []).map((post) => ({
                    id: post.id,
                    category: post.category,
                    title: post.title,
                    content: post.content,
                    tags: post.tags || [],
                    thumbnail: post.imageUrl || ''
                }))

                setPosts(mappedPosts)
            } catch (error) {
                console.error("게시글 조회 실패", error)
                setPosts([])
            }
        }
        fetchPost()
    }, [])



    const filteredByTag =
        selectedTag === '전체'
            ? posts
            : posts.filter((post) =>
                post.tags.includes(selectedTag)
            )

            
    const filteredPosts = filteredByTag.filter((post) => {
        const keyword = searchKeyword.toLowerCase().trim()

        if (!keyword) return true

        return (
            post.title.toLowerCase().includes(keyword) ||
            post.content.toLowerCase().includes(keyword)
        )
    })

    const handleCreatePost = () => {
        console.log('새 메모 작성')
        navigate('/app/posts/new')
    }

    return (
        <section className='page post-section'>
            <div className="inner">
                <PostHeader onCreate={handleCreatePost} />

                <div className="input-post">
                    <Input
                      placeholder="게시글 제목 또는 내용을 검색하세요"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)} />
                </div>

                <div className="tags-wrapper">
                    <TagFilterBar
                      tags={tags}
                      selectedTag={selectedTag}
                      onChangeTag={setSelectedTag} />
                    <Button text="전체 게시글 보기" className="wh" />
                </div>
                <PostList posts={filteredPosts} />
            </div>
        </section>
    )
}

export default PostDashboard
