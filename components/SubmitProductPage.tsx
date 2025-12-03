import React, { useState } from 'react';
import type { Product } from '../types';

interface SubmitProductPageProps {
    onSubmit: (productData: Omit<Product, 'id' | 'reviews' | 'rating' | 'reviewCount' | 'upvotes' | 'status' | 'vendorId'>) => void;
}

const InputField: React.FC<{ id: string, label: string, type?: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, required?: boolean, placeholder?: string, helpText?: string }> = 
({ id, label, type = 'text', value, onChange, required = false, placeholder = '', helpText = '' }) => (
    <div>
        <label htmlFor={id} className="block text-base font-semibold text-gray-800 mb-2">{label}</label>
        {helpText && <p className="text-sm text-gray-500 mb-2">{helpText}</p>}
        <input
            type={type}
            name={id}
            id={id}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className="shadow-sm focus:ring-2 focus:ring-brand-teal focus:border-brand-teal block w-full text-base border-gray-300 rounded-lg px-4 py-3"
        />
    </div>
);

const TextareaField: React.FC<{ id: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, rows?: number, required?: boolean, placeholder?: string, helpText?: string }> = 
({ id, label, value, onChange, rows = 4, required = false, placeholder = '', helpText = '' }) => (
    <div>
        <label htmlFor={id} className="block text-base font-semibold text-gray-800 mb-2">{label}</label>
        {helpText && <p className="text-sm text-gray-500 mb-2">{helpText}</p>}
        <textarea
            id={id}
            name={id}
            rows={rows}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className="shadow-sm focus:ring-2 focus:ring-brand-teal focus:border-brand-teal block w-full text-base border-gray-300 rounded-lg px-4 py-3"
        ></textarea>
    </div>
);

const SelectField: React.FC<{ id: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: string[], required?: boolean }> = 
({ id, label, value, onChange, options, required = false }) => (
    <div>
        <label htmlFor={id} className="block text-base font-semibold text-gray-800 mb-2">{label}</label>
        <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            className="shadow-sm focus:ring-2 focus:ring-brand-teal focus:border-brand-teal block w-full text-base border-gray-300 rounded-lg px-4 py-3"
        >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

const SubmitProductPage: React.FC<SubmitProductPageProps> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [tagline, setTagline] = useState('');
    const [description, setDescription] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [categories, setCategories] = useState('');
    const [pricingModel, setPricingModel] = useState('Free');
    const [launchDate, setLaunchDate] = useState('');
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [galleryUrls, setGalleryUrls] = useState('');
    const [twitterUrl, setTwitterUrl] = useState('');
    const [linkedinUrl, setLinkedinUrl] = useState('');
    const [makerName, setMakerName] = useState('');
    const [makerEmail, setMakerEmail] = useState('');
    
    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogoFile(file);
            const previewUrl = URL.createObjectURL(file);
            setLogoPreview(previewUrl);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!logoFile) {
            alert('Please upload a product logo.');
            return;
        }

        const productData = {
            name,
            tagline,
            description,
            websiteUrl,
            logoUrl: logoPreview!, // In a real app, this would be the URL from storage
            categories: categories.split(',').map(c => c.trim()),
            gallery: galleryUrls.split(',').map(url => url.trim()).filter(url => url),
            launchDate: launchDate || new Date().toISOString(),
        };

        onSubmit(productData);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-5xl mx-auto">
            <header className="text-center mb-10">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-teal mb-4">Launch Your Product</h1>
                <p className="text-xl text-gray-600">Join our curated platform and get discovered by thousands of software enthusiasts.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <section className="bg-gray-50 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <span className="mr-2">📦</span> Basic Information
                    </h2>
                    <div className="space-y-6">
                        <InputField id="name" label="Product Name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g., Realpick" />
                        <InputField id="tagline" label="Tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} required placeholder="A short, catchy description" helpText="Keep it under 60 characters" />
                        <TextareaField id="description" label="Full Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={6} required placeholder="Tell us what makes your product special..." />
                        <InputField id="websiteUrl" label="Website URL" type="url" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} required placeholder="https://yourproduct.com" />
                    </div>
                </section>

                {/* Categorization & Pricing */}
                <section className="bg-gray-50 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <span className="mr-2">🏷️</span> Categorization & Pricing
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <InputField id="categories" label="Categories" value={categories} onChange={(e) => setCategories(e.target.value)} required placeholder="e.g., Productivity, Dev Tools" helpText="Comma-separated" />
                        <SelectField id="pricingModel" label="Pricing Model" value={pricingModel} onChange={(e) => setPricingModel(e.target.value)} options={['Free', 'Paid', 'Freemium', 'Subscription']} required />
                        <InputField id="launchDate" label="Launch Date" type="date" value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} helpText="Leave blank for today" />
                    </div>
                </section>

                {/* Media */}
                <section className="bg-gray-50 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <span className="mr-2">🖼️</span> Media
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="logoUrl" className="block text-base font-semibold text-gray-800 mb-2">Product Logo</label>
                            <div className="flex items-center space-x-6">
                                {logoPreview && <img src={logoPreview} alt="Logo preview" className="w-24 h-24 rounded-xl object-cover border-2 border-gray-200" />}
                                <input
                                    type="file"
                                    name="logoUrl"
                                    id="logoUrl"
                                    accept="image/png, image/jpeg, image/gif"
                                    onChange={handleLogoChange}
                                    required
                                    className="block w-full text-base text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-base file:font-semibold file:bg-brand-teal file:text-white hover:file:bg-opacity-90 cursor-pointer"
                                />
                            </div>
                        </div>
                        <InputField id="galleryUrls" label="Gallery Image URLs (Optional)" type="text" value={galleryUrls} onChange={(e) => setGalleryUrls(e.target.value)} placeholder="https://.../image1.png, https://.../image2.png" helpText="Comma-separated URLs" />
                    </div>
                </section>

                {/* Social Links */}
                <section className="bg-gray-50 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <span className="mr-2">🔗</span> Social Links (Optional)
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <InputField id="twitterUrl" label="Twitter/X" type="url" value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} placeholder="https://twitter.com/yourproduct" />
                        <InputField id="linkedinUrl" label="LinkedIn" type="url" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder="https://linkedin.com/company/yourproduct" />
                    </div>
                </section>

                {/* Maker Information */}
                <section className="bg-gray-50 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <span className="mr-2">👤</span> Maker Information
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <InputField id="makerName" label="Your Name" value={makerName} onChange={(e) => setMakerName(e.target.value)} required placeholder="John Doe" />
                        <InputField id="makerEmail" label="Contact Email" type="email" value={makerEmail} onChange={(e) => setMakerEmail(e.target.value)} required placeholder="john@example.com" />
                    </div>
                </section>

                <div className="pt-6">
                     <button type="submit" className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-xl font-bold text-white bg-gradient-to-r from-brand-blue to-brand-teal hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-brand-teal focus:ring-opacity-50 transition-all transform hover:scale-[1.02]">
                        Submit for Review
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SubmitProductPage;