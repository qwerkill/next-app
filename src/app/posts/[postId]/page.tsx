// 'use client '

import React from 'react'


export default function PostSinglePage({
    params,
    searchQuery
}:{
    params: {
        postId: string
    }
    searchQuery:{
        q : string 
    }
}) {
  return (
    <div>PostSinglePage - {params.postId} - </div>
  )
}