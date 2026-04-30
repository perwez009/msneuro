import Footer from "@/components/Footer";
import Header from "@/components/Header";
import pagesContent from "@/content/pages.json";

export default function ForumPage() {
    return (
        <div style={{ fontFamily: "'Inter', sans-serif" }} className="bg-gray-900 text-gray-300 min-h-screen">
            <Header />
            <main className="container mx-auto px-6 py-16 flex-grow flex items-center">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{pagesContent.forum.title}</h2>
                    <p className="text-lg text-gray-400 mb-8">{pagesContent.forum.description}</p>
                    <div className="bg-gray-800/50 p-8 rounded-lg">
                        <h3 className="text-2xl font-bold text-cyan-400 mb-4">{pagesContent.forum.cardTitle}</h3>
                        <p className="text-gray-300">{pagesContent.forum.cardDescription}</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
