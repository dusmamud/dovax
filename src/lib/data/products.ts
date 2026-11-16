export interface ProductColor {
	name: string;
	hex: string;
}

export interface ProductReview {
	author: string;
	rating: number;
	date: string;
	title: string;
	text: string;
	verified: boolean;
}

export type ProductCategory = 'men' | 'women' | 'running' | 'lifestyle';
export type ProductGender = 'men' | 'women' | 'unisex';
export type ProductBadge = 'bestseller' | 'new' | 'sale';

export interface Product {
	id: string;
	slug: string;
	name: string;
	tagline: string;
	description: string;
	/** Price in INR (whole rupees). */
	price: number;
	/** Original price for sale items. */
	compareAtPrice?: number;
	rating: number;
	reviewCount: number;
	colors: ProductColor[];
	sizes: string[];
	image: string;
	category: ProductCategory;
	gender: ProductGender;
	badges: ProductBadge[];
	isNew: boolean;
	stock: number;
	features: string[];
	materials: string;
	care: string;
	reviews: ProductReview[];
}

export const SIZES: string[] = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'];

export const products: Product[] = [
	{
		id: 'air-pro',
		slug: 'dovax-air-pro',
		name: 'Dovax Air Pro',
		tagline: 'Everyday Comfort',
		description:
			'The Dovax Air Pro is built for all-day comfort, with a cushioned air-sole unit and a breathable knit upper that moves with your foot. It pairs just as easily with jeans as it does with athleisure, making it the one shoe that covers work, travel and weekends.',
		price: 7999,
		rating: 4.8,
		reviewCount: 1240,
		colors: [
			{ name: 'Cloud White', hex: '#f5f5f4' },
			{ name: 'Slate Grey', hex: '#64748b' },
			{ name: 'Midnight Navy', hex: '#1e3a5f' }
		],
		sizes: SIZES,
		image: '/images/product-air-pro.jpg',
		category: 'lifestyle',
		gender: 'unisex',
		badges: ['bestseller'],
		isNew: false,
		stock: 24,
		features: [
			'Air-sole cushioning for all-day comfort',
			'Breathable engineered-knit upper',
			'Lightweight EVA midsole',
			'Durable rubber outsole with all-surface grip'
		],
		materials:
			'Engineered knit upper with synthetic overlays, EVA midsole with air-sole cushioning unit, and a rubber outsole.',
		care: 'Remove surface dirt with a soft brush, spot-clean with mild soap and cold water, and air-dry away from direct sunlight. Do not machine wash or tumble dry.',
		reviews: [
			{
				author: 'Aarav Mehta',
				rating: 5,
				date: '18 Oct 2026',
				title: 'Great everyday shoe',
				text: 'I wear these almost every day and my feet never feel tired, even after long walks around the city. The cushioning is soft without feeling mushy.',
				verified: true
			},
			{
				author: 'Priya Sharma',
				rating: 5,
				date: '02 Sep 2026',
				title: 'Comfortable from day one',
				text: 'No breaking-in period at all. They felt perfect on the first wear and the fit is true to size for me.',
				verified: true
			},
			{
				author: 'Rohan Kapoor',
				rating: 4,
				date: '21 Jun 2026',
				title: 'Excellent, runs slightly wide',
				text: 'Super comfortable and the knit breathes well in summer heat. The fit is a touch wide for narrow feet, so try your usual size first.',
				verified: true
			}
		]
	},
	{
		id: 'run-2',
		slug: 'dovax-run-2-0',
		name: 'Dovax Run 2.0',
		tagline: 'Performance Running',
		description:
			'The Dovax Run 2.0 is a performance runner with responsive foam and a lightweight mesh upper designed for daily miles. A structured heel counter keeps your stride stable, while the grippy outsole holds on wet and dry roads alike.',
		price: 8999,
		rating: 4.7,
		reviewCount: 980,
		colors: [
			{ name: 'Volt Lime', hex: '#84cc16' },
			{ name: 'Carbon Black', hex: '#171717' },
			{ name: 'Glacier Blue', hex: '#7dd3fc' }
		],
		sizes: SIZES,
		image: '/images/product-run-2.jpg',
		category: 'running',
		gender: 'unisex',
		badges: ['bestseller'],
		isNew: false,
		stock: 18,
		features: [
			'Responsive foam midsole for energy return',
			'Lightweight breathable mesh upper',
			'Structured heel counter for stability',
			'High-grip rubber outsole for wet and dry roads'
		],
		materials:
			'Breathable mesh upper with synthetic overlays, responsive EVA foam midsole, and a high-traction rubber outsole.',
		care: 'Air out after every run and spot-clean with mild soap and cold water. Avoid machine washing and keep away from direct heat while drying.',
		reviews: [
			{
				author: 'Vikram Nair',
				rating: 5,
				date: '05 Nov 2026',
				title: 'My daily running shoe',
				text: 'I have logged over 200 km in these and the cushioning still feels fresh. Great grip on morning runs, even on damp roads.',
				verified: true
			},
			{
				author: 'Sneha Iyer',
				rating: 4,
				date: '14 Aug 2026',
				title: 'Light and springy',
				text: 'Noticeably lighter than my previous running shoes, and the bounce on longer runs is real. I wish there were more colour options.',
				verified: true
			},
			{
				author: 'Arjun Patel',
				rating: 5,
				date: '28 May 2026',
				title: 'Stable and comfortable',
				text: 'The heel support fixed the wobble I had with other runners. Comfortable for 10K distances without any hot spots.',
				verified: false
			}
		]
	},
	{
		id: 'glide',
		slug: 'dovax-glide',
		name: 'Dovax Glide',
		tagline: 'Lightweight & Versatile',
		description:
			'The Dovax Glide is a featherlight everyday sneaker with a smooth, sock-like fit that slips on in seconds. Soft cushioning underfoot and a flexible sole make it ideal for long days on your feet.',
		price: 7499,
		compareAtPrice: 9499,
		rating: 4.6,
		reviewCount: 640,
		colors: [
			{ name: 'Blush Pink', hex: '#f9a8d4' },
			{ name: 'Cloud White', hex: '#f5f5f4' },
			{ name: 'Sage', hex: '#9caf88' }
		],
		sizes: SIZES,
		image: '/images/product-glide.jpg',
		category: 'women',
		gender: 'women',
		badges: ['sale'],
		isNew: false,
		stock: 12,
		features: [
			'Featherlight build at just 240 g per shoe',
			'Sock-like slip-on fit',
			'Soft cushioned insole',
			'Flexible grooved sole for natural movement'
		],
		materials:
			'Stretch knit upper with a cushioned textile insole, EVA midsole, and a flexible rubber outsole.',
		care: 'Hand wash in cold water with mild detergent and air-dry in the shade. Do not bleach or tumble dry.',
		reviews: [
			{
				author: 'Ananya Gupta',
				rating: 5,
				date: '09 Oct 2026',
				title: 'So light I forget I am wearing them',
				text: 'These are the lightest shoes I own and they go with everything from jeans to dresses. The slip-on design is perfect for quick errands.',
				verified: true
			},
			{
				author: 'Kavya Reddy',
				rating: 4,
				date: '17 Jul 2026',
				title: 'Comfortable but size up',
				text: 'Lovely soft shoe for all-day wear. I would suggest going half a size up if you are between sizes, as the knit hugs the foot closely.',
				verified: true
			},
			{
				author: 'Meera Joshi',
				rating: 5,
				date: '03 Apr 2026',
				title: 'Perfect travel shoe',
				text: 'I wore these through two airport days and miles of walking on holiday. They pack flat, weigh nothing and never gave me a blister.',
				verified: true
			}
		]
	},
	{
		id: 'court',
		slug: 'dovax-court',
		name: 'Dovax Court',
		tagline: 'Classic Street Style',
		description:
			'The Dovax Court brings classic court style to the street, with a clean leather-look upper and a crisp cupsole. Timeless enough for any outfit, comfortable enough for all-day wear.',
		price: 9999,
		rating: 4.8,
		reviewCount: 1100,
		colors: [
			{ name: 'Classic White', hex: '#ffffff' },
			{ name: 'Tan Leather', hex: '#b45309' },
			{ name: 'Forest Green', hex: '#166534' }
		],
		sizes: SIZES,
		image: '/images/product-court.jpg',
		category: 'men',
		gender: 'men',
		badges: ['bestseller'],
		isNew: false,
		stock: 15,
		features: [
			'Classic court silhouette with clean lines',
			'Smooth leather-look upper',
			'Padded collar and tongue',
			'Durable cupsole with herringbone grip'
		],
		materials:
			'Leather-look synthetic upper with textile lining, cushioned EVA midsole, and a rubber cupsole.',
		care: 'Wipe clean with a damp cloth and mild soap. Keep away from prolonged moisture and store with shoe trees to hold the shape.',
		reviews: [
			{
				author: 'Rahul Verma',
				rating: 5,
				date: '22 Oct 2026',
				title: 'Clean look, great quality',
				text: 'The finish looks far more premium than the price suggests. They go with everything and the leather-look upper wipes clean easily.',
				verified: true
			},
			{
				author: 'Divya Menon',
				rating: 5,
				date: '11 Sep 2026',
				title: 'My go-to white sneaker',
				text: 'Crisp, minimal and comfortable enough to wear all day at work. The padded collar makes a real difference.',
				verified: true
			},
			{
				author: 'Aditya Khan',
				rating: 4,
				date: '30 Jun 2026',
				title: 'Stylish with a firm sole',
				text: 'Great-looking shoe that gets compliments often. The sole feels firm for the first few wears, then breaks in nicely.',
				verified: false
			}
		]
	},
	{
		id: 'flex-knit',
		slug: 'dovax-flex-knit',
		name: 'Dovax Flex Knit',
		tagline: 'Stretch Knit Comfort',
		description:
			'The Dovax Flex Knit wraps your foot in a stretchy, breathable knit that adapts to every step. A flexible sole and featherlight build make it a natural pick for commutes, travel and long days out.',
		price: 6999,
		compareAtPrice: 8999,
		rating: 4.6,
		reviewCount: 540,
		colors: [
			{ name: 'Charcoal', hex: '#374151' },
			{ name: 'Ocean Blue', hex: '#2563eb' },
			{ name: 'Sand Beige', hex: '#d6c7a8' }
		],
		sizes: SIZES,
		image: '/images/product-flex-knit.jpg',
		category: 'lifestyle',
		gender: 'unisex',
		badges: ['sale'],
		isNew: false,
		stock: 28,
		features: [
			'Stretch knit upper that adapts to your foot',
			'Featherlight flexible construction',
			'Cushioned footbed for all-day comfort',
			'Slip-resistant rubber outsole'
		],
		materials:
			'Stretch engineered-knit upper, cushioned textile footbed, EVA midsole, and a slip-resistant rubber outsole.',
		care: 'Hand wash cold with mild detergent and air-dry away from direct sunlight. Do not iron or tumble dry.',
		reviews: [
			{
				author: 'Nikhil Desai',
				rating: 5,
				date: '27 Sep 2026',
				title: 'Fits like a sock',
				text: 'The knit stretches exactly where my foot needs it and the shoe feels custom-made. Very comfortable for long walks.',
				verified: true
			},
			{
				author: 'Ishita Rao',
				rating: 4,
				date: '08 Aug 2026',
				title: 'Great for travel',
				text: 'Light, packable and comfortable from the first wear. The sole could be a little thicker for rough pavements, but for city use it is excellent.',
				verified: true
			},
			{
				author: 'Karan Malhotra',
				rating: 5,
				date: '19 May 2026',
				title: 'Surprisingly supportive',
				text: 'I expected a soft knit shoe to feel floppy, but the midfoot support is genuinely good. My feet feel fresh after full days on my feet.',
				verified: true
			}
		]
	},
	{
		id: 'cloud-slip',
		slug: 'dovax-cloud-slip',
		name: 'Dovax Cloud Slip',
		tagline: 'Step In and Go',
		description:
			'The Dovax Cloud Slip is the easiest shoe you will own: step in and go, with pillowy foam underfoot and a soft knit collar that hugs the ankle. Made for slow mornings, quick errands and everything in between.',
		price: 6499,
		rating: 4.5,
		reviewCount: 310,
		colors: [
			{ name: 'Dove Grey', hex: '#9ca3af' },
			{ name: 'Soft Mint', hex: '#a7f3d0' }
		],
		sizes: SIZES,
		image: '/images/product-cloud-slip.jpg',
		category: 'lifestyle',
		gender: 'unisex',
		badges: ['new'],
		isNew: true,
		stock: 32,
		features: [
			'Hands-free slip-on design',
			'Pillow-soft foam footbed',
			'Soft knit collar for a secure fit',
			'Lightweight flexible outsole'
		],
		materials:
			'Knit upper with a padded collar, soft foam footbed, EVA midsole, and a flexible rubber outsole.',
		care: 'Spot-clean with mild soap and cold water, then air-dry in the shade. Avoid machine washing to keep the slip-on collar in shape.',
		reviews: [
			{
				author: 'Riya Bhatt',
				rating: 5,
				date: '12 Nov 2026',
				title: 'Cloud is the right name',
				text: 'These feel like walking on soft foam. I slip them on for everything now, from morning chai runs to evening walks.',
				verified: true
			},
			{
				author: 'Manish Yadav',
				rating: 4,
				date: '25 Oct 2026',
				title: 'Easy and comfortable',
				text: 'Perfect for days when I do not want to deal with laces. Very comfortable, though I would not wear them for serious walking distances.',
				verified: true
			},
			{
				author: 'Pooja Nair',
				rating: 5,
				date: '06 Sep 2026',
				title: 'Bought a second pair',
				text: 'Loved the first pair so much I ordered another colour within a month. The fit is snug in the best way.',
				verified: false
			}
		]
	},
	{
		id: 'urban-lo',
		slug: 'dovax-urban-lo',
		name: 'Dovax Urban Lo',
		tagline: 'City-Ready Style',
		description:
			'The Dovax Urban Lo is a low-profile city sneaker with a suede-and-knit upper and a chunky cushioned sole. It is built for pavement miles and styled for everything from office days to evenings out.',
		price: 8499,
		rating: 4.7,
		reviewCount: 420,
		colors: [
			{ name: 'Stone Grey', hex: '#78716c' },
			{ name: 'Olive', hex: '#556b2f' },
			{ name: 'Rust', hex: '#b7410e' }
		],
		sizes: SIZES,
		image: '/images/product-urban-lo.jpg',
		category: 'lifestyle',
		gender: 'unisex',
		badges: [],
		isNew: false,
		stock: 20,
		features: [
			'Suede and knit mixed upper',
			'Chunky cushioned midsole',
			'Low-profile city silhouette',
			'All-surface rubber outsole'
		],
		materials:
			'Suede and engineered-knit upper with textile lining, cushioned EVA midsole, and a rubber outsole.',
		care: 'Brush suede panels with a suede brush and spot-clean knit areas with mild soap. Keep dry and store away from direct sunlight.',
		reviews: [
			{
				author: 'Suresh Kumar',
				rating: 5,
				date: '15 Oct 2026',
				title: 'Smart and sturdy',
				text: 'The suede and knit mix looks sharp, and the sole handles uneven pavements well. Good value for a daily city shoe.',
				verified: true
			},
			{
				author: 'Naina Shah',
				rating: 4,
				date: '29 Jul 2026',
				title: 'Comfortable city shoe',
				text: 'Wears well with both work trousers and jeans. The cushioning is generous and the shoe looks smarter in person than in photos.',
				verified: true
			},
			{
				author: 'Dev Patel',
				rating: 5,
				date: '12 Jun 2026',
				title: 'My everyday rotation staple',
				text: 'This is the pair I reach for most mornings. Comfortable, durable and the colour goes with almost everything I own.',
				verified: true
			}
		]
	},
	{
		id: 'trail-rush',
		slug: 'dovax-trail-rush',
		name: 'Dovax Trail Rush',
		tagline: 'Built for the Trail',
		description:
			'The Dovax Trail Rush is built for off-road miles, with deep lugs that bite into mud and gravel and a protective toe cap for rocky paths. A cushioned midsole keeps long trail days comfortable.',
		price: 10499,
		rating: 4.8,
		reviewCount: 380,
		colors: [
			{ name: 'Earth Brown', hex: '#78350f' },
			{ name: 'Moss Green', hex: '#4d7c0f' },
			{ name: 'Graphite', hex: '#292524' }
		],
		sizes: SIZES,
		image: '/images/product-trail-rush.jpg',
		category: 'running',
		gender: 'men',
		badges: [],
		isNew: false,
		stock: 9,
		features: [
			'Deep multi-directional lugs for trail grip',
			'Protective rubber toe cap',
			'Cushioned midsole for long trail days',
			'Quick-dry mesh upper'
		],
		materials:
			'Quick-dry mesh upper with synthetic overlays and a rubber toe cap, EVA midsole, and a lugged rubber outsole.',
		care: 'Knock off dried mud, rinse with cold water and air-dry in the shade. Remove the insole while drying and avoid direct heat.',
		reviews: [
			{
				author: 'Tara Singh',
				rating: 5,
				date: '08 Nov 2026',
				title: 'Grips like a mountain goat',
				text: 'Took these on a monsoon trek and the grip on wet rock and mud was outstanding. My feet stayed comfortable for six hours on the trail.',
				verified: true
			},
			{
				author: 'Rohan Kapoor',
				rating: 5,
				date: '19 Sep 2026',
				title: 'Tough and comfortable',
				text: 'The toe cap has already saved my feet on rocky paths twice. Solid trail shoe that is also comfortable enough for the walk home.',
				verified: true
			},
			{
				author: 'Vikram Nair',
				rating: 4,
				date: '04 Jul 2026',
				title: 'Great on trails, firm on roads',
				text: 'Excellent grip and protection off-road. On tarmac the lugs feel firm, so this is a trail-first shoe, which is exactly what I wanted.',
				verified: true
			}
		]
	},
	{
		id: 'velocity',
		slug: 'dovax-velocity',
		name: 'Dovax Velocity',
		tagline: 'Made for Speed',
		description:
			'The Dovax Velocity is a tempo-day racer with a lightweight plate and springy foam that rewards faster paces. A breathable race mesh keeps things cool when the effort heats up.',
		price: 9499,
		rating: 4.7,
		reviewCount: 290,
		colors: [
			{ name: 'Neon Orange', hex: '#f97316' },
			{ name: 'Jet Black', hex: '#0a0a0a' }
		],
		sizes: SIZES,
		image: '/images/product-velocity.jpg',
		category: 'running',
		gender: 'unisex',
		badges: ['new'],
		isNew: true,
		stock: 14,
		features: [
			'Lightweight propulsion plate',
			'Springy responsive foam midsole',
			'Breathable race-day mesh',
			'Minimal heel drop for a fast feel'
		],
		materials:
			'Race mesh upper with synthetic overlays, responsive foam midsole with a propulsion plate, and a lightweight rubber outsole.',
		care: 'Air out after runs and spot-clean with mild soap and cold water. Do not machine wash, and keep away from direct heat.',
		reviews: [
			{
				author: 'Arjun Patel',
				rating: 5,
				date: '14 Nov 2026',
				title: 'Fast and fun',
				text: 'The plate gives a noticeable push on tempo runs and the shoe feels alive at pace. My favourite shoe for speed work this year.',
				verified: true
			},
			{
				author: 'Ananya Gupta',
				rating: 4,
				date: '02 Oct 2026',
				title: 'Great for race day',
				text: 'Light, springy and breathable. I would keep these for faster days rather than slow recovery runs, where they feel a little firm.',
				verified: true
			},
			{
				author: 'Aditya Khan',
				rating: 5,
				date: '21 Aug 2026',
				title: 'Personal best in these',
				text: 'Ran my fastest 10K in these shoes. The energy return is real and the fit locks the foot down without pinching.',
				verified: false
			}
		]
	},
	{
		id: 'pulse-run',
		slug: 'dovax-pulse-run',
		name: 'Dovax Pulse Run',
		tagline: 'Soft Daily Miles',
		description:
			'The Dovax Pulse Run is a soft, supportive daily trainer built on a fit shaped for women, with gentle arch support and plush cushioning. It is made for easy miles, gym sessions and active days.',
		price: 7999,
		rating: 4.6,
		reviewCount: 350,
		colors: [
			{ name: 'Coral', hex: '#fb7185' },
			{ name: 'Lilac', hex: '#c4b5fd' },
			{ name: 'Cloud White', hex: '#f5f5f4' }
		],
		sizes: SIZES,
		image: '/images/product-pulse-run.jpg',
		category: 'running',
		gender: 'women',
		badges: [],
		isNew: false,
		stock: 22,
		features: [
			'Fit shaped for women',
			'Plush cushioned midsole',
			'Gentle arch support',
			'Breathable seamless mesh upper'
		],
		materials:
			'Seamless mesh upper on a fit shaped for women, plush EVA midsole, and a rubber outsole.',
		care: 'Spot-clean with mild soap and cold water and air-dry in the shade. Do not machine wash or expose to direct heat.',
		reviews: [
			{
				author: 'Sneha Iyer',
				rating: 5,
				date: '10 Nov 2026',
				title: 'Finally a shoe that fits properly',
				text: 'The narrower heel and roomier forefoot fit my feet perfectly. No slipping, no blisters, just comfortable miles.',
				verified: true
			},
			{
				author: 'Kavya Reddy',
				rating: 5,
				date: '23 Sep 2026',
				title: 'Soft and supportive',
				text: 'The cushioning is plush without feeling unstable, and the arch support is gentle rather than intrusive. Lovely daily trainer.',
				verified: true
			},
			{
				author: 'Priya Sharma',
				rating: 4,
				date: '15 Jun 2026',
				title: 'Comfortable for gym and runs',
				text: 'I use these for both treadmill runs and gym workouts. Great all-rounder, though the mesh picks up dust quickly on outdoor runs.',
				verified: true
			}
		]
	},
	{
		id: 'street-low',
		slug: 'dovax-street-low',
		name: 'Dovax Street Low',
		tagline: 'Everyday Street Staple',
		description:
			'The Dovax Street Low is a low-top street staple with a smooth leather-look upper and a chunky cupsole. Clean, bold and built to take daily wear without losing its shape.',
		price: 8999,
		compareAtPrice: 10999,
		rating: 4.7,
		reviewCount: 610,
		colors: [
			{ name: 'Classic White', hex: '#ffffff' },
			{ name: 'Jet Black', hex: '#0a0a0a' },
			{ name: 'Navy', hex: '#1e3a8a' }
		],
		sizes: SIZES,
		image: '/images/product-street-low.jpg',
		category: 'men',
		gender: 'men',
		badges: ['sale'],
		isNew: false,
		stock: 16,
		features: [
			'Smooth leather-look upper',
			'Chunky cupsole with strong grip',
			'Padded tongue and collar',
			'Reinforced toe cap for durability'
		],
		materials:
			'Leather-look synthetic upper with textile lining, cushioned EVA midsole, and a rubber cupsole.',
		care: 'Wipe clean with a damp cloth and mild soap. Avoid prolonged exposure to water and store with shoe trees to hold the shape.',
		reviews: [
			{
				author: 'Aarav Mehta',
				rating: 5,
				date: '28 Oct 2026',
				title: 'Goes with everything',
				text: 'White leather-look sneakers that actually stay looking good. The cupsole is sturdy and the fit is spot on.',
				verified: true
			},
			{
				author: 'Rahul Verma',
				rating: 4,
				date: '09 Sep 2026',
				title: 'Solid street shoe',
				text: 'Chunky in the right way and comfortable for long days. The toe cap has held up well against daily scuffs.',
				verified: true
			},
			{
				author: 'Karan Malhotra',
				rating: 5,
				date: '20 May 2026',
				title: 'Better than expected',
				text: 'I bought these on sale and they have become my most-worn pair. The build quality is excellent for the price.',
				verified: true
			}
		]
	},
	{
		id: 'heritage-high',
		slug: 'dovax-heritage-high',
		name: 'Dovax Heritage High',
		tagline: 'Timeless High-Top',
		description:
			'The Dovax Heritage High is a premium high-top in full-grain-style leather with vintage court detailing. A padded ankle collar and cushioned insole bring modern comfort to a timeless silhouette.',
		price: 11499,
		rating: 4.9,
		reviewCount: 210,
		colors: [
			{ name: 'Cognac', hex: '#92400e' },
			{ name: 'Cream', hex: '#fef3c7' },
			{ name: 'Charcoal', hex: '#374151' }
		],
		sizes: SIZES,
		image: '/images/product-heritage-high.jpg',
		category: 'men',
		gender: 'men',
		badges: ['new'],
		isNew: true,
		stock: 7,
		features: [
			'Premium leather-style high-top upper',
			'Vintage court detailing',
			'Padded ankle collar for support',
			'Cushioned insole with arch support'
		],
		materials:
			'Full-grain-style leather upper with textile lining, cushioned insole, EVA midsole, and a rubber cupsole.',
		care: 'Wipe with a damp cloth and condition the leather panels occasionally. Keep away from water and store with shoe trees.',
		reviews: [
			{
				author: 'Meera Joshi',
				rating: 5,
				date: '07 Nov 2026',
				title: 'Premium in every detail',
				text: 'The leather feels rich, the stitching is immaculate and the high-top fit is supportive without being stiff. Worth every rupee.',
				verified: true
			},
			{
				author: 'Nikhil Desai',
				rating: 5,
				date: '18 Oct 2026',
				title: 'Instant classic',
				text: 'These look better with every wear. The ankle support is excellent and they pair perfectly with denim.',
				verified: true
			},
			{
				author: 'Suresh Kumar',
				rating: 4,
				date: '30 Aug 2026',
				title: 'Beautiful shoe, needs breaking in',
				text: 'Gorgeous quality and a timeless look. The leather is firm for the first week, then moulds to your foot beautifully.',
				verified: true
			}
		]
	},
	{
		id: 'metro-mid',
		slug: 'dovax-metro-mid',
		name: 'Dovax Metro Mid',
		tagline: 'Mid-Cut Versatility',
		description:
			'The Dovax Metro Mid sits between a low-top and a high-top, with a clean canvas upper and a supportive mid-cut collar. A versatile everyday shoe for commutes, campuses and city weekends.',
		price: 8299,
		rating: 4.5,
		reviewCount: 270,
		colors: [
			{ name: 'Denim Blue', hex: '#3b82f6' },
			{ name: 'Khaki', hex: '#a8a29e' },
			{ name: 'Black', hex: '#171717' }
		],
		sizes: SIZES,
		image: '/images/product-metro-mid.jpg',
		category: 'men',
		gender: 'men',
		badges: [],
		isNew: false,
		stock: 26,
		features: [
			'Mid-cut collar for extra support',
			'Durable canvas upper',
			'Cushioned insole for all-day wear',
			'Vulcanised-style rubber sole'
		],
		materials:
			'Canvas upper with textile lining, cushioned insole, EVA midsole, and a vulcanised-style rubber outsole.',
		care: 'Brush off dry dirt and spot-clean with mild soap and cold water. Air-dry in the shade and avoid machine washing.',
		reviews: [
			{
				author: 'Divya Menon',
				rating: 4,
				date: '26 Sep 2026',
				title: 'Smart mid-top',
				text: 'The mid-cut looks more polished than a low-top and the canvas is holding up well. Comfortable for full days on campus.',
				verified: true
			},
			{
				author: 'Dev Patel',
				rating: 5,
				date: '13 Aug 2026',
				title: 'Great commuter shoe',
				text: 'Supportive enough for long walks to the metro and smart enough for the office. The sole grip is reliable in the rain.',
				verified: true
			},
			{
				author: 'Riya Bhatt',
				rating: 4,
				date: '05 Jun 2026',
				title: 'Comfortable, canvas needs care',
				text: 'Lovely shoe and very comfortable. The canvas shows dust a little, so a quick brush now and then keeps it looking fresh.',
				verified: false
			}
		]
	},
	{
		id: 'breeze-knit',
		slug: 'dovax-breeze-knit',
		name: 'Dovax Breeze Knit',
		tagline: 'Airy Summer Comfort',
		description:
			'The Dovax Breeze Knit is an airy, featherlight sneaker with an open-knit upper that keeps feet cool in warm weather. Soft cushioning and a flexible sole make it an easy all-day choice.',
		price: 7299,
		rating: 4.6,
		reviewCount: 330,
		colors: [
			{ name: 'Sky Blue', hex: '#bae6fd' },
			{ name: 'Peach', hex: '#fdba74' },
			{ name: 'White', hex: '#ffffff' }
		],
		sizes: SIZES,
		image: '/images/product-breeze-knit.jpg',
		category: 'women',
		gender: 'women',
		badges: ['new'],
		isNew: true,
		stock: 19,
		features: [
			'Open-knit upper for maximum airflow',
			'Featherlight flexible build',
			'Soft cushioned footbed',
			'Slip-resistant outsole'
		],
		materials:
			'Open-knit textile upper, cushioned textile footbed, EVA midsole, and a slip-resistant rubber outsole.',
		care: 'Hand wash in cold water with mild detergent and air-dry in the shade. Do not bleach or tumble dry.',
		reviews: [
			{
				author: 'Ishita Rao',
				rating: 5,
				date: '11 Nov 2026',
				title: 'Perfect for Indian summers',
				text: 'My feet finally stay cool through hot afternoons. The open knit breathes beautifully and the shoe is wonderfully light.',
				verified: true
			},
			{
				author: 'Pooja Nair',
				rating: 5,
				date: '24 Sep 2026',
				title: 'Light as air',
				text: 'I barely feel these on my feet. The fit is true to size and the pastel colour is even prettier in person.',
				verified: true
			},
			{
				author: 'Naina Shah',
				rating: 4,
				date: '16 Jul 2026',
				title: 'Cool and comfortable',
				text: 'Great warm-weather shoe with genuinely good airflow. Not the pick for rainy days, but perfect for everything else.',
				verified: true
			}
		]
	},
	{
		id: 'aura-flex',
		slug: 'dovax-aura-flex',
		name: 'Dovax Aura Flex',
		tagline: 'Moves With You',
		description:
			'The Dovax Aura Flex combines a soft knit upper with a flexible, cushioned sole that bends naturally with every step. Designed for women who want a shoe that moves from workouts to weekends.',
		price: 8199,
		compareAtPrice: 9999,
		rating: 4.7,
		reviewCount: 480,
		colors: [
			{ name: 'Lavender', hex: '#ddd6fe' },
			{ name: 'Rose', hex: '#fda4af' },
			{ name: 'Slate', hex: '#64748b' }
		],
		sizes: SIZES,
		image: '/images/product-aura-flex.jpg',
		category: 'women',
		gender: 'women',
		badges: ['sale'],
		isNew: false,
		stock: 11,
		features: [
			'Soft stretch-knit upper',
			'Flexible sole that bends naturally',
			'Cushioned midsole for comfort',
			'Lightweight breathable build'
		],
		materials:
			'Stretch-knit upper with textile lining, cushioned EVA midsole, and a flexible rubber outsole.',
		care: 'Hand wash cold with mild detergent and air-dry away from direct sunlight. Do not machine wash or tumble dry.',
		reviews: [
			{
				author: 'Ananya Gupta',
				rating: 5,
				date: '19 Oct 2026',
				title: 'Moves with my foot',
				text: 'The flexibility is the standout feature. Every step feels natural, whether I am walking, training or just out and about.',
				verified: true
			},
			{
				author: 'Meera Joshi',
				rating: 4,
				date: '07 Sep 2026',
				title: 'Comfortable and versatile',
				text: 'Soft, light and easy to style. I wear these to the gym and straight out afterwards without a second thought.',
				verified: true
			},
			{
				author: 'Tara Singh',
				rating: 5,
				date: '22 May 2026',
				title: 'Great value on sale',
				text: 'Picked these up on sale and they have exceeded my expectations. The knit is soft, the cushioning is generous and they look great.',
				verified: true
			}
		]
	},
	{
		id: 'rose-court',
		slug: 'dovax-rose-court',
		name: 'Dovax Rose Court',
		tagline: 'Refined Court Elegance',
		description:
			'The Dovax Rose Court is a refined court sneaker in soft blush tones, with a smooth leather-look upper and delicate stitching. Elegant enough for dinner, comfortable enough for the walk there.',
		price: 9299,
		rating: 4.8,
		reviewCount: 390,
		colors: [
			{ name: 'Blush Rose', hex: '#f9a8d4' },
			{ name: 'Cream', hex: '#fef3c7' }
		],
		sizes: SIZES,
		image: '/images/product-rose-court.jpg',
		category: 'women',
		gender: 'women',
		badges: [],
		isNew: false,
		stock: 5,
		features: [
			'Soft blush leather-look upper',
			'Refined court silhouette',
			'Delicate tonal stitching',
			'Padded collar with cushioned insole'
		],
		materials:
			'Leather-look synthetic upper with textile lining, cushioned insole, EVA midsole, and a rubber cupsole.',
		care: 'Wipe clean with a damp cloth and mild soap. Keep away from prolonged moisture and store with shoe trees to hold the shape.',
		reviews: [
			{
				author: 'Priya Sharma',
				rating: 5,
				date: '09 Nov 2026',
				title: 'Beautiful and comfortable',
				text: 'The blush colour is subtle and elegant, and the cushioning makes them comfortable for long evenings out. My favourite pair right now.',
				verified: true
			},
			{
				author: 'Kavya Reddy',
				rating: 5,
				date: '30 Sep 2026',
				title: 'Elegant everyday shoe',
				text: 'Dressy enough for work lunches, comfortable enough for a full day. The stitching detail is lovely up close.',
				verified: true
			},
			{
				author: 'Sneha Iyer',
				rating: 4,
				date: '18 Aug 2026',
				title: 'Pretty with a snug fit',
				text: 'Gorgeous shoe and very well made. The fit is slightly snug at first, so consider your usual size with thin socks.',
				verified: false
			}
		]
	}
];

export function getProduct(id: string): Product | undefined {
	return products.find((product) => product.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
	return products.find((product) => product.slug === slug);
}
