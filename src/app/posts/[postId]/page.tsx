'use client'

import React, { useEffect, useState } from 'react';
import { IPost } from '@/types';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function PostSinglePage({
  params,
  searchQuery,
}: {
  params: {
    postId: string;
  };
  searchQuery: {
    q: string;
  };
}) {
  const [post, setPost] = useState({} as IPost);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const response = await fetch(`http://localhost:3000/api/posts/${params.postId}`);
    const data = await response.json();
    setPost(data.data);
  };

  return (
    <Container>
      <Typography variant="h2">Voici votre Post</Typography>
      <Box>
        <Typography variant="h2">{post.title}</Typography>
        <Typography variant="body1">{post.content}</Typography>
      </Box>
      <Link href={`http://localhost:3000/posts/update/${post.id}`} passHref>
        <Button variant="contained" color="primary">
          Modifier le Post
        </Button>
      </Link>
      <Link href="http://localhost:3000/" passHref>
        <Button type="submit" variant="contained" color="primary">
          Retour
        </Button>
      </Link>
    </Container>
  );
}
