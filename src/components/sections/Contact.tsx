import {Mail, MessageSquare, Linkedin, MapPin} from 'lucide-react';

const contactInfo = [
    {
        label: "Email",
        value: "hello@steelcode.cz",
        link: "mailto:hello@steelcode.cz",
        icon: <Mail className="w-5 h-5"/>
    },
    {
        label: "Telegram",
        value: "Contact via Telegram",
        link: "https://t.me/steelcode_dev",
        icon: <MessageSquare className="w-5 h-5"/>
    },
    {
        label: "LinkedIn",
        value: "Connect on LinkedIn",
        link: "https://linkedin.com/company/steelcode",
        icon: <Linkedin className="w-5 h-5"/>
    }
];

export default function Contact() {
    return (
        <section id="contact" className="py-24 px-6 bg-zinc-950 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                    {/* Left side: Content */}
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-white">
                            Contact
                        </h2>
                        <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-md">
                            Ready to discuss your project? We are based in the Czech Republic and work with clients
                            across Europe. Professional approach, zero fluff.
                        </p>

                        <div
                            className="mt-10 flex items-center gap-2 text-zinc-500 uppercase tracking-widest text-xs font-medium">
                            <MapPin size={14}/>
                            <span>Prague, Czech Republic</span>
                        </div>
                    </div>

                    {/* Right side: Cards */}
                    <div className="space-y-4">
                        {contactInfo.map((item, index) => (
                            <a key={index}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-6 border border-zinc-800 bg-zinc-900/50 hover:border-blue-600 hover:bg-zinc-900 transition-all group">
                                <div className="flex items-center gap-5">
                                    <div className="text-zinc-400 group-hover:text-blue-500 transition-colors">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">
                                            {item.label}
                                        </p>
                                        <p className="text-zinc-100 font-medium tracking-tight">
                                            {item.value}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-zinc-700 group-hover:text-blue-500 transition-colors">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.16666 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15"
                                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}