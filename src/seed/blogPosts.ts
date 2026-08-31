import { doc, h2, link, p, ul, type RichTextDoc } from './richText'

/**
 * Three cornerstone Style Journal articles for launch - written in the brand
 * voice, each linking readers into at least one collection and one gown.
 */

export type SeedBlogPost = {
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  body: RichTextDoc
  seoTitle: string
  metaDescription: string
}

const WHAT_TO_WEAR = doc(
  p(
    'Your maternity photoshoot is one of the few times in life you’ll deliberately stand in front of a camera to remember exactly how you look right now - bump and all. What you wear shapes how those photos feel decades later. The good news: choosing well is much simpler than it seems. Here’s the honest guidance we give every mom who asks.',
  ),
  h2('Start with the feeling, not the dress'),
  p(
    'Before you look at a single gown, decide how you want the photos to feel. Soft and dreamy? Bold and editorial? Warm and golden? That one decision quietly answers most of the others - colour, silhouette, and setting all follow from it. A mom who wants “ethereal in a field at sunset” and a mom who wants “dramatic studio portrait” are both right; they just need different gowns.',
  ),
  h2('Silhouettes that love a bump'),
  p('Three silhouettes do most of the beautiful work in maternity photography:'),
  ul(
    [
      'Flowing gowns with movement - trains, chiffon, and full skirts photograph beautifully outdoors, especially with a breeze. Movement adds life to every frame.',
    ],
    [
      'Fitted styles that trace the bump - a smooth, stretchy silhouette celebrates your shape honestly and elegantly. Perfect for studio portraits and clean backdrops.',
    ],
    [
      'Voluminous tulle - layers upon layers, for photos that feel like a storybook. If you’ve ever wanted a truly grand moment, this is it.',
    ],
  ),
  p(
    'You’ll find all three in our ',
    link('maternity photoshoot collection', '/gowns/photoshoot'),
    ' - each gown is one size and stretchable, so the silhouette flatters whether your shoot is at 28 weeks or 38.',
  ),
  h2('Colour: think about your setting first'),
  p(
    'Creams and soft neutrals like ',
    link('Alpine Glow', '/gowns/alpine-glow'),
    ' glow in bright, airy settings and scenic outdoor shoots. Rich, earthy tones - like the rose-toned ruffles of ',
    link('Sunset Goddess', '/gowns/sunset-goddess'),
    ' - come alive at golden hour. Deep jewel tones and bold colour photograph beautifully in studios and against architecture, where they carry the whole frame.',
  ),
  h2('Comfort is a photography strategy'),
  p(
    'A shoot typically runs one to two hours of standing, walking, sitting, and holding poses. If a dress pinches, it shows on your face long before it shows on the dress. Stretch fabric isn’t a compromise - it’s the reason relaxed, natural photos happen. (More on how our one-size fit works in the ',
    link('fit guide', '/fit-guide'),
    '.)',
  ),
  h2('The shortcut'),
  p(
    'Still torn? Answer four quick questions in ',
    link('Find My Gown', '/find-my-gown'),
    ' and we’ll shortlist gowns for your occasion, style, and colour mood - or just message us. Telling a real person “outdoor shoot, September, soft and romantic” gets you a spot-on suggestion the same day.',
  ),
)

const SOUTH_ASIAN = doc(
  p(
    'Some of the most breathtaking maternity photography we see comes from culturally-styled South Asian shoots - rich colour, expressive detail, jewellery with history, and family woven into the frames. If you’re planning one, the gown you choose sets the palette for everything else. Here’s how to style it beautifully.',
  ),
  h2('Lead with colour'),
  p(
    'South Asian maternity shoots celebrate colour fearlessly - deep reds, jewel greens, sapphire, and rose. Ruby and scarlet tones carry bridal warmth and photograph magnificently against both ornate indoor settings and open sky. ',
    link('Ruby Royale', '/gowns/ruby-royale'),
    ', with its regal red lace and full skirt, was practically made for this - and the deep green of ',
    link('Verdant Vogue', '/gowns/verdant-vogue'),
    ' brings the same richness in a jewel tone that flatters every skin depth.',
  ),
  h2('Let jewellery do what it does best'),
  p(
    'A maternity gown with clean necklines - off-shoulder, V-neck, or high-neck lace - leaves room for statement jewellery to shine: jhumkas, a maang tikka, layered necklaces, bangles. Choose the gown first, then pick two or three pieces that echo its mood rather than compete with it. Gold against deep red or green is timeless for a reason.',
  ),
  h2('Dupattas, drapes, and movement'),
  p(
    'A flowing dupatta or sheer drape adds movement and heritage to every frame - photographers love it because it turns a portrait into a story. Gowns with flare and swing pair best; ask your photographer to shoot a few frames mid-movement. If your family has an heirloom piece, bring it: those photos become treasures.',
  ),
  h2('Setting the scene'),
  ul(
    ['Indoors: ornate architecture, warm lamplight, marigolds or rose petals for ceremonies like godh bharai.'],
    ['Golden hour outdoors: rich gown colours glow against warm, low light.'],
    ['Studio: a plain deep backdrop lets colour and jewellery carry the entire frame.'],
  ),
  h2('Fit, comfort, and the practical part'),
  p(
    'Every gown in our ',
    link('South Asian collection', '/gowns/south-asian'),
    ' is one size and stretchable - it fits and flatters at every stage, with no blouse fittings or alterations. Rentals run 5 or 10 days, arrive professionally cleaned via Canada Post (free hand-delivery around the GTA), and return with a prepaid label. Tell us your shoot date and we’ll confirm availability the same day.',
  ),
)

const WHEN_TO_BOOK = doc(
  p(
    'The question we hear most after “will it fit?” is “when should I book?” - both the photoshoot and the gown. The honest answer is that the ideal window is wider than most blogs suggest, but a little planning makes everything calmer. Here’s the timing that works.',
  ),
  h2('The sweet spot for the shoot itself'),
  p(
    'Most photographers recommend shooting between 28 and 34 weeks. The bump is beautifully round and unmistakable, you’re still comfortable moving, standing, and posing, and there’s a safe buffer before baby decides to arrive early. Carrying twins, or measuring ahead? Shift a few weeks earlier. Feeling great at 36 weeks? Later shoots produce gorgeous, powerful photos too - it’s your call.',
  ),
  h2('Book the photographer before the gown'),
  p(
    'Good maternity photographers book out four to eight weeks ahead - golden-hour weekend slots go first. Lock your photographer and date, then choose the gown; the gown is the easy part. (No photographer yet? Ours is a small world - ',
    link('we work with photographers across the GTA and Canada', '/for-photographers'),
    ' and are happy to point you toward someone whose style fits yours.)',
  ),
  h2('When to reserve your gown'),
  p('Two to four weeks before the shoot is the comfortable window. That leaves time to:'),
  ul(
    ['Confirm availability for your exact dates (we reply the same day),'],
    ['Ship anywhere in Canada with buffer to spare - the gown arrives a couple of days early for a relaxed fit-check,'],
    ['Swap your choice calmly if you change your mind (it happens; it’s fine).'],
  ),
  p(
    'Booking tighter than that? Message us anyway - with local GTA hand-delivery, even shoots just days away are often workable. The availability badge on each gown tells you instantly whether to hope, and ',
    link('how the whole rental works', '/how-it-works'),
    ' takes two minutes to read.',
  ),
  h2('A simple timeline to steal'),
  ul(
    ['Weeks 20–24: choose your photographer, set the date.'],
    ['Weeks 24–28: pick your gown and reserve - availability confirmed the same day.'],
    ['Shoot week: the gown arrives cleaned and ready; you glow; the prepaid label handles the rest.'],
  ),
  p(
    'That’s it. Two decisions, made early, and the rest is just looking forward to it. Start with the ',
    link('collection', '/gowns'),
    ' - and if the timing feels tight, message us before you rule anything out.',
  ),
)

export const SEED_BLOG_POSTS: SeedBlogPost[] = [
  {
    title: 'What to Wear for Your Maternity Photoshoot',
    slug: 'what-to-wear-maternity-photoshoot',
    excerpt:
      'Silhouettes that love a bump, colours that love your setting, and the comfort rule most guides skip - honest guidance for choosing your photoshoot gown.',
    publishedAt: '2026-06-02T12:00:00.000Z',
    body: WHAT_TO_WEAR,
    seoTitle: 'What to Wear for Your Maternity Photoshoot | Mummy2Be',
    metaDescription:
      'What to wear for your maternity photoshoot: the silhouettes that flatter every bump, colours that suit your setting, and why comfort makes better photos.',
  },
  {
    title: 'Styling a South Asian Maternity Shoot',
    slug: 'styling-south-asian-maternity-shoot',
    excerpt:
      'Rich colour, statement jewellery, dupattas in motion - how to style a culturally beautiful South Asian maternity photoshoot, gown first.',
    publishedAt: '2026-06-16T12:00:00.000Z',
    body: SOUTH_ASIAN,
    seoTitle: 'Styling a South Asian Maternity Photoshoot | Mummy2Be',
    metaDescription:
      'How to style a South Asian maternity shoot: choosing rich gown colours, pairing jewellery, working with dupattas and drapes, and settings that glow.',
  },
  {
    title: 'When to Book Your Maternity Photos (and Your Gown)',
    slug: 'when-to-book-maternity-photos',
    excerpt:
      'The 28–34 week sweet spot, why the photographer comes first, and the two-to-four-week gown window - a calm timeline for planning your shoot.',
    publishedAt: '2026-06-30T12:00:00.000Z',
    body: WHEN_TO_BOOK,
    seoTitle: 'When to Book Your Maternity Photos | Mummy2Be',
    metaDescription:
      'When to schedule your maternity photoshoot and reserve your gown: the 28–34 week sweet spot, booking order, and a simple timeline to follow.',
  },
]
