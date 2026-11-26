import React, { useState } from 'react';
import { Send, AlertCircle, Phone, MessageCircle } from 'lucide-react';
import FadeIn from './FadeIn';
import SmilingFace from './SmilingFace';
import SadFace from './SadFace';
import { WEDDING_CONFIG } from '../weddingData';

export default function RSVPSection() {
  const { rsvp, family } = WEDDING_CONFIG;
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("attending");
  const [guestCount, setGuestCount] = useState(1);
  const [wishes, setWishes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  const handleGuestCountChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      setGuestCount("");
    } else {
      const num = parseInt(val, 10);
      if (!isNaN(num)) {
        setGuestCount(Math.min(50, Math.max(1, num)));
      }
    }
  };

  const handleGuestCountBlur = () => {
    if (guestCount === "" || Number(guestCount) < 1) {
      setGuestCount(1);
    }
  };

  const incrementGuests = () => {
    setGuestCount((prev) => Math.min(50, (Number(prev) || 0) + 1));
  };

  const decrementGuests = () => {
    setGuestCount((prev) => Math.max(1, (Number(prev) || 2) - 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    const trimmedName = name.trim();
    if (!trimmedName) {
      setStatus({ type: "error", message: "Please enter your name." });
      return;
    }

    const finalGuestCount = attendance === "attending" ? Math.max(1, parseInt(guestCount, 10) || 1) : 0;

    setIsSubmitting(true);

    try {
      if (rsvp.googleScriptUrl) {
        try {
          await fetch(rsvp.googleScriptUrl, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
              guest_name: trimmedName,
              attendance: attendance === "attending" ? "Joyfully Accepts" : "Regretfully Declines",
              guest_count: finalGuestCount,
              message: wishes.trim()
            })
          });
        } catch (err) {
          console.warn("Google Sheet sync notice:", err);
        }
      } else {
        try {
          await fetch("/api/rsvp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              guest_name: trimmedName,
              attendance,
              guest_count: finalGuestCount,
              message: wishes.trim()
            })
          });
        } catch (err) {
          console.warn("Network request failed, caching locally:", err);
        }
      }

      const isAttending = attendance === "attending";
      setStatus({
        type: "success",
        attendance,
        submittedName: trimmedName,
        guestCount: finalGuestCount,
        wishes: wishes.trim(),
        title: isAttending ? "Response Received" : `Thank you, ${trimmedName}`,
        message: isAttending
          ? `Alhamdulillah! Thank you, ${trimmedName}. We eagerly look forward to celebrating with you!`
          : "Please remember us in your duas and pray for our marriage."
      });

      try {
        const storageKey = "wedding_rsvps";
        const newRsvp = {
          id: Date.now(),
          guest_name: trimmedName,
          attendance,
          guest_count: finalGuestCount,
          message: wishes.trim() || null,
          created_at: new Date().toISOString()
        };
        const raw = localStorage.getItem(storageKey);
        const existing = raw ? JSON.parse(raw) : [];
        const filtered = (Array.isArray(existing) ? existing : []).filter(
          item => !(
            (item.guest_name || "").toLowerCase().trim() === trimmedName.toLowerCase() &&
            item.attendance === attendance &&
            (item.message || "") === (newRsvp.message || "")
          )
        );
        filtered.unshift(newRsvp);
        localStorage.setItem(storageKey, JSON.stringify(filtered));
      } catch (storageErr) {
        console.warn("Could not cache submitted RSVP locally:", storageErr);
      }

      setName("");
      setWishes("");
    } catch (e) {
      setStatus({ type: "error", message: "Network error. Please check your connection and try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="relative w-full py-20 px-4 sm:px-6 bg-[#F8F3EA] text-[#29251F]">
      <div className="max-w-4xl mx-auto">
        <FadeIn delay={100} className="text-center mb-12">
          <h2 className="font-cormorant text-3xl sm:text-4xl text-[#29251F] font-normal tracking-wide">
            {rsvp.title}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#5F5A52] mt-2 font-normal max-w-md mx-auto">
            {rsvp.subtitle}
          </p>
          {rsvp.contactPhone && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EDE4D3] border border-[#DDD0B9] text-xs text-[#5F5A52] shadow-sm">
              <Phone className="w-3.5 h-3.5 text-[#B89B63]" />
              <span>Direct Queries: <a href={`tel:${rsvp.contactPhone}`} className="text-[#29251F] hover:text-[#B89B63] font-semibold">{rsvp.contactPhone}</a></span>
            </div>
          )}
        </FadeIn>

        <FadeIn delay={250} className="max-w-xl mx-auto">
          <div className="relative rounded-3xl bg-[#FFFFFF] border border-[#E5DCCB] warm-card-shadow p-6 sm:p-10 transition-all duration-300 hover:border-[#B89B63]/60 hover:shadow-xl">
            {status.type && (
              <div
                className={`mb-6 p-4 sm:p-5 rounded-2xl border transition-all duration-300 animate-fade-in ${
                  status.type === "success"
                    ? status.attendance === "attending"
                      ? "bg-[#FAF7F0] border-[#B89B63]/60 shadow-sm text-[#29251F]"
                      : "bg-[#FAF7F0] border-[#DDD0B9] shadow-sm text-[#29251F]"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <div className="flex items-start sm:items-center gap-4">
                  {status.type === "success" ? (
                    status.attendance === "attending" ? <SmilingFace /> : <SadFace />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <div className="text-xs sm:text-sm leading-relaxed">
                    <p className="font-semibold font-sans mb-1 text-[#29251F]">
                      {status.type === "success" ? status.title || "Response Received" : "Notice"}
                    </p>
                    <p className="text-[#5F5A52] font-sans">{status.message}</p>
                    {status.type === "success" && rsvp.contactPhone && (
                      <div className="mt-3 pt-2.5 border-t border-[#E5DCCB]/60">
                        <a
                          href={`https://wa.me/91${rsvp.contactPhone}?text=${encodeURIComponent(
                            `I have submitted my RSVP for Farhan & Arshitha's Wedding:\n• Name: ${status.submittedName}\n• Attendance: ${status.attendance === "attending" ? "Joyfully Accepts (" + status.guestCount + " Guests)" : "Regretfully Declines"}${status.wishes ? "\n• Wishes / Dua: " + status.wishes : ""}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold tracking-wide transition-all duration-200 shadow-sm cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Send WhatsApp Confirmation</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="guest_name" className="block font-sans text-xs uppercase tracking-widest text-[#7A7366] mb-2 font-semibold">
                  Guest Name <span className="text-[#B89B63]">*</span>
                </label>
                <input
                  id="guest_name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F0] border border-[#E5DCCB] hover:border-[#B89B63]/60 text-[#29251F] placeholder-[#8C8373] text-sm focus:outline-none focus:border-[#B89B63] focus:ring-1 focus:ring-[#B89B63] transition-colors duration-200"
                />
              </div>

              <div>
                <label className="block font-sans text-xs uppercase tracking-widest text-[#7A7366] mb-2 font-semibold">
                  Attendance <span className="text-[#B89B63]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendance("attending")}
                    className={`py-3.5 px-4 rounded-xl border font-sans text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 min-h-[46px] hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                      attendance === "attending"
                        ? "bg-[#B89B63] hover:bg-[#A68A52] text-white border-[#B89B63] shadow-md shadow-[#B89B63]/20"
                        : "bg-[#FAF7F0] border border-[#E5DCCB] text-[#5F5A52] hover:border-[#B89B63]/60 hover:text-[#29251F]"
                    }`}
                  >
                    {rsvp.acceptText}
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendance("declined")}
                    className={`py-3.5 px-4 rounded-xl border font-sans text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 min-h-[46px] hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                      attendance === "declined"
                        ? "bg-[#5F5A52] hover:bg-[#4A463F] text-white border-[#5F5A52] shadow-md"
                        : "bg-[#FAF7F0] border border-[#E5DCCB] text-[#5F5A52] hover:border-[#B89B63]/60 hover:text-[#29251F]"
                    }`}
                  >
                    {rsvp.declineText}
                  </button>
                </div>
              </div>

              {attendance === "attending" && (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="guest_count" className="block font-sans text-xs uppercase tracking-widest text-[#7A7366] font-semibold">
                      Number of Guests Attending
                    </label>
                    <span className="text-[11px] text-[#8C8373]">Including yourself</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={decrementGuests}
                      aria-label="Decrease guest count"
                      className="w-12 h-12 rounded-xl bg-[#FAF7F0] border border-[#E5DCCB] hover:border-[#B89B63] text-[#29251F] hover:text-[#B89B63] flex items-center justify-center font-bold text-xl transition-all active:scale-95 cursor-pointer shadow-sm select-none"
                    >
                      −
                    </button>

                    <input
                      id="guest_count"
                      type="number"
                      min="1"
                      max="50"
                      required
                      value={guestCount}
                      onChange={handleGuestCountChange}
                      onBlur={handleGuestCountBlur}
                      placeholder="1"
                      className="w-full text-center px-4 py-3 rounded-xl bg-[#FAF7F0] border border-[#E5DCCB] hover:border-[#B89B63]/60 text-[#29251F] font-semibold text-base focus:outline-none focus:border-[#B89B63] focus:ring-1 focus:ring-[#B89B63] transition-colors duration-200"
                    />

                    <button
                      type="button"
                      onClick={incrementGuests}
                      aria-label="Increase guest count"
                      className="w-12 h-12 rounded-xl bg-[#FAF7F0] border border-[#E5DCCB] hover:border-[#B89B63] text-[#29251F] hover:text-[#B89B63] flex items-center justify-center font-bold text-xl transition-all active:scale-95 cursor-pointer shadow-sm select-none"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="wishes" className="block font-sans text-xs uppercase tracking-widest text-[#7A7366] mb-2 font-semibold">
                  Wishes &amp; Duas
                </label>
                <textarea
                  id="wishes"
                  rows={3}
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  placeholder="Leave a message, blessings, or prayers for Farhan &amp; Arshitha..."
                  maxLength={1000}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F0] border border-[#E5DCCB] hover:border-[#B89B63]/60 text-[#29251F] placeholder-[#8C8373] text-sm focus:outline-none focus:border-[#B89B63] focus:ring-1 focus:ring-[#B89B63] transition-colors duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full py-3.5 rounded-full bg-[#B89B63] hover:bg-[#A68A52] text-white font-sans text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase active:scale-[0.98] hover:scale-[1.01] hover:shadow-lg hover:shadow-[#B89B63]/25 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 flex items-center justify-center gap-2 min-h-[46px] cursor-pointer shadow-md shadow-[#B89B63]/20"
              >
                {isSubmitting ? (
                  <span>Sending Response...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-white transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    <span>{rsvp.submitText}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
