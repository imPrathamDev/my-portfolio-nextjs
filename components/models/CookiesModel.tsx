const CookiesModel = ({
  acceptCookieConsent,
  hideCookieContainer,
}: {
  acceptCookieConsent: () => void;
  hideCookieContainer: () => void;
}) => {
  return (
    <section
      id="cookie-container"
      className="fixed bottom-4 right-4 left-4 px-4 py-1.5 rounded-md lg:rounded-full bg-primary-black/10 backdrop-blur-lg border border-primary-white/10 flex flex-col lg:flex-row items-center justify-between transform translate-y-52"
    >
      <p>
        We use cookies to improve your experience. By continuing to browse the
        site you are agreeing to our Privacy Policy
      </p>
      <div className="flex items-center gap-x-2 text-lg font-dream-avenue font-medium my-1 lg:my-0">
        <button
          onClick={() => hideCookieContainer()}
          className="text-primary-white transition-all hover:text-primary/60 linkHover"
        >
          Deny
        </button>
        <button
          onClick={() => acceptCookieConsent()}
          className="text-primary/60 transition-all hover:text-primary-white/60 linkHover"
        >
          Accept
        </button>
      </div>
    </section>
  );
};

export default CookiesModel;
