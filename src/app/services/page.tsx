// Services page for Fusion Info Tech

export default function Services() {
    return (
        <section>
            <h1 className="text-3xl font-bold text-brand-navy mb-8">Our Services</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow p-6 border border-brand-gray">
                    <h2 className="text-xl font-semibold text-brand-navy mb-2">IT Consulting</h2>
                    <ul className="list-disc pl-6 text-brand-darkgray space-y-1">
                        <li>Technology strategy & planning</li>
                        <li>Process optimization</li>
                        <li>Cloud migration & management</li>
                        <li>Security & compliance</li>
                    </ul>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border border-brand-gray">
                    <h2 className="text-xl font-semibold text-brand-navy mb-2">Software Development</h2>
                    <ul className="list-disc pl-6 text-brand-darkgray space-y-1">
                        <li>Custom web & mobile apps</li>
                        <li>API & backend development</li>
                        <li>UI/UX design & prototyping</li>
                        <li>Maintenance & support</li>
                    </ul>
                </div>
            </div>
        </section>
    );
} 