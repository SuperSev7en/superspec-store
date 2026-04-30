'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, FileText } from 'lucide-react';
import { toast } from 'sonner';

type Page = {
  id: string; title: string; slug: string; body: string; published: boolean; updatedAt: string;
  metaTitle?: string; metaDesc?: string;
};

const SYSTEM_PAGES: Page[] = [
  { id: '1', title: 'About', slug: 'about', body: '<h1>About SUPER Spec</h1><p>We build products that refuse to compromise...</p>', published: true, updatedAt: new Date().toISOString() },
  { id: '2', title: 'FAQ', slug: 'faq', body: '<h1>Frequently Asked Questions</h1>', published: true, updatedAt: new Date().toISOString() },
  { id: '3', title: 'Shipping Policy', slug: 'shipping', body: '<h1>Shipping</h1><p>Free shipping over $75. Orders ship within 2 business days.</p>', published: true, updatedAt: new Date().toISOString() },
  { id: '4', title: 'Returns', slug: 'returns', body: '<h1>Returns</h1><p>Free returns within 30 days.</p>', published: true, updatedAt: new Date().toISOString() },
  { id: '5', title: 'Privacy Policy', slug: 'privacy', body: '<h1>Privacy Policy</h1>', published: true, updatedAt: new Date().toISOString() },
  { id: '6', title: 'Terms of Service', slug: 'terms', body: '<h1>Terms of Service</h1>', published: true, updatedAt: new Date().toISOString() },
];

export default function AdminPagesPage() {
  const [pages, setPages] = useState<Page[]>(SYSTEM_PAGES);
  const [editing, setEditing] = useState<Page | null>(null);
  const [isNew, setIsNew] = useState(false);

  const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const openNew = () => {
    setEditing({ id: '', title: '', slug: '', body: '', published: false, updatedAt: new Date().toISOString() });
    setIsNew(true);
  };

  const handleSave = () => {
    if (!editing) return;
    if (isNew) {
      setPages(prev => [...prev, { ...editing, id: Date.now().toString(), updatedAt: new Date().toISOString() }]);
      toast.success('Page created');
    } else {
      setPages(prev => prev.map(p => p.id === editing.id ? { ...editing, updatedAt: new Date().toISOString() } : p));
      toast.success('Page saved');
    }
    setEditing(null); setIsNew(false);
  };

  const handleDelete = (id: string) => {
    setPages(prev => prev.filter(p => p.id !== id));
    toast('Page deleted');
  };

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">{isNew ? 'New Page' : `Edit: ${editing.title}`}</h1>
          <div className="flex gap-3">
            <button onClick={() => { setEditing(null); setIsNew(false); }} className="px-4 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800">Save Page</button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" value={editing.title} onChange={e => setEditing(p => p ? { ...p, title: p.id ? p.title : e.target.value, slug: p.id ? p.slug : slugify(e.target.value) } : null)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content (HTML)</label>
              <textarea
                value={editing.body}
                onChange={e => setEditing(p => p ? { ...p, body: e.target.value } : null)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900"
                rows={20}
              />
              <p className="text-xs text-gray-500 mt-1">HTML is supported. In production, swap for TipTap rich-text editor.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Page Settings</h3>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Slug (URL)</label>
                <div className="flex items-center">
                  <span className="text-xs text-gray-400 mr-1">/pages/</span>
                  <input type="text" value={editing.slug} onChange={e => setEditing(p => p ? { ...p, slug: slugify(e.target.value) } : null)} className="flex-1 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-gray-900" />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editing.published} onChange={e => setEditing(p => p ? { ...p, published: e.target.checked } : null)} className="w-4 h-4" />
                  <span className="text-sm text-gray-700">Published</span>
                </label>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">SEO</h3>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Meta Title</label>
                <input type="text" value={editing.metaTitle || ''} onChange={e => setEditing(p => p ? { ...p, metaTitle: e.target.value } : null)} className="w-full border border-gray-200 rounded px-2 py-1.5 text-xs" maxLength={60} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Meta Description</label>
                <textarea value={editing.metaDesc || ''} onChange={e => setEditing(p => p ? { ...p, metaDesc: e.target.value } : null)} className="w-full border border-gray-200 rounded px-2 py-1.5 text-xs" rows={3} maxLength={160} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Pages</h1>
        <button onClick={openNew} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800">
          <Plus className="w-4 h-4" /> New Page
        </button>
      </div>

      <div className="bg-white shadow rounded-lg divide-y divide-gray-100">
        {pages.map(page => (
          <div key={page.id} className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <div>
                <span className="text-sm font-medium text-gray-900">{page.title}</span>
                <span className="text-xs text-gray-500 ml-2">/pages/{page.slug}</span>
              </div>
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-semibold ${page.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {page.published ? 'Published' : 'Draft'}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400">{new Date(page.updatedAt).toLocaleDateString()}</span>
              <button onClick={() => { setEditing(page); setIsNew(false); }} className="text-gray-400 hover:text-gray-900"><Pencil className="w-4 h-4" /></button>
              <a href={`/pages/${page.slug}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900"><Eye className="w-4 h-4" /></a>
              <button onClick={() => handleDelete(page.id)} className="text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
