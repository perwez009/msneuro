import Footer from "@/components/Footer";
import Header from "@/components/Header";
import pagesContent from "@/content/pages.json";

export default function PreprocessingPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="bg-gray-900 text-gray-300 min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{pagesContent.preprocessing.title}</h2>
            <p className="text-lg text-gray-400">{pagesContent.preprocessing.description}</p>
          </div>

          <section className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-white mb-6">{pagesContent.preprocessing.stepsHeading}</h3>
            <div className="space-y-4">
              {pagesContent.preprocessing.steps.map((step, index) => (
                <div key={step.title} className="rounded-xl border border-white/10 bg-slate-950/40 p-4 md:p-5">
                  <p className="text-sm text-sky-300 mb-1">Step {index + 1}</p>
                  <h4 className="text-lg font-semibold text-white">{step.title}</h4>
                  <p className="text-gray-300 mt-2">{step.details}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
