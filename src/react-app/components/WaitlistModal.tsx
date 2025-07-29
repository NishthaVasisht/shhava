import React from 'react';
import { CheckCircle } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  waitlistStatus?: string | null;
}

export default function WaitlistModal({ isOpen, onClose, userName, waitlistStatus }: WaitlistModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm">
      <div
        className="relative bg-white rounded-xl shadow-2xl p-6 max-w-md w-full text-center transform hover:scale-105 transition-all duration-300"
        style={{ fontFamily: 'Fredoka, sans-serif', background: 'linear-gradient(145deg, #ffffff, #f9f9f9)', border: '1px solid #e5e7eb' }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-purple-700 text-2xl font-bold transition-colors duration-200"
          aria-label="Close"
        >
          ×
        </button>

        <CheckCircle className="w-16 h-16 text-purple-600 mx-auto mb-4 animate-pulse-slow" />
        <h2 className="text-4xl font-bold text-purple-700 mb-2">
          {waitlistStatus === 'already_in_line' ? 'Already In Line!' : 'This BE Perfect?'}
        </h2>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          {waitlistStatus === 'already_in_line' && userName
            ? `Hey ${userName}, You're Set!`
            : userName
            ? `Welcome, ${userName}!`
            : "You're In!"}
        </h3>
        <p className="text-lg text-gray-600 mb-4 leading-relaxed">
          {waitlistStatus === 'already_in_line'
            ? "You're already on the Shhava waitlist! We'll notify you soon to start your epic love story."
            : "You’ve successfully joined the exclusive waitlist for Shhava! We’re thrilled to have you."}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          {waitlistStatus === 'already_in_line'
            ? "Keep checking your inbox – your love story is about to get legendary!"
            : "Keep an eye on your inbox – we’ll notify you as soon as your epic love story begins! 🎬"}
        </p>
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-110"
        >
          Awesome! Got it.
        </button>
      </div>
    </div>
  );
}