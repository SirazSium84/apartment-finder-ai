# 🏠 AI Apartment Finder

An intelligent student apartment rental platform built with Next.js 15, TypeScript, and OpenAI GPT-4o that generates personalized apartment listings based on user criteria.

![AI Apartment Finder](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- 🤖 **AI-Powered Listing Generation** - Generate realistic apartment listings using OpenAI GPT-4o
- 🎨 **Modern UI/UX** - Beautiful dark theme with shadcn/ui components
- 🔍 **Advanced Filtering** - Search by location, price, university, amenities
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Real-time Updates** - New AI-generated listings appear instantly
- 📞 **Contact Integration** - Direct landlord communication
- 🏫 **Student-Focused** - Specifically designed for student housing needs

## 🚀 Tech Stack

- **Framework:** Next.js 15 with Turbopack
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **AI Integration:** OpenAI AI SDK with GPT-4o
- **Schema Validation:** Zod
- **Package Manager:** pnpm
- **Database:** In-memory (expandable to your preferred DB)

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SirazSium84/apartment-finder-ai.git
   cd apartment-finder-ai
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   Add your OpenAI API key to `.env.local`:
   ```
   OPENAI_API_KEY=your-openai-api-key-here
   ```

4. **Run the development server:**
   ```bash
   pnpm dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🎯 How It Works

1. **Browse Existing Listings** - View pre-loaded apartment listings with filtering options
2. **Generate Custom Listings** - Click "Generate with AI" and fill out your criteria
3. **AI Magic** - OpenAI GPT-4o creates realistic listings matching your preferences
4. **Instant Results** - New listings appear at the top of the page
5. **Contact Landlords** - Use built-in contact features to reach out

## 📸 Screenshots

*Add screenshots of your application here*

## 🔧 API Endpoints

- `GET /` - Main apartment listings page
- `POST /api/generate-listings` - AI-powered listing generation
- `POST /api/chat` - Chat functionality (expandable)

## 🏗️ Project Structure

```
apartment-finder-ai/
├── app/
│   ├── api/
│   │   ├── generate-listings/
│   │   └── chat/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
├── lib/
│   └── utils.ts
└── package.json
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- 🐛 Report bugs
- 💡 Suggest new features
- 🔧 Submit pull requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Md Siraz uz Zaman**
- GitHub: [@SirazSium84](https://github.com/SirazSium84)
- Project Link: [apartment-finder-ai](https://github.com/SirazSium84/apartment-finder-ai)

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for GPT-4o API
- [Vercel](https://vercel.com/) for Next.js framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

⭐ **Star this repository if you found it helpful!**
