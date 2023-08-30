import PostContent from '@/components/posts/post-detail/PostContent';
import { getPostData, getPostsFiles } from '@/lib/posts-util';
import { IPost } from '@/models/Posts';
import Head from 'next/head';

interface IPostDetalPageProps {
	post: IPost;
}

const PostDetailPage: React.FC<IPostDetalPageProps> = ({ post }) => {
	return (
		<>
			<Head>
				<title>{post.title}</title>
				<meta name="description" content={post.excerpt} />
			</Head>
			<PostContent post={post} />;
		</>
	);
};

export function getStaticProps(context: any) {
	const { params } = context;

	const postData = getPostData(params.slug);

	return {
		props: {
			post: postData,
		},
		revalidate: 600,
	};
}

export function getStaticPaths() {
	const postFileNames = getPostsFiles();

	const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ''));

	return {
		paths: slugs.map((slug) => ({ params: { slug: slug } })),
		fallback: false,
	};
}

export default PostDetailPage;
