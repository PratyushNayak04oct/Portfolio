# 🌐 Pratyush Nayak — Developer Portfolio

A modern and interactive personal portfolio website built with **Next.js** showcasing animations, 3D visual effects, and smooth UX.

![Hero Screenshot](https://your-vercel-blob-url/hero/hero-image)

---

## 🔗 Live Demo

👉 [View Live Site](https://pratyush-nayak.vercel.app/)

---

## ✨ Features

- 🔥 GSAP-powered animations
- 🌈 Glowing gradient borders
- 🚀 Smooth scrolling with Lenis
- 🎮 3D objects via Spline integration
- 🖼️ Images served from Vercel Blob
- 🎨 Styled with Tailwind CSS
- ⚡ Deployed with Vercel (instant global delivery)

---

## 🧱 Tech Stack

| Technology | Description                      |
|------------|----------------------------------|
| Next.js    | React framework for SSR & routing |
| Tailwind   | Utility-first CSS framework       |
| GSAP       | Animation library                 |
| Lenis      | Smooth scrolling library          |
| Spline     | 3D model viewer                   |
| Vercel Blob| Blob storage for image assets     |
| Vercel     | Hosting & deployment              |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/pratyush-nayak/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add `.env.local`

```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxx
```

_(Only needed if you're uploading to Vercel Blob from frontend)_

### 4. Run locally

```bash
npm run dev
```

---

## 🖼️ How Image Storage Works

- Images are uploaded to **Vercel Blob** via their dashboard or API
- Images are made **public**
- You use the public URL in your component like this:

```jsx
<Image
  src="https://portfolio.blob.vercel-storage.com/hero/hero-image"
  alt="Pratyush Nayak"
  className="w-full h-full object-cover"
/>
```

---

## 📸 Screenshots

![portfolio-image](https://github.com/user-attachments/assets/945a1db3-afed-4eac-843a-3103f1a255c4)

---


## 👨‍💻 About Me

**Pratyush Nayak** — Frontend Developer passionate about creative UI, web animation, and interactive 3D web experiences.

- [Portfolio Website](https://pratyush-nayak.vercel.app/)
