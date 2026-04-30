import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ResourcesPage() {
    return (
        <div style={{ fontFamily: "'Inter', sans-serif" }} className="bg-gray-900 text-gray-300 min-h-screen">
            <Header />
            <main className="container mx-auto px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Curated Resources</h2>
                        <p className="text-lg text-gray-400">A collection of essential tools, libraries, and learning materials.</p>
                    </div>
                    {/* ... (rest of the page content is the same) */}
                </div>
            </main>
            <Footer />
        </div>
    );
}
