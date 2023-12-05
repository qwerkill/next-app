import Image from 'next/image'
import styles from './page.module.css'
import PostsListComponent from '@/components/post/PostsListComponent'

export default function Home() {
  return (
    <div>
      <PostsListComponent />
    </div>
  )
}
