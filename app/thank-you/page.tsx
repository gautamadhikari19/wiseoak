import Link from 'next/link'

export default function ThankYou() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                alt="Wise Oaks Logo"
                className="w-auto h-16"
                src="https://cdn.lugc.link/7b27182c-382d-4a1b-8782-7a6cf933c2ff/-/preview/212x75/-/format/auto/"
              />
            </div>
            <h2 className="text-lg font-bold hidden sm:block">Wise Oaks International School</h2>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-green-800 text-8xl">check_circle</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">Thank You!</h1>
            <p className="text-xl text-slate-900 mb-6">
              Your information has been successfully submitted. <br /> We're excited to help you start your journey with Wise Oaks!
            </p>
          </div>

          <div className="bg-primary p-8 rounded-xl shadow-lg border border-slate-200 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-white">What's Next?</h2>
            <div className="space-y-6 text-left">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-background-light text-black rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Review Your Information</h3>
                  <p className="text-slate-100">We've received your details and our admissions team will review your application.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-background-light text-black rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Expect Contact Soon</h3>
                  <p className="text-slate-100">Our team will reach out to you within 2-3 business days to discuss next steps.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-background-light text-black rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Schedule a Campus Visit</h3>
                  <p className="text-slate-100">Get to know our facilities and meet our team at one of our campuses.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-primary hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-lg transition-all inline-block"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-primary text-white py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg">Copyright © 2025 | Wise Oaks international School</p>
        </div>
      </footer>
    </div>
  )
}
