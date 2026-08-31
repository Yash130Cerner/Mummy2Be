# Mummy2Be - Complete Setup Guide

This guide takes you from **nothing installed** to the **live site on your own domain**, step
by step. Every command is copy-paste. You don’t need to have set up a website before.

**The journey:** install the tools → open the project → create a free database → configure →
run it on your computer → put in your admin login → load the 13 gowns → add photos → add your
videos → set up email → deploy to the internet.

---

## 1. Install the prerequisites

You need three things: **Node.js** (runs the site), **Git** (versioning + deploying), and
**VS Code** (the editor).

**Check what you already have.** Open a terminal
(Windows: press `Win`, type “PowerShell”, Enter · Mac: press `Cmd+Space`, type “Terminal”, Enter)
and run:

```bash
node -v
git --version
```

- If `node -v` prints `v20.9.0` or higher (e.g. `v20.x`, `v22.x`, `v24.x`) → you’re good.
  Otherwise install the **LTS** version from <https://nodejs.org> (big green button, keep all
  defaults, then **close and reopen your terminal**).
- If `git --version` prints a version → you’re good. Otherwise install it from
  <https://git-scm.com/downloads> (keep all defaults).
- Install **VS Code** from <https://code.visualstudio.com> if you don’t have it.

## 2. Open the project in VS Code

1. Open VS Code.
2. **File → Open Folder…** and choose the `mummy2be` folder.
3. Open VS Code’s built-in terminal: **Terminal → New Terminal** (or `` Ctrl+` ``).
   Every command below is typed into that terminal.

## 3. Install the project’s dependencies

```bash
npm install
```

This downloads everything the site needs (takes a few minutes the first time). It’s done when
you get your prompt back with no red error at the end.

## 4. Create your free PostgreSQL database (Neon)

The site stores gowns, inquiries and content in a PostgreSQL database. **Neon** hosts one for
free, and the same database will serve your computer *and* the live site.

1. Go to <https://neon.tech> → **Sign up** (easiest with a Google account).
2. Create a project - name it `mummy2be`. For the region, pick **US East (Ohio)** or another
   nearby region.
3. On your project’s dashboard, find **Connect** and copy the **connection string**. It looks
   like:

   ```
   postgresql://neondb_owner:AbC123xyz@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

   Keep this tab open - you’ll paste that string in the next step.

## 5. Create your `.env` file (the site’s settings)

1. In VS Code’s file list, right-click **`.env.example`** → **Copy**, then right-click in the
   file list → **Paste**. Rename the copy to exactly **`.env`**.
2. Open `.env` and fill it in:

   | Variable | What to put there |
   |---|---|
   | `DATABASE_URL` | The Neon connection string you copied in step 4 |
   | `PAYLOAD_SECRET` | A long random string - generate one with the command below |
   | `NEXT_PUBLIC_SERVER_URL` | Leave as `http://localhost:3000` for now |
   | `RESEND_API_KEY` | Leave empty for now (email comes in step 12) |
   | `RESEND_FROM` | Leave as is |
   | `OWNER_NOTIFICATION_EMAIL` | Already set to `RentWithMummy2Be@gmail.com` |
   | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Leave empty for now (analytics comes in step 13) |
   | `NEXT_PUBLIC_INSTAGRAM_URL` | Your Instagram profile URL. If left empty, the site links to `https://www.instagram.com/_mummy2be_` |

   To generate the `PAYLOAD_SECRET`, run this in the terminal and paste the output:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. Save the file (`Ctrl+S`). ⚠️ Never share `.env` or commit it anywhere - it holds your keys.

## 6. Start the site on your computer

```bash
npm run dev
```

Wait for a line like `✓ Ready in …`. The **first start takes a minute** - it also creates all
the database tables in Neon automatically. Then open:

- **The site:** <http://localhost:3000>
- **The admin panel:** <http://localhost:3000/admin>

(The site will look empty until you seed it - next steps. Leave `npm run dev` running; to stop
it later press `Ctrl+C`.)

> ♻️ **Updating the site later?** Whenever you pull a newer version of the code, run
> `npm install` and then `npm run dev` once - that automatically adds any new database fields
> (for example, the video fields from the video update).

## 7. Create your admin login

Open <http://localhost:3000/admin>. Payload asks you to **create the first user**: enter your
email and a strong password, and store them in a password manager - this is the login you’ll
use to manage gowns, availability and inquiries forever.

## 8. Load the 13 gowns and all content (seed)

Open a **second terminal** (Terminal → New Terminal, so `npm run dev` keeps running) and run:

```bash
npm run seed
```

You’ll see it create the 13 gowns (Ruby Royale → Celestial Grace) with their real prices and
descriptions, the full FAQ, Our Story, the Rental Terms, and 3 Style Journal articles. It’s
safe to run again any time - it updates rather than duplicates.

Refresh <http://localhost:3000> - the full site is now alive. Until photos are uploaded each
gown shows an elegant colour-wash placeholder with its name; that disappears as you add photos.

## 9. Upload your gown photos

In the admin (<http://localhost:3000/admin>):

1. Go to **Catalog → Photos & videos** → **Create New** → drag in a photo.
   Write a natural **description (alt text)** for each, e.g.
   *“Ruby-red lace maternity gown on an expecting mom, studio portrait.”*
   Good filenames help SEO too: `ruby-royale-maternity-gown-front.jpg`, not `IMG_1234.jpg`.
2. Go to **Catalog → Gowns** → open a gown → **Photos & video** tab:
   - **Primary image** - the main catalogue photo (use the same crop/lighting style across
     all gowns so the grid looks premium).
   - **Gallery images** - the other angles and details.
   - **Real-customer photos** - only tick the consent box if she has agreed in writing.
3. Click **Save**. The site updates within moments.

**The homepage hero:** go to **Content → Page content → home** and upload your best
real-mom-in-gown photo as the **Hero image** - the homepage switches from the art treatment to
full-bleed photography automatically.

**Day-to-day availability:** open any gown → the **Availability status** dropdown is at the top
of the sidebar → pick *Available / Limited / On rental / Contact to confirm* → **Save**.
That’s the whole workflow. Switch a returned gown back to *Available* only after it’s been
inspected **and cleaned**.

## 10. Adding your videos

You have 8 short clips (6–10 seconds): 7 gown clips covering 3–4 gowns, plus 1
behind-the-scenes clip. Here’s exactly what to do with them. Gowns **without** a video simply
show their photos - nothing looks empty or broken - and the homepage **“See them in motion”**
strip fills itself automatically from whichever gowns have a video attached.

### 10a. Compress the clips first (5 minutes, once)

Phone videos are often 50–100 MB - far too heavy for a fast website. Compress each clip to
roughly **3–8 MB** before uploading:

1. Install **HandBrake** (free, Windows/Mac): <https://handbrake.fr>.
2. Open HandBrake → drag a clip in.
3. In **Presets**, choose **General → Fast 720p30**.
4. In the **Video** tab, set **Constant Quality** to about **26** (higher number = smaller file).
5. Make sure the container is **MP4** (Summary tab → Format: MP4), then click
   **Start Encode**. Repeat per clip (or use the queue).

A 6–10-second clip should come out around 2–6 MB. If one is still over ~10 MB, raise the
quality number a little and re-encode.

> 🎞 **Poster frames:** each video needs a “poster” - the still image shown before play. Pause
> the clip on its most beautiful frame and take a screenshot (Windows: `Win+Shift+S`,
> Mac: `Cmd+Shift+4`), or simply reuse one of that gown’s photos.

### 10b. Attach a video to a gown

For each of the 3–4 gowns that have footage (pick the best single clip per gown):

1. **Catalog → Photos & videos** → upload the compressed **mp4** (give it a clear
   description, e.g. *“Ruby Royale gown in motion”*) and upload the **poster image**.
2. **Catalog → Gowns** → open that gown → **Photos & video** tab → **Movement video**:
   - **Video file (mp4)** → pick the clip,
   - **Poster frame** → pick the poster image.
3. **Save.**

That gown now shows the video in its page gallery (tap to play), appears in the homepage
**“See them in motion”** strip, and automatically leads the homepage featured section. You can
also tick **Featured on homepage** on these gowns for good measure.

### 10c. The behind-the-scenes clip (About page)

1. Upload the compressed BTS mp4 + a poster frame to **Photos & videos** (as above).
2. Go to **Content → Page content → about-story** → **Behind-the-scenes video** → attach the
   file and poster → **Save**.

It appears in the About page’s “Cared for, cleaned, and ready for your moment” section.

### 10d. Good to know

- **Videos never slow the site down or autoplay.** Only the small poster image loads (and only
  when scrolled into view); the video itself downloads the moment someone taps play - with
  sound, since they asked for it.
- **Where the files live:** on your computer during local development (`/media` folder); on
  the live site they’re stored in **Vercel Blob** - persistent cloud storage served by a CDN -
  because Vercel’s own servers don’t keep uploaded files (see step 14c). Upload your real
  media through the **live** admin once the site is deployed.
- Not every gown needs a video - photos-only gowns are completely normal here.

## 11. Test the inquiry flow end-to-end

1. On the site, open any gown → **Reserve This Gown** → fill the form with your own details →
   **Send Request**.
2. You should land on the confirmation page.
3. In the admin, check **Bookings → Inquiries** - your test inquiry is there.
4. Emails won’t send yet (no Resend key) - that’s next.

## 12. Set up email (Resend)

Resend sends two emails per inquiry: a notification to you, and a warm auto-reply to the
customer.

1. Sign up free at <https://resend.com>.
2. **API Keys → Create API Key** → name it `mummy2be` → copy the key (starts with `re_`).
3. Paste it into `.env` as `RESEND_API_KEY=re_…`, save, then restart the dev server
   (`Ctrl+C`, then `npm run dev` again).

**Important - test mode vs. real mode:**

- Until you verify a domain, Resend only delivers to **the email address you signed up with**,
  from `onboarding@resend.dev`. Good enough to test: set `OWNER_NOTIFICATION_EMAIL` in `.env`
  temporarily to your Resend signup email, submit a test inquiry using that same address in
  the form, and check your inbox for **both** emails (notification + auto-reply).
- **Before launch,** verify your domain: Resend → **Domains → Add Domain** → `mummy2be.com` →
  add the DNS records it shows you at your domain registrar → wait for “Verified”. Then in
  `.env` (and later in Vercel) set:

  ```
  RESEND_FROM=Mummy2Be <hello@mummy2be.com>
  OWNER_NOTIFICATION_EMAIL=RentWithMummy2Be@gmail.com
  ```

  Now emails deliver to anyone, from your own domain.

## 13. Set up Google Analytics (GA4)

1. Go to <https://analytics.google.com> → **Admin** (gear icon) → **Create → Property** →
   name it `Mummy2Be`, country Canada, currency CAD.
2. Create a **Web** data stream with your site URL → copy the **Measurement ID**
   (looks like `G-XXXXXXXXXX`).
3. Put it in `.env`: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` (and later in Vercel).
4. **Mark the conversions:** in GA4, **Admin → Events**, and after some traffic arrives flip
   the **“Mark as key event”** toggle for: `reserve_click`, `ask_click`,
   `inquiry_form_submit`, `whatsapp_click`, `call_click`, `email_click`.
   (Events appear in that list after they’ve fired at least once - do your own click-through
   of the site to trigger them. Video plays are tracked too, as `video_play`.)

## 14. Deploy to the internet (Vercel)

### 14a. Put the project on GitHub

1. Create a free account at <https://github.com>.
2. In VS Code: click the **Source Control** icon (left bar) → **Publish to GitHub** →
   choose **private repository** → confirm. (If VS Code asks you to sign in to GitHub, follow
   the prompts.)

### 14b. Import it into Vercel

1. Sign up at <https://vercel.com> **with your GitHub account** (free Hobby plan is fine to
   start).
2. **Add New… → Project** → **Import** your `mummy2be` repository.
3. Before clicking Deploy, open **Environment Variables** and add each of these (copy the
   values from your `.env`):

   | Name | Value |
   |---|---|
   | `DATABASE_URL` | your Neon connection string (same one) |
   | `PAYLOAD_SECRET` | same secret as your `.env` |
   | `NEXT_PUBLIC_SERVER_URL` | `https://mummy2be.com` (or the `…vercel.app` URL until your domain is connected - you can update it after) |
   | `RESEND_API_KEY` | your Resend key |
   | `RESEND_FROM` | `Mummy2Be <hello@mummy2be.com>` (after domain verification) |
   | `OWNER_NOTIFICATION_EMAIL` | `RentWithMummy2Be@gmail.com` |
   | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | your `G-…` ID |
   | `NEXT_PUBLIC_INSTAGRAM_URL` | your Instagram URL (optional - defaults to `@_mummy2be_`) |

4. Click **Deploy**. Because your Neon database already has the tables and the seeded gowns
   (you ran `npm run dev` and `npm run seed` against it in steps 6–8), the build completes and
   the live site shows everything you set up locally. No separate “migration” step is needed -
   the database schema is created/updated whenever you run `npm run dev` locally against Neon.

### 14c. Media & video storage for the live site (required - do this before uploading media in production)

Vercel’s servers **don’t keep uploaded files** (their filesystem is wiped on every deploy), so
production photos **and videos** live in **Vercel Blob** - persistent cloud storage served
through Vercel’s CDN:

1. In your Vercel project: **Storage** tab → **Create Database → Blob** → create it and
   **connect it to the project** when prompted. This automatically adds the
   `BLOB_READ_WRITE_TOKEN` environment variable.
2. **Deployments → ⋯ on the latest → Redeploy** so the site picks it up.
3. From now on, upload photos and videos through the **live** admin
   (`https://your-site/admin`) - they’re stored in Blob and survive every deploy. Large videos
   upload straight from your browser to Blob (the site is configured for “client uploads”, so
   even big files work), and they’re served CDN-direct with proper video streaming
   (scrubbing/seeking works).

> Photos/videos you uploaded *locally* in steps 9–10 live on your computer, not in Blob -
> re-upload them through the live admin once (start with primary images, then videos).

Also create your **admin login on the live site** the first time you open
`https://your-site/admin` (production shares the Neon database, so if you already created the
user locally against Neon, the same login works).

### 14d. Connect the domain

In Vercel: **Settings → Domains** → add `mummy2be.com` → follow the DNS instructions shown
(at your domain registrar, usually changing the nameservers or adding an A/CNAME record).
SSL is automatic. Then update `NEXT_PUBLIC_SERVER_URL` to `https://mummy2be.com` in
**Settings → Environment Variables** and redeploy.

### 14e. Post-deploy checklist (confirm the live site works)

Go through this on the **live** site, ideally on your phone:

- [ ] **Videos play:** open a gown that has a video → tap the play button in its gallery →
      it plays (with sound) and you can scrub back and forth.
- [ ] **Gowns without video** show only photos - no empty or broken video slot anywhere.
- [ ] The homepage **“See them in motion”** strip shows your video gowns; tapping a clip
      plays it, and the gown name below it opens the right gown page.
- [ ] The **behind-the-scenes clip** plays on the About page.
- [ ] **Inquiry form:** submit a real test request → confirmation page appears → **both**
      emails arrive (your notification + the customer auto-reply) → the inquiry is in
      *Admin → Bookings → Inquiries*.
- [ ] **Instagram link** (header, footer, mobile menu) opens your profile in a new tab -
      and there is **no** embedded Instagram feed anywhere.
- [ ] **Tap-to-call, text, WhatsApp and email** links all work on a real phone.
- [ ] **Pages feel fast on mobile** - the home page and gown pages should appear in well
      under 3 seconds on 4G. (For a formal check, run <https://pagespeed.web.dev> against
      your homepage: aim for LCP under 2.5 s and CLS under 0.1 on the *observed* metrics.)
- [ ] Photos and videos still display after a **redeploy** (proves Blob storage is active -
      if media disappears after redeploying, step 14c wasn’t completed).
- [ ] Google Search Console: site added, `https://mummy2be.com/sitemap.xml` submitted.
- [ ] Google Business Profile created as a **service-area business** (Toronto, Mississauga,
      Brampton, GTA, Ontario - no street address shown), same phone/email as the site.
- [ ] GA4 conversions marked (step 13.4).

### Making changes later

- **Content, gowns, availability, photos, videos, FAQs, articles** → all in `/admin`, live
  instantly. No redeploy needed.
- **Code changes** → commit & push in VS Code (Source Control → message → Commit → Sync).
  Vercel redeploys automatically.
- **If you ever change the data structure** (new fields in `src/collections/…`) → run
  `npm run dev` locally once (it updates the Neon tables), run `npm run generate:types`,
  then push.

---

**Questions while setting up?** Every error message sent to your developer usually resolves in
minutes. The stack here - Next.js, Payload, Neon, Resend, Vercel - is deliberately mainstream,
well-documented, and free-tier friendly.
