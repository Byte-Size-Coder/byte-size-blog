import Head from 'next/head';
import React from 'react';
import Banner from '@/components/home-page/Banner';
import FeaturedPosts from '@/components/home-page/FeaturedPosts';
import { IPost } from '@/models/Posts';
import { getFeaturedPosts } from '@/lib/posts-util';

interface IHomePageProps {
	posts: IPost[];
}

const HomePage: React.FC<IHomePageProps> = ({ posts }) => {
	return (
		<>
			<Head>
				<title>Byte Size Blog</title>
				<meta
					name="description"
					content="I post about my knowledge and experiences in the web and game development industry"
				/>
			</Head>
			<Banner />
			<FeaturedPosts posts={posts} />
		</>
	);
};

export function getStaticProps() {
	const featuredPosts = getFeaturedPosts();

	return {
		props: {
			posts: featuredPosts,
		},
	};
}

export default HomePage;
