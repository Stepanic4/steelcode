export default function Footer() {
    return (
        <footer className="p-6 border-t border-white/70 bg-zinc-900/80 text-center text-sm text-white/50 font-mono">
            &copy; {new Date().getFullYear()} STEELCODE.CZ — ALL RIGHTS RESERVED
        </footer>
    );
}