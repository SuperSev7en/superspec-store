import Link from 'next/link';
import { ArrowLeft, CreditCard, Shield, Lock } from 'lucide-react';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/cart" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Cart
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <p className="text-yellow-800">
            <strong>Demo Mode:</strong> Checkout is not yet connected to Stripe. 
            Configure your Stripe keys in environment variables to enable payments.
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Payment</h2>
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <CreditCard className="w-5 h-5" />
                <span>Credit Card (Stripe)</span>
              </div>
              <p className="text-sm text-gray-500">
                Add your Stripe publishable key to enable payments.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Lock className="w-4 h-4" />
            <Shield className="w-4 h-4" />
            <span>Secure checkout powered by Stripe</span>
          </div>

          <button
            type="button"
            disabled
            className="w-full py-4 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed"
          >
            Configure Stripe to Enable Checkout
          </button>
        </form>
      </main>
    </div>
  );
}