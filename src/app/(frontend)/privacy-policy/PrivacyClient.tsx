'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function PrivacyClient() {
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
            <span className="text-slate-900">Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="policy-content">
          <h1>Privacy Policy</h1>
          <p className="text-slate-600">Last Updated: January 8, 2025</p>

          <h2>1. Introduction</h2>
          <p>
            At Aashayein Judiciary, we are committed to protecting your privacy and ensuring the
            security of your personal information. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website or use our services.
          </p>
          <p>
            By accessing or using our services, you agree to the terms of this Privacy Policy. If
            you do not agree with our policies and practices, please do not use our services.
          </p>

          <h2>2. Information We Collect</h2>

          <h3>2.1 Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide when you:</p>
          <ul>
            <li>Register for courses or create an account</li>
            <li>Subscribe to our newsletters or communications</li>
            <li>Contact us through our website or email</li>
            <li>Make purchases or payments</li>
            <li>Participate in surveys or feedback forms</li>
          </ul>

          <p>This may include:</p>
          <ul>
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Mailing address</li>
            <li>Date of birth</li>
            <li>Educational background</li>
            <li>Payment information</li>
            <li>Profile photograph</li>
          </ul>

          <h3>2.2 Automatically Collected Information</h3>
          <p>When you access our website, we may automatically collect certain information:</p>
          <ul>
            <li>IP address and device information</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent</li>
            <li>Referring website addresses</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect for various purposes, including:</p>
          <ul>
            <li>
              <strong>Providing Services:</strong> To deliver courses, study materials, and other
              educational services you&apos;ve enrolled in
            </li>
            <li>
              <strong>Communication:</strong> To send you updates, newsletters, course information,
              and respond to your inquiries
            </li>
            <li>
              <strong>Payment Processing:</strong> To process transactions and send receipts
            </li>
            <li>
              <strong>Improvement:</strong> To improve our website, courses, and services based on
              your feedback
            </li>
            <li>
              <strong>Marketing:</strong> To send promotional materials and special offers (with
              your consent)
            </li>
            <li>
              <strong>Legal Compliance:</strong> To comply with legal obligations and protect our
              rights
            </li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your
            personal information against unauthorized access, alteration, disclosure, or
            destruction. These measures include SSL encryption, access controls, secure storage, and
            regular security audits.
          </p>
          <p>
            However, no method of transmission over the Internet or electronic storage is 100%
            secure. While we strive to use commercially acceptable means to protect your personal
            information, we cannot guarantee its absolute security.
          </p>

          <h2>5. Sharing of Information</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share
            your information with:
          </p>
          <ul>
            <li>
              Service providers who assist us in operating our website and delivering services
            </li>
            <li>Payment processors for transaction processing</li>
            <li>Legal authorities when required by law</li>
            <li>Business partners with your explicit consent</li>
          </ul>

          <h2>6. Your Rights</h2>
          <p>You have certain rights regarding your personal information:</p>
          <ul>
            <li>
              <strong>Access:</strong> Request copies of your personal information
            </li>
            <li>
              <strong>Correction:</strong> Request correction of inaccurate information
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your information (subject to legal
              requirements)
            </li>
            <li>
              <strong>Opt-out:</strong> Unsubscribe from marketing communications
            </li>
            <li>
              <strong>Portability:</strong> Request transfer of your data to another service
            </li>
          </ul>

          <h2>7. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and
            store certain information. You can instruct your browser to refuse all cookies or to
            indicate when a cookie is being sent. However, if you do not accept cookies, you may not
            be able to use some portions of our website.
          </p>

          <h2>8. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the
            privacy practices or content of these external sites. We encourage you to review the
            privacy policies of any third-party sites you visit.
          </p>

          <h2>9. Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 18. We do not knowingly
            collect personal information from children. If you are a parent or guardian and believe
            your child has provided us with personal information, please contact us.
          </p>

          <h2>10. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes
            by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot;
            date. You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or wish to exercise your rights,
            please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:privacy@aashayeinjudiciary.com">privacy@aashayeinjudiciary.com</a>
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
