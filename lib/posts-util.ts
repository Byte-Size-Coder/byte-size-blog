import { IPost } from '@/models/Posts';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const postsDir = path.join(process.cwd(), 'posts');

export function getPostsFiles() {
	return fs.readdirSync(postsDir);
}

export function getPostData(postIdentifier: string): IPost {
	const postSlug = postIdentifier.replace(/\.md$/, '');

	const filePath = path.join(postsDir, `${postSlug}.md`);
	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const { data, content } = matter(fileContent);

	return {
		slug: postSlug,
		...data,
		content,
	} as IPost;
}

export function getAllPosts(): IPost[] {
	const postFiles = fs.readdirSync(postsDir);

	const allPosts = postFiles.map((fileName) => getPostData(fileName));

	return allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
}

export function getFeaturedPosts(): IPost[] {
	const allPosts = getAllPosts();
	return allPosts.filter((post) => post.isFeatured);
}
