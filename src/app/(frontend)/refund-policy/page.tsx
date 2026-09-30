import { PolicyLayout } from '@/components/aashayien/PolicyLayout'

export const metadata = {
  title: 'Refund & Cancellation Policy - Aashayein Judiciary',
  description: 'Understand our fair and transparent refund and cancellation policies.',
  alternates: {
    canonical: 'https://aashayein.in/refund-policy',
  },
}

export default function RefundPolicyPage() {
  return (
    <PolicyLayout title="Refund & Cancellation Policy" lastUpdated="January 8, 2025">
      <h2>1. Our Commitment</h2>
      <p>
        At Aashayein Judiciary, we are committed to providing high-quality educational services. We
        understand that circumstances may change, and we&apos;ve designed our refund policy to be
        fair and transparent for all our students.
      </p>

      <h2>2. 7-Day Money-Back Guarantee</h2>
      <p>
        We offer a 7-day money-back guarantee for most of our courses. If you&apos;re not satisfied
        with your purchase, you can request a full refund within 7 days of enrollment.
      </p>

      <h3>2.1 Conditions for Money-Back Guarantee</h3>
      <p>
        To be eligible for the 7-day money-back guarantee, the following conditions must be met:
      </p>
      <ul>
        <li>Less than 20% of course content has been accessed</li>
        <li>No study materials have been downloaded</li>
        <li>Request is made within 7 days of enrollment date</li>
      </ul>

      <h2>3. Refund Eligibility</h2>
      <h3>3.1 Eligible for Refund</h3>
      <p>You may be eligible for a refund in the following situations:</p>
      <ul>
        <li>Technical issues preventing course access after we&apos;ve attempted resolution</li>
        <li>Duplicate payment made by mistake</li>
        <li>Course cancelled or discontinued by Aashayein Judiciary</li>
      </ul>

      <h2>4. How to Request a Refund</h2>
      <p>To request a refund, please follow these steps:</p>
      <ol>
        <li>
          <strong>Submit Request:</strong> Email us at refunds@aashayeinjudiciary.com with your
          order number.
        </li>
        <li>
          <strong>Verification:</strong> Our team will verify your eligibility within 2-3 business
          days.
        </li>
        <li>
          <strong>Processing:</strong> Refunds will be processed within 7-10 business days.
        </li>
      </ol>
    </PolicyLayout>
  )
}
