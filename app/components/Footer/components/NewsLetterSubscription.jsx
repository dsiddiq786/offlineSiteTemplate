const NewsletterSubscription = () => {
  return (
    <div className="space-y-4 text-white">
      {/* Header */}
      <h2 className="text-[20px] font-bold">
        Get exclusive inspiration for your next stay – <br />
        subscribe to our newsletter.
      </h2>

      {/* Input Field & Button */}
      <div className="flex items-center gap-4">
        <div className="w-full">
          <label className="mb-1 block text-sm" htmlFor="email">
            Email address
          </label>
          <input
            disabled
            className="w-full cursor-not-allowed border-b border-blue-500 bg-transparent text-white focus:outline-none"
            id="email"
            placeholder=""
            type="email"
          />
        </div>
        <button
          disabled
          className="cursor-not-allowed rounded-md bg-[#0079c2] px-8 py-2 font-semibold"
        >
          Subscribe
        </button>
      </div>

      {/* Footer */}
      <div className="mt-4 text-xs text-gray-400">
        <p>
          <strong className="text-white">trivago N.V.</strong>, Kesselstraße 5 –
          7, 40221 Düsseldorf, Germany
        </p>
        <p>Copyright 2025 trivago | All rights reserved.</p>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
