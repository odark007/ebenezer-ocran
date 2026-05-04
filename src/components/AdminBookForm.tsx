// src/components/AdminBookForm.tsx (FULL & FIXED MULTIPART UPLOAD)
'use client';

// (imports remain the same as previous step, confirm presence of useActionState)
import { useState, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { upsertBook } from '@/app/admin/books/actions';
import Image from 'next/image';
import { ReactTags } from 'react-tag-autocomplete'; // Requires 'npm i react-tag-autocomplete'

// (categories definition remains the same as previous step, confirm integer IDs)
const initialCategories = [
    { value: 1, label: 'Leadership' },
    { value: 2, label: 'Faith' },
    { value: 3, label: 'Prayer' },
    { value: 4, label: 'Spiritual Growth' },
    { value: 5, label: 'Doctrine' },
    { value: 6, label: 'Character' },
    { value: 7, label: 'Ministry' },
    { value: 8, label: 'Leadership Development' },
    { value: 9, label: 'Authorship' },
    { value: 10, label: 'Covenant Living' },
];

export default function AdminBookForm({ book }: { book?: any }) {
    // useActionState (resolved previously)
    const [state, action] = useActionState(upsertBook, null as any);

    // Tag state mapping (resolved previously)
    const [selectedTags, setSelectedTags] = useState<any[]>(() => {
        if (book?.tags && Array.isArray(book.tags)) {
            return book.tags.map((tagId: any) => {
                const foundCat = initialCategories.find(cat => cat.value === parseInt(tagId));
                return foundCat ? foundCat : { value: parseInt(tagId) || 0, label: 'Unknown Category' };
            });
        }
        return [];
    });

    const portraitInputRef = useRef<HTMLInputElement>(null);
    const [portraitPreview, setPortraitPreview] = useState<string | null>(book?.cover_image_url || null);

    const onDelete = (tagIndex: number) => {
        setSelectedTags(prev => prev.filter((_, i) => i !== tagIndex));
    };

    const onAddition = (newTag: any) => {
        // Unique ID for new tags (resolved previously)
        if (!newTag.value || (typeof newTag.value === 'string' && newTag.value.toString().startsWith('undefined'))) {
            newTag.value = -Date.now();
        }
        setSelectedTags(prev => [...prev, newTag]);
    };

    const handlePortraitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPortraitPreview(URL.createObjectURL(file));
        } else {
            setPortraitPreview(book?.cover_image_url || null);
        }
    };

    return (
        <form action={action} className="space-y-6">
            {/* ------------------ */}

            {state?.error && (
                <div className="bg-red-50 text-red-600 text-[13.5px] p-4 rounded-lg border border-red-100 font-medium">
                    Error: {state.error}
                </div>
            )}

            {/* Hidden Fields */}
            {book?.id && <input type="hidden" name="id" value={book.id} />}
            {book?.cover_image_url && <input type="hidden" name="oldImageUrl" value={book.cover_image_url} />}

            {/* (Final tags JSON resolved previously) */}
            <input type="hidden" name="tags" value={JSON.stringify(selectedTags.map(t => t.value))} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Portrait Upload Section */}
                <div className="space-y-3">
                    <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">Book Portrait (9:16)</label>
                    <div className="w-[180px] h-[320px] bg-g100 rounded-lg border-2 border-dashed border-g300 overflow-hidden relative flex flex-col items-center justify-center p-3 text-center cursor-pointer hover:border-lime transition-colors duration-150" onClick={() => portraitInputRef.current?.click()}>
                        {portraitPreview ? (
                            <Image src={portraitPreview} alt="Portrait Preview" fill className="object-cover" />
                        ) : (
                            <>
                                <i className="ph ph-image-square text-[32px] text-g500 mb-2"></i>
                                <div className="text-[11px] text-g500">Upload Portrait Cover</div>
                                <div className="text-[10px] text-lime-dk/70 font-medium mt-1 uppercase tracking-wider">9:16 AR (Portrait)</div>
                            </>
                        )}
                    </div>
                    <input type="file" name="portrait" ref={portraitInputRef} onChange={handlePortraitChange} accept="image/jpeg,image/png,image/webp" className="hidden" />
                    <p className="text-[11.5px] text-g500 font-light leading-relaxed">JPEG/PNG/WEBP only. Ensure the image is in portrait orientation (like a phone photograph) for optimal display.</p>
                </div>

                {/* Text Fields Section */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">Book Title *</label>
                        <input type="text" name="title" defaultValue={book?.title} required className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none transition-colors focus:border-lime" placeholder="e.g., Becoming an Extraordinary Christian" />
                    </div>

                    <div>
                        <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">Amazon Purchase URL *</label>
                        {/* (URL pattern resolved previously) */}
                        <input
                            type="text"
                            name="amazonUrl"
                            defaultValue={book?.amazon_url}
                            required
                            pattern="^((http(s)?:\/\/))?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?"
                            className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none transition-colors focus:border-lime"
                            placeholder="https://amazon.com/... or just amazon.com/..."
                        />
                        <p className="text-[10.5px] text-g500 mt-1 font-light leading-normal">Required. Protocols like https:// are optional; you can paste just the domain (e.g., `amazon.com/dp/...`).</p>
                    </div>

                    <div>
                        <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">Book Slug (Auto-generated)</label>
                        <input type="text" name="slug" defaultValue={book?.slug} disabled className="w-full bg-g100/50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none text-g500" placeholder="becoming-extraordinary-christian" />
                        <p className="text-[10.5px] text-g500 mt-1 font-light">The slug is the URL-friendly version of the title.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">Display Order</label>
                            <input type="number" name="displayOrder" defaultValue={book?.display_order || 0} min={0} className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none transition-colors focus:border-lime" placeholder="0" />
                        </div>
                        <div>
                            <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">Display Status *</label>
                            <select name="status" defaultValue={book?.status || 'draft'} required className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none transition-colors focus:border-lime cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2212%22%20height%3D%228%22%20viewBox%3D%220%200%2012%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1.5%201.75L6%206.25L10.5%201.75%22%20stroke%3D%22%23666666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%2=linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:calc(100%-14px)_center] pr-[36px]">
                                <option value="draft">Draft (Admin Only)</option>
                                <option value="published">Published (Public)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Managed Tagging Section */}
                <div>
                    <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">Categories / Keywords</label>
                    {/* Iteration over tags (resolved previously) */}
                    <div className="react-tags__selected flex flex-wrap gap-2 mt-2">
                        {selectedTags.map((tag, index) => (
                            <span key={tag.value} className="react-tags__tag bg-lime text-black text-[11px] font-semibold px-[8px] py-[3px] rounded-full uppercase tracking-wider flex items-center gap-1">
                                {tag.label}
                                <button type="button" onClick={() => onDelete(index)} className="react-tags__remove ml-1 hover:text-white border-none cursor-pointer bg-transparent text-[14px]">
                                    <i className="ph ph-x-circle text-[16px]"></i>
                                </button>
                            </span>
                        ))}
                    </div>
                    {/* ReactTags configuration (resolved previously) */}
                    <ReactTags
                        selected={[]}
                        suggestions={initialCategories}
                        onDelete={() => { }}
                        onAdd={onAddition}
                        allowNew
                        classNames={{
                            root: 'react-tags__tags',
                            rootIsActive: 'is-active',
                            rootIsDisabled: 'is-disabled',
                            rootIsInvalid: 'is-invalid',
                            label: 'hidden',
                            tagList: 'hidden',
                            tagListItem: 'hidden',
                            tag: 'hidden',
                            tagName: 'hidden',
                            comboBox: 'react-tags__tagInput',
                            input: 'w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] focus:border-lime outline-none',
                            listBox: 'bg-white border border-g100 shadow-lg rounded-md mt-1 p-2 absolute z-50',
                            option: 'px-3 py-2 text-[13px] cursor-pointer hover:bg-lime-pale',
                            optionIsActive: 'bg-lime-pale',
                            highlight: '',
                        }}
                    />
                </div>

                {/* Informative Tooltips Section */}
                <div className="space-y-4 pt-1">
                    <div className="bg-g50 p-4 rounded-lg border border-g100">
                        <div className="flex gap-2.5 items-center mb-1.5">
                            <span className="w-10 h-10 rounded-full bg-lime/10 flex items-center justify-center text-lime-dk text-xl"><i className="ph ph-star"></i></span>
                            <div className="font-bold text-[13px] text-black tracking-tight">Featured Tag</div>
                        </div>
                        <p className="text-[12px] text-g500 font-light leading-relaxed pl-[50px]">Mark a book as **Featured** to prominently display it as the *single main highlighted resource* on the Homepage and Books Library. It draws maximum attention to one specific message Rev. Ocran is promoting now.</p>
                    </div>

                    <div className="bg-g50 p-4 rounded-lg border border-g100">
                        <div className="flex gap-2.5 items-center mb-1.5">
                            <span className="w-10 h-10 rounded-full bg-lime/10 flex items-center justify-center text-lime-dk text-xl"><i className="ph ph-bell"></i></span>
                            <div className="font-bold text-[13px] text-black tracking-tight">New Release Tag</div>
                        </div>
                        <p className="text-[12px] text-g500 font-light leading-relaxed pl-[50px]">Mark a book as **New** to apply a special badge indicating it has *just been released*. It helps returning users quickly identify and explore the latest content without navigation.</p>
                    </div>
                </div>
            </div>

            {/* Form Submission Button */}
            <SubmitButton />
        </form>
    );
}

// Separate component for submit button to use 'useFormStatus'
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending} className="w-full bg-black text-white text-[14.5px] font-bold py-[14px] rounded-[8px] mt-6 transition-colors duration-200 hover:bg-g900 disabled:opacity-50 flex items-center justify-center gap-[8px]">
            {pending ? (
                <>
                    <i className="ph ph-spinner animate-spin text-lime"></i> Processing...
                </>
            ) : (
                <>
                    <i className="ph ph-floppy-disk text-lg"></i> Save Book Entry
                </>
            )}
        </button>
    );
}