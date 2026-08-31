import { doc, p, type RichTextDoc } from './richText'

/**
 * The 13 launch gowns - prices, categorization, one-liners and descriptions
 * exactly as approved in the Launch Content Pack. 10-day price = 5-day + $15.
 */

export type SeedGown = {
  name: string
  slug: string
  shortDescription: string
  fullDescription: RichTextDoc
  categories: ('photoshoot' | 'baby-shower')[]
  cultureEdit: 'classic' | 'south-asian-shoot'
  styleTags: ('flowing' | 'fitted' | 'dramatic' | 'minimal')[]
  colorPrimary: string
  colorFamily: 'neutral' | 'pastel' | 'warm' | 'jewel' | 'bold'
  rentalPrice5Day: number
  rentalPrice10Day: number
  fabric: string
  bestFor: string
  featured: boolean
  displayOrder: number
}

export const SEED_GOWNS: SeedGown[] = [
  {
    name: 'Ruby Royale',
    slug: 'ruby-royale',
    shortDescription: 'Regal ruby-red lace, made for a grand moment.',
    fullDescription: doc(
      p(
        'Ruby Royale is timeless drama in rich ruby-red lace that drapes beautifully over your figure. Long sleeves and a high neckline bring quiet sophistication, while the fitted bodice and full, flowing skirt create a truly regal silhouette. It’s stunning for a grand, richly-styled shoot - indoors or against ornate architecture. One size and gently stretchable, it flatters every stage of your bump. For the mom who wants to feel like royalty.',
      ),
    ),
    categories: ['photoshoot'],
    cultureEdit: 'south-asian-shoot',
    styleTags: ['fitted', 'dramatic'],
    colorPrimary: 'Ruby red',
    colorFamily: 'bold',
    rentalPrice5Day: 50,
    rentalPrice10Day: 65,
    fabric: 'Stretch lace over a soft lining',
    bestFor: 'Grand, richly-styled photoshoots, indoors or ornate settings, regal drama',
    featured: true,
    displayOrder: 1,
  },
  {
    name: 'Scarlet Dream',
    slug: 'scarlet-dream',
    shortDescription: 'Sweeping scarlet with movement made to dance.',
    fullDescription: doc(
      p(
        'Scarlet Dream is vibrant, joyful red with an expansive, flowing flare that’s made to move. Wear it off the shoulder or on, and let the lightweight fabric dance with you for enchanting, movement-filled photos. It’s dramatic and romantic in equal measure, beautiful indoors or out. One size and stretchable, it flatters bump to due date - for a mom who wants her photos full of colour and life.',
      ),
    ),
    categories: ['photoshoot'],
    cultureEdit: 'south-asian-shoot',
    styleTags: ['flowing', 'dramatic'],
    colorPrimary: 'Scarlet',
    colorFamily: 'bold',
    rentalPrice5Day: 40,
    rentalPrice10Day: 55,
    fabric: 'Lightweight stretch jersey with a sweeping flare',
    bestFor: 'Movement-filled photoshoots, indoor or outdoor, joyful, romantic drama',
    featured: false,
    displayOrder: 2,
  },
  {
    name: 'Sunset Goddess',
    slug: 'sunset-goddess',
    shortDescription: 'Endless ruffled tulle in a rich, earthy rose.',
    fullDescription: doc(
      p(
        'Sunset Goddess is drama in the most beautiful way - cascading layers of ruffled tulle in a rich, earthy rose that seem to flow endlessly around you. A deep V-neckline and cinched waist flatter your form, while a subtle slit adds a hint of allure. Made for breathtaking shots, whether in-studio or against a golden-hour sky. One size and stretchable, it envelops and flatters every stage - regal, romantic, unforgettable.',
      ),
    ),
    categories: ['photoshoot'],
    cultureEdit: 'south-asian-shoot',
    styleTags: ['dramatic', 'flowing'],
    colorPrimary: 'Earthy rose',
    colorFamily: 'warm',
    rentalPrice5Day: 70,
    rentalPrice10Day: 85,
    fabric: 'Layered ruffled tulle on a stretch bodice',
    bestFor: 'Statement photoshoots, studio or golden hour, regal, romantic volume',
    featured: true,
    displayOrder: 3,
  },
  {
    name: 'Verdant Vogue',
    slug: 'verdant-vogue',
    shortDescription: 'Rich deep-green velvet, elegant and nature-kissed.',
    fullDescription: doc(
      p(
        'Verdant Vogue is deep, luxurious green - velvet-rich colour that flatters at every stage and feels as vivid as nature itself. The off-shoulder neckline and flowing train lend it a regal, sophisticated air, whether you’re shooting outdoors among greenery or in a formal studio portrait. One size and stretchable, it drapes and flatters bump to due date. An elegant, jewel-toned choice for the chic mom-to-be.',
      ),
    ),
    categories: ['photoshoot'],
    cultureEdit: 'south-asian-shoot',
    styleTags: ['fitted'],
    colorPrimary: 'Deep green',
    colorFamily: 'jewel',
    rentalPrice5Day: 50,
    rentalPrice10Day: 65,
    fabric: 'Velvet-soft stretch knit with a flowing train',
    bestFor: 'Elegant photoshoots, outdoors among greenery or studio, jewel-toned sophistication',
    featured: false,
    displayOrder: 4,
  },
  {
    name: 'Sapphire Serenity',
    slug: 'sapphire-serenity',
    shortDescription: 'Striking sapphire that hugs every curve.',
    fullDescription: doc(
      p(
        'Sapphire Serenity is bold, glamorous colour in a smooth, sculpting sapphire blue. The off-the-shoulder neckline and fitted silhouette celebrate your curves and your bump, while a long, flowing train adds real drama to every frame. It photographs beautifully - vivid indoors, radiant against natural light. One size and stretchable, it moves with you and flatters every stage. A showstopper for a mom who wants to feel like royalty.',
      ),
    ),
    categories: ['photoshoot', 'baby-shower'],
    cultureEdit: 'south-asian-shoot',
    styleTags: ['fitted', 'dramatic'],
    colorPrimary: 'Sapphire blue',
    colorFamily: 'jewel',
    rentalPrice5Day: 40,
    rentalPrice10Day: 55,
    fabric: 'Smooth sculpting stretch knit',
    bestFor: 'Glamorous photoshoots & baby showers, studio or natural light, bold, curve-celebrating drama',
    featured: false,
    displayOrder: 5,
  },
  {
    name: 'Pink Radiance',
    slug: 'pink-radiance',
    shortDescription: 'Joyful, radiant colour in vibrant pink.',
    fullDescription: doc(
      p(
        'Pink Radiance is all warmth and joy - a vibrant pink that lights up every photo. The off-the-shoulder neckline and playful, fluttery sleeves bring a touch of femininity, while the fitted shape and long train celebrate your bump with a little drama. Beautiful indoors or out, it simply glows. One size and stretchable, it flatters every stage - for a mom who wants her photos to feel as happy as the moment.',
      ),
    ),
    categories: ['photoshoot', 'baby-shower'],
    cultureEdit: 'south-asian-shoot',
    styleTags: ['fitted'],
    colorPrimary: 'Vibrant pink',
    colorFamily: 'bold',
    rentalPrice5Day: 40,
    rentalPrice10Day: 55,
    fabric: 'Soft stretch crepe with fluttery chiffon sleeves',
    bestFor: 'Joyful photoshoots & baby showers, indoor or outdoor, warm, playful femininity',
    featured: false,
    displayOrder: 6,
  },
  {
    name: 'Midnight Majesty',
    slug: 'midnight-majesty',
    shortDescription: 'Bold, elegant drama in layers of black tulle.',
    fullDescription: doc(
      p(
        'Midnight Majesty is striking sophistication - layers of luxurious black tulle with a sheer bodice, delicate puffed sleeves, and a voluminous ruffled skirt that flows dramatically to the floor. It’s bold and elegant all at once, gorgeous indoors or out. One size and stretchable, it flatters every stage of your bump. A confident, majestic choice for a mom who wants photos with real presence.',
      ),
    ),
    categories: ['photoshoot'],
    cultureEdit: 'classic',
    styleTags: ['dramatic'],
    colorPrimary: 'Black',
    colorFamily: 'neutral',
    rentalPrice5Day: 70,
    rentalPrice10Day: 85,
    fabric: 'Layered tulle with a sheer mesh bodice',
    bestFor: 'Editorial photoshoots, studio or architectural settings, bold, confident presence',
    featured: true,
    displayOrder: 7,
  },
  {
    name: 'Versatile Charcoal',
    slug: 'versatile-charcoal',
    shortDescription: 'One gown, many looks - charcoal, styled your way.',
    fullDescription: doc(
      p(
        'Versatile Charcoal is exactly that: a sophisticated charcoal-grey gown that transforms into up to six different looks. Wear the sleek tube top and fitted skirt for a modern silhouette, then layer on the voluminous tulle skirt, top, and sleeves for full drama. It’s the most flexible piece in the collection - streamlined and chic, or romantic and layered, your call. One size and stretchable, it flatters every stage, however you style it.',
      ),
    ),
    categories: ['photoshoot'],
    cultureEdit: 'classic',
    styleTags: ['fitted', 'dramatic'],
    colorPrimary: 'Charcoal',
    colorFamily: 'neutral',
    rentalPrice5Day: 80,
    rentalPrice10Day: 95,
    fabric: 'Convertible stretch jersey with a tulle overlay set',
    bestFor: 'Photoshoots with multiple looks, studio or outdoor, modern minimal to full drama',
    featured: false,
    displayOrder: 8,
  },
  {
    name: 'Blush Elegance',
    slug: 'blush-elegance',
    shortDescription: 'Timeless romance in blush-pink lace.',
    fullDescription: doc(
      p(
        'Blush Elegance is soft, classic romance - delicate lace over a warm blush pink, with an off-the-shoulder neckline that frames your shoulders beautifully. The fitted shape traces your bump while a modest train adds a note of refinement, lovely indoors or out. One size and stretchable, it’s made to flatter every stage. A gentle, graceful choice for a mom who loves understated elegance.',
      ),
    ),
    categories: ['photoshoot', 'baby-shower'],
    cultureEdit: 'classic',
    styleTags: ['fitted', 'minimal'],
    colorPrimary: 'Blush pink',
    colorFamily: 'pastel',
    rentalPrice5Day: 40,
    rentalPrice10Day: 55,
    fabric: 'Delicate stretch lace',
    bestFor: 'Photoshoots & baby showers, indoor or outdoor, soft, timeless romance',
    featured: true,
    displayOrder: 9,
  },
  {
    name: 'Petal Princess',
    slug: 'petal-princess',
    shortDescription: 'Whimsical grace with a statement tulle shoulder.',
    fullDescription: doc(
      p(
        'Petal Princess is soft blush pink at its most graceful - a flowing gown with a fitted bodice and a full skirt that moves beautifully on camera. A delicate tulle statement shoulder adds a touch of whimsy without ever feeling fussy. Made for dreamy, movement-filled shots indoors or out. One size and stretchable, it flatters bump to due date - twirl-ready and effortlessly pretty.',
      ),
    ),
    categories: ['photoshoot', 'baby-shower'],
    cultureEdit: 'classic',
    styleTags: ['flowing'],
    colorPrimary: 'Blush pink',
    colorFamily: 'pastel',
    rentalPrice5Day: 50,
    rentalPrice10Day: 65,
    fabric: 'Flowing stretch chiffon with a tulle statement shoulder',
    bestFor: 'Dreamy photoshoots & baby showers, outdoor or studio, whimsical, twirl-ready grace',
    featured: false,
    displayOrder: 10,
  },
  {
    name: 'Enchanted Rose',
    slug: 'enchanted-rose',
    shortDescription: 'A dreamy, fairytale gown in soft blush tulle.',
    fullDescription: doc(
      p(
        'Enchanted Rose is pure fairytale - layers of soft blush tulle that float to the floor in a romantic, dreamy silhouette. Detachable sleeves let you shape the look to your comfort and mood, and a matching hairpin completes the ensemble. Wear it with sleeves for classic romance, or without for something softer. One size and stretchable, it flatters bump to due date - made for magical, storybook maternity photos.',
      ),
    ),
    categories: ['photoshoot', 'baby-shower'],
    cultureEdit: 'classic',
    styleTags: ['dramatic', 'flowing'],
    colorPrimary: 'Soft blush',
    colorFamily: 'pastel',
    rentalPrice5Day: 60,
    rentalPrice10Day: 75,
    fabric: 'Soft layered tulle with detachable sleeves',
    bestFor: 'Fairytale photoshoots & baby showers, studio or garden, romantic, storybook softness',
    featured: true,
    displayOrder: 11,
  },
  {
    name: 'Alpine Glow',
    slug: 'alpine-glow',
    shortDescription: 'Serene, understated grace in creamy white.',
    fullDescription: doc(
      p(
        'Alpine Glow is quiet elegance in a soft, creamy white - a fitted silhouette with a gentle train that lets your natural glow take centre stage. Its clean, understated lines feel timeless and calm, beautiful for a serene studio portrait or an open, scenic outdoor shoot. One size and stretchable, it drapes and flatters at every stage of your bump. Style it simply, and let the moment speak.',
      ),
    ),
    categories: ['photoshoot', 'baby-shower'],
    cultureEdit: 'classic',
    styleTags: ['fitted', 'minimal'],
    colorPrimary: 'Creamy white',
    colorFamily: 'neutral',
    rentalPrice5Day: 40,
    rentalPrice10Day: 55,
    fabric: 'Smooth stretch knit with a gentle train',
    bestFor: 'Serene photoshoots & baby showers, studio or scenic outdoor, calm, understated elegance',
    featured: false,
    displayOrder: 12,
  },
  {
    name: 'Celestial Grace',
    slug: 'celestial-grace',
    shortDescription: 'Ethereal sky-blue silk with soft tulle layers.',
    fullDescription: doc(
      p(
        'Celestial Grace is dreamy, regal softness in a beautiful sky blue - shiny silk with a flattering V-neckline and fitted bodice, finished with layers of soft tulle for volume and movement. It creates a majestic, ethereal silhouette that’s lovely indoors or out. One size and stretchable, it flatters every stage of your bump. Graceful and serene, for a mom who wants photos that feel like a fairytale sky.',
      ),
    ),
    categories: ['photoshoot', 'baby-shower'],
    cultureEdit: 'classic',
    styleTags: ['flowing', 'dramatic'],
    colorPrimary: 'Sky blue',
    colorFamily: 'pastel',
    rentalPrice5Day: 60,
    rentalPrice10Day: 75,
    fabric: 'Silk-feel satin with soft tulle layers',
    bestFor: 'Ethereal photoshoots & baby showers, indoor or outdoor, dreamy, sky-soft grace',
    featured: true,
    displayOrder: 13,
  },
]
