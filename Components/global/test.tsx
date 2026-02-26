// components/ServicesList.tsx
import React from 'react';

interface Service {
    id: number;
    slug: string;
    title: {
        rendered: string;
    };
    acf: {
        description: string;
    };
}

async function getServices(): Promise<Service[]> {
    const res = await fetch(
        'https://wordpress-1592566-6232100.cloudwaysapps.com/wp-json/wp/v2/services?_fields=id,slug,title,acf&_embed',
        { next: { revalidate: 60 } } // Revalidate every minute
    );

    if (!res.ok) {
        throw new Error('Failed to fetch services content');
    }

    return res.json();
}

export default async function ServicesList() {
    const services = await getServices();

    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 capitalize">
                    Our Featured Services
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-xl font-semibold text-blue-600 mb-3">
                                {service.title.rendered}
                            </h3>

                            <p className="text-gray-600 leading-relaxed">
                                {service.acf.description ||
                                    `Explore our professional ${service.title.rendered} solutions tailored to your business needs.`}
                            </p>

                            <button className="mt-4 text-sm font-medium text-gray-900 underline hover:text-blue-500 transition-colors">
                                Learn more about {service.slug.replace('-', ' ')}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}