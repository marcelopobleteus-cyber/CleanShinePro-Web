import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPage = () => {
    return (
        <div className="bg-[#020617] text-white min-h-screen pt-24 pb-12 font-sans">

            {/* Header */}
            <div className="container mx-auto px-6 max-w-4xl text-center mb-16">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 font-heading">
                    Privacy <span className="text-emerald-400">Policy</span>
                </h1>
                <p className="text-slate-400 text-lg">
                    Last Updated: February 2026
                </p>
            </div>

            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-[#0B1121] border border-white/5 rounded-2xl p-8 md:p-12 space-y-10 shadow-2xl">

                    {/* Introduction */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Shield className="text-emerald-400" /> Introduction
                        </h2>
                        <p className="text-slate-400 leading-relaxed mb-4">
                            Welcome to CleanShine Pro LLC. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    {/* Data Collection */}
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <Eye className="text-emerald-400" /> Information We Collect
                        </h2>
                        <ul className="list-disc list-inside space-y-3 text-slate-400 leading-relaxed ml-2">
                            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data:</strong> includes billing address, service address, email address and telephone numbers.</li>
                            <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of services you have purchased from us.</li>
                            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                        </ul>
                    </section>

                    {/* How We Use Information */}
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">How We Use Your Data</h2>
                        <p className="text-slate-400 leading-relaxed mb-4">
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-slate-400 ml-2">
                            <li>To register you as a new customer.</li>
                            <li>To process and deliver your service orders including managing payments, fees and charges.</li>
                            <li>To manage our relationship with you which will include notifying you about changes to our terms or privacy policy.</li>
                            <li>To administer and protect our business and this website (including troubleshooting, data analysis, testing, system maintenance, support, reporting and hosting of data).</li>
                        </ul>
                    </section>

                    {/* Data Security */}
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <Lock className="text-emerald-400" /> Data Security
                        </h2>
                        <p className="text-slate-400 leading-relaxed mb-4">
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
                        </p>
                    </section>

                    {/* Third Parties */}
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">Third-Party Links</h2>
                        <p className="text-slate-400 leading-relaxed">
                            This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy policy of every website you visit.
                        </p>
                    </section>

                    {/* Contact Details */}
                    <section className="border-t border-white/10 pt-8 mt-8">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <FileText className="text-emerald-400" /> Contact Details
                        </h2>
                        <p className="text-slate-400 leading-relaxed mb-4">
                            If you have any questions about this privacy policy or our privacy practices, please contact us at:
                        </p>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <p className="text-white font-bold mb-1">CleanShine Pro LLC</p>
                            <p className="text-slate-400">900 Buice Lake Pkwy</p>
                            <p className="text-slate-400 mb-4">Acworth, GA 30102</p>
                            <p className="text-emerald-400">contact@cleanshinepro.com</p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
