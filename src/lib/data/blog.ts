export interface BlogBlock {
	heading: string;
	paragraphs: string[];
}

export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	readTime: string;
	image: string;
	content: BlogBlock[];
}

export const posts: BlogPost[] = [
	{
		slug: 'sneaker-care-guide',
		title: 'How to Clean and Care for Your Sneakers',
		excerpt:
			'A simple, material-by-material routine that keeps your sneakers looking fresh for years, from daily habits to deep cleaning and storage.',
		date: '14 Nov 2026',
		readTime: '6 min read',
		image: '/images/blog-sneaker-care-guide.jpg',
		content: [
			{
				heading: 'Start with the right tools',
				paragraphs: [
					'Good sneaker care does not need expensive equipment. A soft-bristle brush, a clean cloth, mild soap or a dedicated sneaker cleaner, and a bowl of lukewarm water cover almost every cleaning job. Keep a dry brush by the door for quick dust-offs, and a separate soft toothbrush for seams, eyelets and textured soles.',
					'Avoid harsh chemicals, bleach and abrasive scrubbers. They strip colour, weaken glues and damage knit and suede. If you are unsure how a material will react, test your cleaner on a small hidden spot first and wait a few minutes before going further.'
				]
			},
			{
				heading: 'Clean by material, not by habit',
				paragraphs: [
					'Different uppers need different treatment. Smooth leather and leather-look materials respond best to a damp cloth with a little mild soap, wiped gently and dried with a second clean cloth. Knit and mesh uppers can be cleaned with a soft brush and soapy water worked in small circles, then blotted, never wrung.',
					'Suede is the exception: keep it dry and use a suede brush to lift dirt, brushing in one direction to restore the nap. For canvas, a soft brush and soapy water usually does the job, but let the shoes air-dry fully before wearing them again so the fabric does not hold dampness.'
				]
			},
			{
				heading: 'Treat the soles and laces separately',
				paragraphs: [
					'Remove the laces before cleaning and wash them on their own in warm soapy water, then rinse and hang them to dry. This keeps dye from the laces off the upper and lets you clean the tongue and eyelets properly. Insoles can be taken out and wiped down the same way.',
					'For midsoles and outsoles, a firmer brush and soapy water will remove most grime. White rubber responds well to a paste of baking soda and water left on for a few minutes before scrubbing. Work from the upper down so dirty water runs away from clean fabric.'
				]
			},
			{
				heading: 'Dry them properly, every time',
				paragraphs: [
					'Never put sneakers in a dryer or leave them next to a heater. High heat warps midsoles, shrinks uppers and weakens the glue that holds everything together. Instead, stuff the shoes loosely with newspaper or clean cloth to hold their shape and absorb moisture, and leave them in a shaded, well-ventilated spot.',
					'Change the stuffing after a few hours if the shoes were very wet. Most pairs dry fully within a day. Stuffing also prevents the toe box from collapsing as the shoes dry, which keeps them looking new for much longer.'
				]
			},
			{
				heading: 'Store smart and rotate your pairs',
				paragraphs: [
					'Shoes last longer when they rest between wears. Foam midsoles need time to recover their cushioning, and uppers need time to air out, so rotating two or more pairs will extend the life of each one. Store sneakers in a cool, dry place away from direct sunlight, which fades colours and dries out leather.',
					'Use shoe trees or stuffing to hold the shape of pairs you wear less often, and keep them in breathable storage rather than sealed plastic, which traps moisture. A quick brush after each wear takes thirty seconds and stops dirt from settling into the material.'
				]
			}
		]
	},
	{
		slug: 'choose-running-shoes',
		title: 'How to Choose the Right Running Shoes',
		excerpt:
			'The right running shoe depends on your feet, your gait and your goals. Here is how to match cushioning, support and fit to the way you actually run.',
		date: '07 Nov 2026',
		readTime: '7 min read',
		image: '/images/blog-choose-running-shoes.jpg',
		content: [
			{
				heading: 'Know your foot and your gait',
				paragraphs: [
					'Start with the basics: your arch height and how your foot lands. A quick wet-foot test on a dark surface gives a rough read of your arch. A full footprint suggests a low arch, a thin strip connecting heel and forefoot suggests a high arch, and something in between is a neutral arch. Each tends to pair with a different level of support.',
					'Watch how your feet roll as you run. Some inward roll, known as pronation, is normal and helps absorb impact. Excessive inward roll is overpronation, while very little roll is supination. Stability shoes suit overpronators, while neutral cushioned shoes suit most other runners. A running store gait analysis can confirm what you feel.'
				]
			},
			{
				heading: 'Match the shoe to your run',
				paragraphs: [
					'Different runs ask for different shoes. Daily trainers with generous cushioning are the workhorse for most runners, handling easy miles and long runs comfortably. Lighter tempo shoes with responsive foam suit faster sessions and race days, while trail shoes add lugged outsoles and toe protection for off-road routes.',
					'Think about where you actually run. Road shoes are built for smooth, predictable surfaces and grip best on tarmac and pavements. If your regular route mixes park paths, gravel and grass, a trail or hybrid shoe will give you far better traction and protection.'
				]
			},
			{
				heading: 'Get the fit right',
				paragraphs: [
					'Fit matters more than brand or colour. Running shoes should leave about a thumb width of space between your longest toe and the end of the shoe, because feet swell during a run and slide forward on downhills. The heel should feel secure without slipping, and the midfoot should feel held rather than squeezed.',
					'Try shoes on in the afternoon or evening, when your feet are at their largest, and wear the socks you run in. Walk and jog around the shop if you can. Any pinching, rubbing or numbness in the first few minutes will only get worse at kilometre ten, so trust the first impression.'
				]
			},
			{
				heading: 'Understand cushioning and drop',
				paragraphs: [
					'Cushioning is the foam between your foot and the ground. More stack height generally means a softer, more forgiving ride, which suits long runs and heavier runners, while lower, firmer shoes feel more connected to the ground and suit faster efforts. Neither is better in general; the right amount is the one that feels comfortable at your usual pace.',
					'Heel drop is the height difference between the heel and the forefoot of the shoe. A higher drop of around 8 to 12 mm suits heel strikers, while a lower drop of 0 to 6 mm suits midfoot and forefoot strikers. If you change drop significantly, transition gradually over a few weeks to let your calves and Achilles adjust.'
				]
			},
			{
				heading: 'When to replace your running shoes',
				paragraphs: [
					'Most running shoes last between 500 and 800 kilometres, depending on your weight, running style and the surfaces you run on. The foam compresses over time even if the upper still looks fine, so a shoe can feel flat and unresponsive long before it looks worn out. Keep a rough log of the distance on each pair.',
					'Watch for warning signs: new aches in your knees, shins or feet, uneven wear on the outsole, creases deep in the midsole foam, or a heel counter that leans to one side. Rotating two pairs spreads the wear and lets foam recover between runs, which often extends the life of both.'
				]
			}
		]
	},
	{
		slug: 'style-sneakers-everyday',
		title: '5 Ways to Style Sneakers for Everyday Looks',
		excerpt:
			'Sneakers work far beyond the gym. Five simple, reliable formulas for pairing them with what is already in your wardrobe.',
		date: '02 Nov 2026',
		readTime: '5 min read',
		image: '/images/blog-style-sneakers-everyday.jpg',
		content: [
			{
				heading: '1. Clean white sneakers with denim',
				paragraphs: [
					'The simplest sneaker outfit is also the most reliable: clean white sneakers, straight or slim denim, and a plain tee or a crisp shirt. The white shoe keeps the look fresh and lets the denim do the talking, whether the jeans are light wash or dark indigo.',
					'Keep the details tidy. A slight cuff or a cropped hem that shows a little ankle keeps the proportions sharp, and a white or off-white sneaker stays versatile across seasons. This is the formula to reach for when you want to look put together without thinking too hard.'
				]
			},
			{
				heading: '2. Knit sneakers with relaxed tailoring',
				paragraphs: [
					'A knit sneaker in a muted tone pairs surprisingly well with relaxed tailoring. Try tapered trousers, a soft blazer or an overshirt, and a knit or suede sneaker in grey, navy or stone. The textures echo each other, so the outfit reads as intentional rather than mismatched.',
					'The key is keeping the sneaker low-profile and the colours restrained. A chunky runner can fight with tailored lines, but a slim knit or leather-look sneaker sits neatly under a trouser hem and works for smart-casual offices, dinners and travel days alike.'
				]
			},
			{
				heading: '3. Bold sneakers as the statement piece',
				paragraphs: [
					'If your sneakers have a strong colour or a bold silhouette, let them be the focus. Build the rest of the outfit from neutrals: black, white, grey or navy, with simple shapes and no competing patterns. One statement piece is confident; two competing ones are noisy.',
					'This works especially well with high-tops and retro styles. A bright or patterned pair against dark jeans and a plain top turns an ordinary outfit into something memorable, and it is an easy way to experiment with colour without overhauling your wardrobe.'
				]
			},
			{
				heading: '4. Sneakers with dresses and skirts',
				paragraphs: [
					'Sneakers with a dress or skirt is a combination that works across seasons. A low-profile court sneaker or a slim knit style keeps the look balanced, while a midi dress or an A-line skirt gives the outfit structure. The contrast between the softness of the dress and the sportiness of the shoe is what makes it work.',
					'Match the sneaker to the mood of the outfit. White or pastel sneakers suit light, summery dresses, while black or deep-toned pairs ground darker or autumn looks. Keep socks low or hidden so the line from hem to shoe stays clean.'
				]
			},
			{
				heading: '5. Athleisure, done properly',
				paragraphs: [
					'Athleisure works when it looks deliberate. Pair your sneakers with well-fitted joggers or leggings, a structured top layer like a bomber or a zip jacket, and one clean accessory, such as a simple watch or a cap. The structure of the jacket is what separates the look from gym clothes.',
					'Choose sneakers that match the palette of the outfit rather than fighting it. Neutral runners and monochrome pairs are the safest choice, and a tidy, matching set of layers will always look better than a random mix of activewear. Keep the shoes clean, since athleisure puts them front and centre.'
				]
			}
		]
	}
];

export function getPost(slug: string): BlogPost | undefined {
	return posts.find((post) => post.slug === slug);
}
