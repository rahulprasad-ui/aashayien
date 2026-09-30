'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function TermsClient() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-[#ED1F24] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900">Terms & Conditions</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="policy-content">
          <h1>Terms & Conditions</h1>
          <p className="text-slate-600">Last Updated: January 8, 2025</p>

          <h2>1. Agreement to Terms</h2>
          <p>
            Welcome to Aashayein Judiciary. These Terms and Conditions (&quot;Terms&quot;) govern
            your access to and use of our website, courses, and services. By accessing or using our
            services, you agree to be bound by these Terms.
          </p>
          <p>
            Please read these Terms carefully before using our services. If you do not agree with
            these Terms, you must not access or use our services.
          </p>

          <h2>2. Eligibility</h2>
          <p>To use our services, you must:</p>
          <ul>
            <li>Be at least 18 years of age or have parental/guardian consent</li>
            <li>Provide accurate and complete registration information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>

          <h2>3. User Accounts</h2>
          <p>
            When you create an account with us, you are responsible for maintaining the
            confidentiality of your account and password. You agree to accept responsibility for all
            activities that occur under your account. You must notify us immediately of any
            unauthorized use of your account.
          </p>

          <h2>4. Use of Services</h2>

          <h3>4.1 Permitted Use</h3>
          <p>
            Our courses and materials are provided for personal educational purposes only. You may:
          </p>
          <ul>
            <li>Access and view course content you&apos;ve enrolled in</li>
            <li>Download materials for personal study purposes</li>
            <li>Participate in discussions and forums</li>
          </ul>

          <h3>4.2 Prohibited Activities</h3>
          <p>You agree NOT to:</p>
          <ul>
            <li>Share your login credentials with others</li>
            <li>Copy, redistribute, or sell our course materials</li>
            <li>Record, screenshot, or download video lectures for distribution</li>
            <li>Use our services for any illegal or unauthorized purpose</li>
            <li>Attempt to hack, reverse engineer, or circumvent security measures</li>
            <li>Upload viruses or malicious code</li>
            <li>Spam, harass, or abuse other users</li>
            <li>Impersonate any person or entity</li>
          </ul>

          <h2>5. Payments and Fees</h2>

          <h3>5.1 Course Fees</h3>
          <p>
            All course fees are clearly displayed on our website. Prices are subject to change
            without notice, but changes will not affect enrollments already completed. All fees are
            in Indian Rupees (INR) unless otherwise specified.
          </p>

          <h3>5.2 Payment Methods</h3>
          <p>
            We accept various payment methods including credit/debit cards, UPI, net banking, and
            other payment gateways as displayed during checkout. All payments are processed through
            secure, encrypted payment gateways.
          </p>

          <h3>5.3 Refunds</h3>
          <p>
            For detailed information about refunds, cancellations, and our money-back guarantee,
            please refer to our <Link href="/refund-policy">Refund Policy</Link>.
          </p>

          <h2>6. Intellectual Property Rights</h2>
          <p>
            All content on our platform, including but not limited to course materials, video
            lectures, study notes, test papers, logos, branding, and software, is the exclusive
            property of Aashayein Judiciary and is protected by copyright, trademark, and other
            intellectual property laws.
          </p>
          <p>
            You are granted a limited, non-exclusive, non-transferable license to access and use the
            course materials for your personal educational purposes only. Unauthorized use,
            reproduction, or distribution is strictly prohibited and may result in legal action.
          </p>

          <h2>7. Course Access and Duration</h2>
          <p>
            Course access duration varies by course type and will be clearly specified at the time
            of enrollment. We reserve the right to modify course content, instructors, or schedules
            with reasonable notice. In case of significant changes, enrolled students will be
            notified in advance.
          </p>

          <h2>8. Disclaimer of Warranties</h2>
          <p>
            Our services are provided &quot;as is&quot; and &quot;as available&quot; without any
            warranties of any kind, either express or implied. We do not guarantee:
          </p>
          <ul>
            <li>Specific exam results or career outcomes</li>
            <li>Uninterrupted or error-free service</li>
            <li>That defects will be corrected</li>
            <li>That our servers are free of viruses or other harmful components</li>
          </ul>

          <h2>9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Aashayein Judiciary shall not be liable for:
          </p>
          <ul>
            <li>Indirect, incidental, special, consequential, or punitive damages</li>
            <li>Loss of profits, revenue, data, or use</li>
            <li>Technical issues beyond our reasonable control</li>
            <li>Any damages exceeding the amount you paid for the specific course</li>
          </ul>

          <h2>10. Account Termination</h2>
          <p>We reserve the right to suspend or terminate your account if:</p>
          <ul>
            <li>You violate these Terms and Conditions</li>
            <li>You engage in fraudulent activities</li>
            <li>Your payment fails or is disputed</li>
            <li>You share copyrighted content without authorization</li>
            <li>We receive complaints about your conduct</li>
          </ul>
          <p>
            Upon termination, your right to use the services will immediately cease. We may also
            delete your account and all associated data.
          </p>

          <h2>11. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Aashayein Judiciary, its affiliates, officers,
            directors, employees, and agents from any claims, damages, losses, liabilities, and
            expenses (including legal fees) arising from your use of our services or violation of
            these Terms.
          </p>

          <h2>12. Privacy Policy</h2>
          <p>
            Your use of our services is also governed by our{' '}
            <Link href="/privacy-policy">Privacy Policy</Link>. Please review it to understand how
            we collect, use, and protect your personal information.
          </p>

          <h2>13. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective
            immediately upon posting to our website. Your continued use of our services after
            changes are posted constitutes your acceptance of the modified Terms. We recommend
            reviewing these Terms periodically.
          </p>

          <h2>14. Governing Law and Jurisdiction</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India. Any
            disputes arising from these Terms or your use of our services shall be subject to the
            exclusive jurisdiction of the courts in New Delhi, India.
          </p>

          <h2>15. Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid, that provision
            will be limited or eliminated to the minimum extent necessary so that these Terms will
            otherwise remain in full force and effect.
          </p>

          <h2>16. Entire Agreement</h2>
          <p>
            These Terms, together with our Privacy Policy and Refund Policy, constitute the entire
            agreement between you and Aashayein Judiciary regarding the use of our services.
          </p>

          <h2>17. Contact Us</h2>
          <p>
            If you have any questions or concerns about these Terms and Conditions, please contact
            us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:legal@aashayeinjudiciary.com">legal@aashayeinjudiciary.com</a>
            </li>
            <li>
              <strong>Phone:</strong> <a href="tel:+911234567890">+91 123 456 7890</a>
            </li>
            <li>
              <strong>Address:</strong> 123 Legal District, New Delhi - 110001, India
            </li>
          </ul>
          <p>
            You can also visit our <Link href="/contact">Contact Page</Link> for more ways to reach
            us.
          </p>
        </div>

        <style jsx global>{`
          .policy-content h1 {
            font-size: 2.5rem;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 1rem;
          }

          .policy-content h2 {
            font-size: 2rem;
            font-weight: 700;
            color: #0f172a;
            margin-top: 4rem;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #e2e8f0;
          }

          .policy-content h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #0f172a;
            margin-top: 3rem;
            margin-bottom: 1.5rem;
          }

          .policy-content h4 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #0f172a;
            margin-top: 2rem;
            margin-bottom: 1rem;
          }

          .policy-content p {
            font-size: 1.125rem;
            line-height: 1.8;
            color: #334155;
            margin-bottom: 2rem;
          }

          .policy-content ul,
          .policy-content ol {
            font-size: 1.125rem;
            color: #334155;
            margin-bottom: 2rem;
            margin-left: 1.5rem;
          }

          .policy-content ul {
            list-style-type: disc;
          }

          .policy-content ol {
            list-style-type: decimal;
          }

          .policy-content li {
            margin-bottom: 0.75rem;
            line-height: 1.8;
            padding-left: 0.5rem;
          }

          .policy-content strong {
            font-weight: 600;
            color: #0f172a;
          }

          .policy-content a {
            color: #ed1f24;
            text-decoration: none;
          }

          .policy-content a:hover {
            text-decoration: underline;
          }
        `}</style>
      </div>
    </div>
  )
}
