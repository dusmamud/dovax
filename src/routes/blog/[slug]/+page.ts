import { error } from '@sveltejs/kit';
import { getPost, posts } from '#lib/data/blog.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => posts.map((post) => ({ slug: post.slug }));

export const load: PageLoad = ({ params }) => {
	const post = getPost(params.slug);

	if (!post) {
		error(404, 'Article not found');
	}

	return { post };
};
