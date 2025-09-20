export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800 mt-12 py-8">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-neutral-400 text-sm">
          Made with ❤️ by{' '}
          <a 
            href="https://headbanger.tech/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-neutral-300 transition-colors underline"
          >
            Saurabh Sharma
          </a>
        </p>
      </div>
    </footer>
  );
}