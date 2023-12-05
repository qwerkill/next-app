'use client';

import React, { useState, useEffect } from 'react';
import { ICategories, IPost } from '@/types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function PostUpdate({
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
  const [categories, setCategories] = useState([] as ICategories[]);

  useEffect(() => {
    fetchPost();
    fetchCategories();
  }, []);

  const fetchPost = async () => {
    const response = await fetch(`http://localhost:3000/api/posts/${params.postId}`);
    const data = await response.json();
    setPost(data.data);
  };

  const fetchCategories = async () => {
    const response = await fetch('http://localhost:3000/api/categories');
    const data = await response.json();
    setCategories(data.data);
  };

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/api/posts/${params.postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...post,
        categoryId: post.categoryId,
      }),
    });
    const data = await response.json();
    console.log(data);
    window.location.href = 'http://localhost:3000/';
  };

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement> ) => {
    setPost({
      ...post,
      categoryId: Number(e.target.value),
    });
};



  return (
    <Container>
      <Typography variant="h2">Update post</Typography>
      <form onSubmit={handelSubmit}>
        <div>
          <TextField
            label={post.title}
            type="text"
            name="title"
            onChange={handelChange}
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label={post.content}
            type="text"
            name="content"
            onChange={handelChange}
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <FormControl fullWidth margin="normal">
            <select name="category" onChange={handleSelectChange}>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
          </FormControl>
        </div>
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
        <Link href={`http://localhost:3000/posts/${post.id}`} passHref>
        <Button type="submit" variant="contained" color="primary">
          Annuler
        </Button>
        </Link>
      </form>
    </Container>
  );
}