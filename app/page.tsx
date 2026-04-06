'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const form = document.getElementById('multi-step-form') as HTMLFormElement
    const step1 = document.getElementById('step-1') as HTMLElement
    const step2 = document.getElementById('step-2') as HTMLElement
    const proceedBtn = document.getElementById('proceed-btn') as HTMLButtonElement
    const formTitle = document.querySelector('h3.text-2xl.font-bold.mb-2') as HTMLElement

    async function submitToHubSpot(data: Record<string, string>, stepNumber: number) {
      try {
        const response = await fetch('/api/submit-hubspot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...data, stepNumber }),
        })
        return response.ok
      } catch (error) {
        console.error('HubSpot submission error:', error)
        return false
      }
    }

    // STEP 1: Send data when user clicks "Proceed"
    proceedBtn?.addEventListener('click', async () => {
      const step1Inputs = step1.querySelectorAll('input') as NodeListOf<HTMLInputElement>
      let allValid = true

      step1Inputs.forEach((input) => {
        if (!input.checkValidity()) {
          input.reportValidity()
          allValid = false
        }
      })

      if (allValid) {
        // Collect Step 1 data
        const data: Record<string, string> = {}
        step1Inputs.forEach((input) => {
          data[input.name] = input.value
        })

        // Send Step 1 data to HubSpot (fire and forget - doesn't block form)
        submitToHubSpot(data, 1)
          .then((sent) => {
            if (!sent) {
              console.warn('HubSpot Step 1 submission failed, but form will proceed')
            }
          })
          .catch((error) => {
            console.error('HubSpot Step 1 error:', error)
          })

        // Always proceed to Step 2, regardless of HubSpot status
        step1.classList.add('hidden')
        step2.classList.remove('hidden')
        if (formTitle) formTitle.textContent = 'Additional Information'
      }
    })

    // STEP 2: Send data when user clicks "Submit Details"
    form?.addEventListener('submit', async (e) => {
      e.preventDefault()
      const step2Inputs = step2.querySelectorAll('input, select, textarea') as NodeListOf<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
      let allValid = true

      step2Inputs.forEach((input) => {
        if (input.required && !input.value) {
          input.reportValidity()
          allValid = false
        }
      })

      if (!allValid) return

      // Collect Step 2 data
      const data: Record<string, string> = {}
      step2Inputs.forEach((input) => {
        data[input.name] = input.value
      })

      // Include email from Step 1
      const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement
      if (emailInput && emailInput.value) {
        data.email = emailInput.value
      }

      // Send Step 2 data to HubSpot
      try {
        await submitToHubSpot(data, 2)
      } catch (error) {
        console.error('HubSpot Step 2 error:', error)
      } finally {
        router.push('/thank-you/')
      }
    })

    // Add event listeners to all "I'm Interested" buttons
    document.querySelectorAll('.interested-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        document.getElementById('multi-step-form')?.scrollIntoView({ behavior: 'smooth' })
      })
    })
  }, [router])

  if (!mounted) return null

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
            <div className="flex items-center gap-4">
              <button className="hidden sm:block text-white px-6 py-2 rounded-xl font-bold text-sm transition-all bg-red-600 hover:bg-red-700 interested-btn">
                Admission Open 2026-27
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative min-h-[600px] flex items-center py-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <img
              alt="Hero Background"
              className="w-full h-full object-cover"
              src="https://cdn.lugc.link/23b5c3a4-c33c-47ea-882a-e294fcedd25e/-/format/auto/-/stretch/off/-/resize/x1280/"
            />
          </div>
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-2">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-2xl max-w-md mx-auto lg:mx-0 border border-slate-100 dark:border-slate-800">
                  <h3 className="text-2xl font-bold mb-2">Enquire Now</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
                    Start your journey with us today. Fill out the form below to get started.
                  </p>
                  <form className="space-y-4" id="multi-step-form">
                    <div className="space-y-4" id="step-1">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                          Name
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                          name="firstname"
                          placeholder="Your Name"
                          required
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                          Name of Student
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                          name="student_name"
                          placeholder="Student's Full Name"
                          required
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                          Email
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                          name="email"
                          placeholder="email@example.com"
                          required
                          type="email"
                        />
                      </div>
                      <button
                        className="w-full text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 bg-red-600 hover:bg-red-700"
                        id="proceed-btn"
                        type="button"
                      >
                        Proceed
                      </button>
                    </div>
                    <div className="space-y-4 hidden" id="step-2">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                          Contact no.
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                          name="phone_number"
                          placeholder=" 0000 0000"
                          required
                          type="tel"
                          maxLength={11}
                          title="Please enter a valid number without country code"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                          Residential Status
                        </label>
                        <select
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                          name="residential_status"
                          required
                        >
                          <option disabled selected value="">
                            Select an Option
                          </option>
                          <option>Singapore Citizen</option>
                          <option>Singapore Permanent Resident</option>
                          <option>Dependent Pass</option>
                          <option>Long Term Visit Visa</option>
                          <option>Student Pass</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                          Select a campus
                        </label>
                        <select
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                          name="campus"
                          required
                        >
                          <option disabled selected value="">
                            Select an Option
                          </option>
                          <option>Bukit Timah Campus</option>
                          <option>Valley Point Campus</option>
                          <option>Upper Serangoon Road Campus</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                          Select Grade
                        </label>
                        <select
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                          name="grade"
                          required
                        >
                          <option disabled selected value="">
                            Select an Option
                          </option>
                          <option>Grade 1</option>
                          <option>Grade 2</option>
                          <option>Grade 3</option>
                          <option>Grade 4</option>
                          <option>Grade 5</option>
                          <option>Grade 6</option>
                          <option>Grade 7</option>
                          <option>Grade 8</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                          Feedback (Optional)
                        </label>
                        <textarea
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                          name="feedback"
                          placeholder="Your feedback..."
                          rows={3}
                        ></textarea>
                      </div>
                      <button
                        className="w-full text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-600/20 bg-red-600 hover:bg-red-700"
                        id="submit-details-btn"
                        type="submit"
                      >
                        Submit Details
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="order-1 text-white text-center lg:text-left lg:order-1">
                <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 bg-accent">
                  Wise Oaks International School
                </span>
                <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                  Give Wings of reality to boundless dreams of your child with <br />
                  <span className="text-accent">Wise Oaks</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl lg:mx-0 mx-auto leading-relaxed">
                  We believe that your child deserves the best of learning and we provide it in the most affordable way.
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-accent">menu_book</span>
                    <span className="font-medium">Robust Cambridge curriculum</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-accent">calculate</span>
                    <span className="font-medium">Proven Singapore Maths</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="locations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-black">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-3 text-black">Our Locations</h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-4"></div>
            <p className="text-slate-900 max-w-2xl mx-auto">
              Discover our global presence and state-of-the-art facilities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                <img
                  alt="BUKIT CAMPUS"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src="https://res.cloudinary.com/dw9v7jjrq/image/upload/v1773916355/Upper_bukit_timah_road_lwcicg.jpg"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">BUKIT TIMAH CAMPUS</h3>
              <p className="text-slate-900 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">location_on</span> 205 Upper Bukit Timah Rd, #02-01, Singapore 588181
              </p>
            </div>
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                <img
                  alt="VALLEY POINT CAMPUS"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src="https://res.cloudinary.com/dw9v7jjrq/image/upload/v1773916298/Valley_point_hoaemw.jpg"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">VALLEY POINT CAMPUS</h3>
              <p className="text-slate-900 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">location_on</span> 491B, River Valley Road, Office Tower #17-01/04, Singapore 248373
              </p>
            </div>
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                <img
                  alt="UPPER SERANGOON ROAD CAMPUS"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src="https://res.cloudinary.com/dw9v7jjrq/image/upload/v1773916351/Upper_serangoon_road_baxqby.jpg"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">UPPER SERANGOON ROAD CAMPUS</h3>
              <p className="text-slate-900 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">location_on</span> #02-01-13, 780, Upper Serangoon Road, Singapore - 534649
              </p>
            </div>
          </div>
        </section>

        <section id="programmes" className="bg-[#000080] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h2 className="text-4xl font-bold mb-2">Programmes Offered</h2>
                <div className="w-40 h-1 bg-red-600 mb-10"></div>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full shrink-0"></span>
                    <span className="text-lg">Foundation Plus - Reception year program</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full shrink-0"></span>
                    <span className="text-lg">Cambridge Primary Programme (Grades 1 to 5)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full shrink-0"></span>
                    <span className="text-lg">Cambridge Lower Secondary Programme (Grades 6 to 8)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full shrink-0"></span>
                    <span className="text-lg">Cambridge IGCSE Programme (Grades 9 & 10)</span>
                  </li>
                </ul>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors interested-btn mx-auto block lg:mx-0">
                  Yes I'm Interested
                </button>
              </div>
              <div className="relative">
                <img
                  alt="Puzzle image"
                  className="w-full h-auto rounded-lg shadow-2xl"
                  src="https://cdn.lugc.link/b8619a43-624e-46a7-a4aa-b9b992a5b49d/-/preview/400x302/-/format/auto/"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background-light py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-black">Why Choose Us</h2>
              <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              <div className="bg-slate-50 p-10 rounded-2xl border-2 border-amber-400 flex flex-col items-center text-center shadow-sm">
                <div className="w-20 h-20 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl text-5xl">lightbulb</span>
                </div>
                <h4 className="font-bold text-lg mb-2 text-black">
                  Apart from Cambridge based curriculum and Singapore Mathematics, our programmes are thoughtfully designed
                </h4>
                <p className="text-black text-sm leading-relaxed">
                  <ul className="space-y-1 mt-4">
                    <li className="flex items-start justify-center gap-2 text-black">- WiseTech CodeSpark</li>
                    <li className="flex items-start justify-center gap-2 text-black">- LingoLex (Language Enrichment Program)</li>
                    <li className="flex items-start justify-center gap-2 text-black">
                      - Thematic CCAs & ECAs includes both sports and non sports activities.
                    </li>
                    <li className="flex items-start justify-center gap-2 text-black">- Skill Enhancement Programs</li>
                  </ul>
                </p>
              </div>
              <div className="bg-slate-50 p-10 rounded-2xl border-2 border-amber-400 flex flex-col items-center text-center shadow-sm">
                <div className="w-20 h-20 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl text-5xl">settings_suggest</span>
                </div>
                <h4 className="font-bold text-lg mb-2 text-black">Technology aided delivery mechanism</h4>
                <p className="text-black text-sm leading-relaxed">
                  <ul className="space-y-1 mt-4">
                    <li className="flex items-start justify-center gap-2 text-black">- Students Management System</li>
                    <li className="flex items-start justify-center gap-2 text-black">- Learning Management System</li>
                  </ul>
                </p>
              </div>
              <div className="bg-slate-50 p-10 rounded-2xl border-2 border-amber-400 flex flex-col items-center text-center shadow-sm">
                <div className="w-20 h-20 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl text-5xl">groups</span>
                </div>
                <h4 className="font-bold text-lg mb-2 text-black">Best in Town Fee structure underscoring our philosophy</h4>
                <p className="text-black text-sm leading-relaxed">
                  <ul className="space-y-1 mt-4">
                    <li className="flex items-start justify-center gap-2 text-black">- Students before Educators</li>
                    <li className="flex items-start justify-center gap-2 text-black">- Education before Business and</li>
                    <li className="flex items-start justify-center gap-2 text-black">- Quality Education Everyone's Right</li>
                  </ul>
                </p>
              </div>
              <div className="bg-slate-50 p-10 rounded-2xl border-2 border-amber-400 flex flex-col items-center text-center shadow-sm">
                <div className="w-20 h-20 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl text-5xl">auto_stories</span>
                </div>
                <h4 className="font-bold text-lg mb-2 text-black">Serene and Convenient Location</h4>
                <p className="text-black text-sm leading-relaxed">
                  <ul className="space-y-1 mt-4">
                    <li className="flex items-start justify-center gap-2 text-black">- Close to National Nature Reserves</li>
                    <li className="flex items-start justify-center gap-2 text-black">
                      - 5 minutes walk from Beauty World MRT station on Blue line
                    </li>
                    <li className="flex items-start justify-center gap-2 text-black">- Strategically located near many sports facilities</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="admissions" className="bg-[#000080] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <h2 className="text-3xl font-bold tracking-tight mb-6 text-white">Admission Process</h2>
                <div className="w-40 h-1 bg-red-600 mb-10"></div>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 text-white rounded-full flex items-center justify-center font-bold bg-accent">
                      1
                    </div>
                    <div>
                      <h5 className="font-bold text-lg mb-1 text-white">Online/In-person Application</h5>
                      <p className="text-slate-300">Complete the application form in person or Online submission.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h5 className="font-bold text-lg mb-1 text-white">Document Submission</h5>
                      <p className="text-slate-300">Submit the supporting documents to our Admissions team.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h5 className="font-bold text-lg mb-1 text-white">Assessment & Visit</h5>
                      <p className="text-slate-300">Schedule - Aptitude Test & a Visit to the school.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h5 className="font-bold text-lg mb-1 text-white">Student Contract</h5>
                      <p className="text-slate-300">
                        Upon acceptance of a place at Wise Oaks, execute the student contract.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h5 className="font-bold text-lg mb-1 text-white">Fee Payment</h5>
                      <p className="text-slate-300">Pay the applicable fees.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center font-bold">
                      6
                    </div>
                    <div>
                      <h5 className="font-bold text-lg mb-1 text-white">Final Documentation</h5>
                      <p className="text-slate-300">Submit the final documentation before school starts.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    alt="Students"
                    className="w-full h-full object-cover"
                    src="https://res.cloudinary.com/dw9v7jjrq/image/upload/v1773917909/image.jpg_lpo6kc.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className="bg-white dark:bg-background-dark py-16 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="max-w-2xl mx-auto md:mx-0">
              <h3 className="text-2xl md:text-3xl font-bold text-black leading-tight text-center md:text-left">
                Still Have doubts,
                <br />
                Schedule a 15 minute online session with us.
              </h3>
            </div>
            <div className="flex-shrink-0">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg shadow-red-600/20 whitespace-nowrap interested-btn">
                Yes I'm Interested
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#f9f9f9] text-slate-600 py-12 border-t border-slate-200 bg-[#f0f0f0] pt-12 pb-4">
        <div className="text-center w-full py-6">
          <p className="text-slate-600 text-lg">Copyright © 2025 | Wise Oaks international School</p>
        </div>
      </footer>
    </div>
  )
}
