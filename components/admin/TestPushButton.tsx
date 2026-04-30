'use client';

import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { Bell, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export function TestPushButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleTestPush() {
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/push/test', { method: 'POST' });
      const data = await res.json();
      
      if (data.ok) {
        setStatus('success');
        setMessage(`Sent to ${data.sent} device(s).`);
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to send test push.');
      }
    } catch (e) {
      setStatus('error');
      setMessage('Network error. Check console.');
    } finally {
      setTimeout(() => {
        if (status !== 'loading') {
          // Keep success/error visible for a bit
          setTimeout(() => setStatus('idle'), 3000);
        }
      }, 500);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        size="sm"
        variant="outline"
        className={`font-semibold transition-all flex items-center gap-2 ${
          status === 'success' ? 'bg-green-100 text-green-700 border-green-200' : 
          status === 'error' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-white border border-[#e1e3e5] text-gray-700'
        }`}
        onPress={handleTestPush}
        isDisabled={status === 'loading'}
      >
        {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> :
         status === 'success' ? <CheckCircle2 className="h-4 w-4" /> :
         status === 'error' ? <AlertCircle className="h-4 w-4" /> :
         <Bell className="h-4 w-4" />}
        {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : status === 'error' ? 'Error' : 'Test Push'}
      </Button>
      {message && (
        <p className={`text-[10px] font-medium ${status === 'error' ? 'text-red-500' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
