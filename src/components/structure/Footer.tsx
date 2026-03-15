export default function Footer() {
    return (
        <footer className="p-6 border-t border-white/70 bg-[#0f1718]/50 text-center text-sm font-mono">
            &copy; {new Date().getFullYear()} STEELCODE.CZ — ALL RIGHTS RESERVED
        </footer>
    );
}