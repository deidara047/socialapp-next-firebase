import { loremIpsum } from 'react-lorem-ipsum';
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Post from './Post';

export default function Posts({isUrlMe = false}: {isUrlMe?: boolean}) {
  const mockPosts: Array<string[]> = [loremIpsum(), loremIpsum(), loremIpsum(), loremIpsum(), loremIpsum()]
  const router = useRouter();

  return <div>
    {mockPosts.map((post, index) => <Post postid={index} key={index} post={post} isUrlMe={isUrlMe} />)}
  </div>
}