export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800 mt-12 py-8">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-around gap-4">
        <a href="https://peerlist.io/i_saurabh/project/headbanger-blogs" target="_blank" rel="noreferrer">
          <img
            src="https://peerlist.io/api/v1/projects/embed/PRJHDNDEK9K9B7B8R3A6OO7GN7LBNQ?showUpvote=true&theme=dark"
            alt="Headbanger Blogs"
            className="w-auto h-18"
          />
        </a>
        <p className="text-neutral-400 text-sm">
          Made with ❤️ by{' '}
          <a
            href="https://headbanger.me/"
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