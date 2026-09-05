import React, { useState } from 'react';
import { Smartphone, X, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { formatRWF } from '../config/business';

interface MomoUssdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
}

export const MomoUssdModal: React.FC<MomoUssdModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  amount,
}) => {
  const [step, setStep] = useState<'dialing' | 'pin' | 'success'>('dialing');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const ussdCode = `*182*1*1*0781157188*${amount}#`;

  const handleSendUssd = () => {
    setStep('pin');
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length < 4) {
      setError('Please enter your 4-digit MoMo PIN');
      return;
    }
    setError('');
    setStep('success');
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  const handleReset = () => {
    setStep('dialing');
    setPin('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div
        className="w-full max-w-sm bg-slate-900 rounded-[36px] shadow-2xl border-4 border-slate-700 overflow-hidden flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Phone Top Speaker & Camera Notch */}
        <div className="bg-slate-950 py-3 px-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-yellow-400 tracking-wider">MTN RWANDACELL</span>
          </div>
          <div className="w-16 h-4 bg-slate-900 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-800"></div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Phone Screen Content */}
        <div className="bg-[#1e1b4b] text-white p-6 flex-1 flex flex-col justify-between min-h-[380px] font-mono">
          {/* USSD Dialog Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-yellow-300 border-b border-indigo-900/60 pb-2">
              <span className="font-bold flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" /> USSD Running...
              </span>
              <span>MoMo Pay</span>
            </div>

            {step === 'dialing' && (
              <div className="space-y-4 py-4 animate-in fade-in">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-yellow-500/40 text-center space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-yellow-400 font-sans block">
                    Dialed USSD Code
                  </span>
                  <div className="text-sm font-bold text-yellow-300 tracking-wider select-all bg-slate-900 py-2 px-3 rounded-lg border border-yellow-500/20">
                    {ussdCode}
                  </div>
                </div>

                <div className="bg-indigo-950/60 p-4 rounded-xl text-xs space-y-2 font-sans border border-indigo-900">
                  <div className="flex justify-between text-slate-300">
                    <span>Merchant:</span>
                    <strong className="text-white">Kigali Luggage Solution</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Merchant Code:</span>
                    <strong className="text-yellow-400">0781157188</strong>
                  </div>
                  <div className="flex justify-between text-slate-300 pt-1 border-t border-indigo-900">
                    <span>Total Amount:</span>
                    <strong className="text-emerald-400 text-sm">{formatRWF(amount)}</strong>
                  </div>
                </div>

                <p className="text-[11px] text-slate-300 text-center font-sans">
                  Tap <strong>Send</strong> to authorize payment via MTN Mobile Money.
                </p>
              </div>
            )}

            {step === 'pin' && (
              <form onSubmit={handlePinSubmit} className="space-y-4 py-4 font-sans animate-in fade-in">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-indigo-900 text-center space-y-1">
                  <span className="text-[11px] text-slate-300 block">
                    Enter MoMo PIN to pay <strong className="text-emerald-400">{formatRWF(amount)}</strong> to Kigali Luggage Solution
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="password"
                      maxLength={4}
                      value={pin}
                      onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="••••"
                      autoFocus
                      className="w-full text-center tracking-[1em] text-lg py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-yellow-400 font-mono"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
                  </div>
                  {error && <p className="text-[11px] text-red-400 text-center">{error}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 font-sans"
                >
                  <span>Authorize Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {step === 'success' && (
              <div className="py-8 text-center space-y-3 font-sans animate-in zoom-in">
                <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8 animate-bounce" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                  Payment Successful!
                </h3>
                <p className="text-xs text-slate-300 max-w-xs mx-auto">
                  {formatRWF(amount)} sent successfully to Kigali Luggage Solution (0781157188). Your order is confirmed!
                </p>
              </div>
            )}
          </div>

          {/* USSD Keypad / Action Buttons */}
          <div className="pt-4 border-t border-indigo-900/60">
            {step === 'dialing' && (
              <div className="grid grid-cols-2 gap-3 font-sans">
                <button
                  onClick={onClose}
                  className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold uppercase rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendUssd}
                  className="py-2.5 px-4 bg-yellow-500 hover:bg-yellow-400 text-slate-950 text-xs font-bold uppercase rounded-xl transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-1"
                >
                  <span>Send</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {step === 'pin' && (
              <button
                onClick={handleReset}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 text-[11px] uppercase rounded-xl transition-colors cursor-pointer font-sans"
              >
                Back to USSD
              </button>
            )}

            {step === 'success' && (
              <div className="text-center text-[10px] text-emerald-400 font-mono">
                Transaction ID: MTN-{Math.floor(1000000 + Math.random() * 9000000)}
              </div>
            )}
          </div>
        </div>

        {/* Phone Home Bar */}
        <div className="bg-slate-950 py-2 flex justify-center">
          <div className="w-32 h-1 bg-slate-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
