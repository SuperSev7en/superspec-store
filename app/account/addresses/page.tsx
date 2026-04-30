'use client';

import { useState } from 'react';
import { MapPin, Plus, Star, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type Address = {
  id: string; name: string; line1: string; line2?: string;
  city: string; state: string; zip: string; country: string; isDefault: boolean;
};

const EMPTY: Address = { id: '', name: '', line1: '', line2: '', city: '', state: '', zip: '', country: 'US', isDefault: false };

export default function AccountAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([
    { id: '1', name: 'Jane Doe', line1: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'US', isDefault: true },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Address>(EMPTY);

  const openNew = () => { setForm(EMPTY); setEditingId(null); setShowForm(true); };
  const openEdit = (a: Address) => { setForm(a); setEditingId(a.id); setShowForm(true); };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setAddresses(prev => prev.map(a => a.id === editingId ? { ...form, id: editingId } : a));
      toast.success('Address updated');
    } else {
      if (addresses.length >= 5) { toast.error('Maximum 5 addresses allowed'); return; }
      setAddresses(prev => [...prev, { ...form, id: Date.now().toString(), isDefault: prev.length === 0 }]);
      toast.success('Address added');
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    toast('Address removed');
  };

  const setDefault = (id: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
    toast.success('Default address updated');
  };

  const F = (k: keyof Address, label: string, type = 'text', placeholder = '') => (
    <div>
      <label className="Heading u-h7" style={{ display: 'block', marginBottom: 6 }}>{label}</label>
      <input type={type} value={form[k] as string} onChange={e => setForm(prev => ({ ...prev, [k]: e.target.value }))} className="Form__Input" placeholder={placeholder} required={k !== 'line2'} />
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 className="Heading u-h2">Saved Addresses</h1>
        {!showForm && (
          <button onClick={openNew} className="Button Button--primary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }} disabled={addresses.length >= 5}>
            <Plus style={{ width: 16, height: 16 }} /> Add Address
          </button>
        )}
      </div>

      {showForm && (
        <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, padding: 28, marginBottom: 28 }}>
          <h2 className="Heading u-h4" style={{ marginBottom: 20 }}>{editingId ? 'Edit Address' : 'New Address'}</h2>
          <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ gridColumn: '1 / -1' }}>{F('name', 'Full Name', 'text', 'Jane Doe')}</div>
            <div style={{ gridColumn: '1 / -1' }}>{F('line1', 'Address Line 1', 'text', '123 Main St')}</div>
            <div style={{ gridColumn: '1 / -1' }}>{F('line2', 'Address Line 2 (optional)', 'text', 'Apt 4B')}</div>
            {F('city', 'City')}
            {F('state', 'State / Province')}
            {F('zip', 'ZIP / Postal Code')}
            <div>
              <label className="Heading u-h7" style={{ display: 'block', marginBottom: 6 }}>Country</label>
              <select className="Form__Input" value={form.country} onChange={e => setForm(p => ({ ...p, country: e.target.value }))}>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12, marginTop: 4 }}>
              <button type="submit" className="Button Button--primary">Save Address</button>
              <button type="button" className="Button Button--secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {addresses.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', border: '1px dashed var(--border-color)', borderRadius: 8 }}>
          <MapPin style={{ width: 36, height: 36, margin: '0 auto 16px', color: 'var(--text-light-color)' }} />
          <p className="Text--subdued">No saved addresses</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {addresses.map(a => (
            <div key={a.id} style={{ border: `1px solid ${a.isDefault ? 'var(--text-color)' : 'var(--border-color)'}`, borderRadius: 8, padding: 20, position: 'relative' }}>
              {a.isDefault && (
                <span style={{ position: 'absolute', top: 12, right: 12, fontSize: 11, fontWeight: 700, background: 'var(--text-color)', color: 'var(--background)', padding: '2px 8px', borderRadius: 20 }}>DEFAULT</span>
              )}
              <div className="Heading u-h6" style={{ marginBottom: 8 }}>{a.name}</div>
              <div className="Text--subdued" style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>
                {a.line1}{a.line2 ? `, ${a.line2}` : ''}<br />
                {a.city}, {a.state} {a.zip}<br />
                {a.country}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {!a.isDefault && (
                  <button onClick={() => setDefault(a.id)} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light-color)' }}>
                    <Star style={{ width: 14, height: 14 }} /> Set default
                  </button>
                )}
                <button onClick={() => openEdit(a)} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light-color)' }}>
                  <Pencil style={{ width: 14, height: 14 }} /> Edit
                </button>
                <button onClick={() => handleDelete(a.id)} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}>
                  <Trash2 style={{ width: 14, height: 14 }} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
