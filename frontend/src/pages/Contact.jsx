import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Mail, MapPin, Send, Loader2, MessageSquare, Briefcase, Activity } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import PulseDivider from "../components/PulseDivider";
import { Reveal } from "../components/Reveal";
import Heartbeat from "../components/Heartbeat";
import SEO from "../components/SEO";
import PhoneInput from "../components/PhoneInputWithSearch";

const N8N_CONTACT_WEBHOOK = process.env.REACT_APP_N8N_CONTACT_WEBHOOK;
const N8N_SERVICE_WEBHOOK = process.env.REACT_APP_N8N_SERVICE_WEBHOOK;

const fieldCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/50 transition-colors";

const labelCls = "block text-xs font-mono-accent uppercase tracking-[0.18em] text-white/60 mb-2";

// Animated response time card
const ResponseCard = ({ t }) => (
  <div className="relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-cyan-500/[0.04] p-6">
    {/* live ring */}
    <div className="absolute -top-12 -right-12 rtl:right-auto rtl:-left-12 w-40 h-40 pointer-events-none">
      <motion.div
        className="absolute inset-0 rounded-full border border-cyan-400/40"
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border border-cyan-400/30"
        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
      />
      <div className="absolute inset-1/3 rounded-full bg-cyan-400/40" style={{ filter: "blur(10px)" }} />
    </div>

    <div className="relative flex items-center gap-2">
      <Activity className="h-4 w-4 text-cyan-300" />
      <span className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300">
        {t.contact.responseTitle}
      </span>
      <motion.span
        className="ml-auto rtl:ml-0 rtl:mr-auto inline-flex items-center gap-1.5 text-[10px] font-mono-accent uppercase tracking-[0.2em] text-cyan-300/80"
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        live
      </motion.span>
    </div>

    <motion.div
      className="relative mt-3 font-display text-3xl text-white"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <span className="relative inline-block">
        {t.contact.responseValue}
        <motion.span
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(110deg, transparent 30%, rgba(0,240,255,0.7) 50%, transparent 70%)",
            mixBlendMode: "screen",
          }}
          animate={{ x: ["-120%", "120%"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear", repeatDelay: 1.4 }}
        />
      </span>
    </motion.div>

    <p className="relative mt-2 text-xs text-white/60">{t.contact.responseSub}</p>
    <Heartbeat className="relative mt-4 w-full h-6 opacity-70" />
  </div>
);

const Contact = () => {
  const { t } = useLang();
  const [params] = useSearchParams();
  const [tab, setTab] = useState("general");
  const preselect = params.get("service");

  useEffect(() => { if (preselect) setTab("service"); }, [preselect]);

  const [general, setGeneral] = useState({ name: "", email: "", phone_code: "+1", phone: "", subject: "", message: "" });
  const [generalLoading, setGeneralLoading] = useState(false);

  const [svc, setSvc] = useState({
    service: preselect || "ai-chatbots",
    full_name: "", email: "", phone_code: "+1", phone: "", role: "",
    company_type: "", company_size: "", budget_range: "", best_time: "", challenge: "",
  });
  const [svcLoading, setSvcLoading] = useState(false);

  useEffect(() => {
    if (preselect) setSvc((s) => ({ ...s, service: preselect }));
  }, [preselect]);

  const submitGeneral = async (e) => {
    e.preventDefault();
    setGeneralLoading(true);
    try {
      await axios.post(N8N_CONTACT_WEBHOOK, { ...general, phone: `${general.phone_code}${general.phone}` });
      toast.success(t.contact.success);
      setGeneral({ name: "", email: "", phone_code: "+1", phone: "", subject: "", message: "" });
    } catch (err) {
      toast.error(t.contact.error);
    } finally {
      setGeneralLoading(false);
    }
  };

  const submitService = async (e) => {
    e.preventDefault();
    setSvcLoading(true);
    try {
      await axios.post(N8N_SERVICE_WEBHOOK, { ...svc, phone: `${svc.phone_code}${svc.phone}` });
      toast.success(t.contact.success);
      setSvc({
        service: "ai-chatbots", full_name: "", email: "", phone_code: "+1", phone: "", role: "",
        company_type: "", company_size: "", budget_range: "", best_time: "", challenge: "",
      });
    } catch (err) {
      toast.error(t.contact.error);
    } finally {
      setSvcLoading(false);
    }
  };

  return (
    <div data-testid="contact-page" className="relative">
      <SEO pageKey="contact" path="/contact" />

      {/* HERO */}
      <section data-testid="contact-hero" className="relative min-h-[60vh] sm:min-h-[70vh] flex items-end overflow-hidden pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="absolute -top-40 right-1/4 h-[460px] w-[460px] rounded-full bg-cyan-400/10 blur-[110px]" />
        <div className="absolute -bottom-20 left-10 h-[320px] w-[320px] rounded-full bg-blue-600/10 blur-[100px]" />

        <svg className="absolute inset-0 w-full h-full opacity-70 pointer-events-none" viewBox="0 0 1200 700" preserveAspectRatio="none">
          <defs>
            <linearGradient id="line1" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#00F0FF" stopOpacity="0" />
              <stop offset="0.5" stopColor="#00F0FF" stopOpacity="0.8" />
              <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((i) => (
            <motion.path
              key={i}
              d={`M 0 ${120 + i * 120} Q 400 ${60 + i * 100} 800 ${200 + i * 80} T 1200 ${150 + i * 100}`}
              stroke="url(#line1)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.5, delay: 0.15 * i, ease: "easeInOut" }}
            />
          ))}
        </svg>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-[10px] sm:text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300"
          >
            {t.contact.eyebrow}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12 }}
            className="mt-6 max-w-4xl font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tighter text-chrome"
          >
            {t.contact.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28 }}
            className="mt-5 max-w-2xl text-base md:text-lg text-white/65"
          >
            {t.contact.sub}
          </motion.p>
        </div>
      </section>

      <PulseDivider />

      {/* TABS + FORMS */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 grid lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-4 space-y-5 sm:space-y-6">
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-cyan-300" />
                  <span className="text-xs font-mono-accent uppercase tracking-[0.2em] text-white/60">{t.contact.emailUs}</span>
                </div>
                <a href="mailto:contact@raanzlr.com" data-testid="contact-email" className="mt-3 block font-display text-lg sm:text-xl text-white hover:text-cyan-200 break-all">contact@raanzlr.com</a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-cyan-300" />
                  <span className="text-xs font-mono-accent uppercase tracking-[0.2em] text-white/60">{t.contact.headquartersLabel}</span>
                </div>
                <div className="mt-3 text-white/80 leading-relaxed text-sm" dir="ltr">
                  9 Branch Brook Dr #10030<br/>Belleville, NJ 07109
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <ResponseCard t={t} />
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 p-1 rounded-full border border-white/10 bg-white/[0.02] w-fit max-w-full overflow-x-auto">
              <button
                data-testid="tab-general"
                onClick={() => setTab("general")}
                className={`inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-mono-accent uppercase tracking-[0.18em] transition-colors whitespace-nowrap ${tab === "general" ? "bg-cyan-400/20 text-cyan-200 border border-cyan-400/40" : "text-white/60 hover:text-white"}`}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                {t.contact.generalTab}
              </button>
              <button
                data-testid="tab-service"
                onClick={() => setTab("service")}
                className={`inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-mono-accent uppercase tracking-[0.18em] transition-colors whitespace-nowrap ${tab === "service" ? "bg-cyan-400/20 text-cyan-200 border border-cyan-400/40" : "text-white/60 hover:text-white"}`}
              >
                <Briefcase className="h-3.5 w-3.5" />
                {t.contact.serviceTab}
              </button>
            </div>

            {tab === "general" && (
              <motion.form
                key="general"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={submitGeneral}
                data-testid="contact-general-form"
                className="mt-6 rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>{t.contact.general.name}</label>
                    <input data-testid="general-name" required className={fieldCls} value={general.name} onChange={(e)=>setGeneral({...general, name:e.target.value})} />
                  </div>
                  <div>
                    <label className={labelCls}>{t.contact.general.email}</label>
                    <input data-testid="general-email" type="email" required className={fieldCls} value={general.email} onChange={(e)=>setGeneral({...general, email:e.target.value})} />
                  </div>
                  <div>
                    <label className={labelCls}>{t.contact.general.phone}</label>
                    <PhoneInput
                      value={general.phone}
                      onChange={(val) => setGeneral({ ...general, phone: val })}
                      phoneCode={general.phone_code}
                      onPhoneCodeChange={(code) => setGeneral({ ...general, phone_code: code })}
                      placeholder={t.contact.general.phonePlaceholder}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>{t.contact.general.subject}</label>
                    <input data-testid="general-subject" className={fieldCls} value={general.subject} onChange={(e)=>setGeneral({...general, subject:e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>{t.contact.general.message}</label>
                  <textarea data-testid="general-message" required rows={5} className={fieldCls} value={general.message} onChange={(e)=>setGeneral({...general, message:e.target.value})} />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    data-testid="general-submit"
                    disabled={generalLoading}
                    className="magnetic inline-flex items-center gap-2 rounded-full bg-cyan-400/15 border border-cyan-400/50 px-7 py-3.5 text-sm text-cyan-100 hover:bg-cyan-400/25 hover:text-white transition-colors disabled:opacity-60"
                  >
                    {generalLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 rtl:rotate-180" />}
                    {t.cta.sendMessage}
                  </button>
                </div>
              </motion.form>
            )}

            {tab === "service" && (
              <motion.form
                key="service"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={submitService}
                data-testid="contact-service-form"
                className="mt-6 rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-8 space-y-5"
              >
                <div>
                  <label className={labelCls}>{t.contact.service.service}</label>
                  <select data-testid="svc-service" required className={fieldCls} value={svc.service} onChange={(e)=>setSvc({...svc, service:e.target.value})}>
                    {t.services.items.map((s) => (
                      <option key={s.key} value={s.key} className="bg-[#0a0a0a]">{s.title}</option>
                    ))}
                  </select>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>{t.contact.service.fullName}</label>
                    <input data-testid="svc-fullname" required className={fieldCls} value={svc.full_name} onChange={(e)=>setSvc({...svc, full_name:e.target.value})} />
                  </div>
                  <div>
                    <label className={labelCls}>{t.contact.service.email}</label>
                    <input data-testid="svc-email" type="email" required className={fieldCls} value={svc.email} onChange={(e)=>setSvc({...svc, email:e.target.value})} />
                  </div>
                  <div>
                    <label className={labelCls}>{t.contact.service.phone}</label>
                    <PhoneInput
                      value={svc.phone}
                      onChange={(val) => setSvc({ ...svc, phone: val })}
                      phoneCode={svc.phone_code}
                      onPhoneCodeChange={(code) => setSvc({ ...svc, phone_code: code })}
                      placeholder={t.contact.service.phonePlaceholder}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>{t.contact.service.role}</label>
                    <input data-testid="svc-role" className={fieldCls} value={svc.role} onChange={(e)=>setSvc({...svc, role:e.target.value})} />
                  </div>
                  <div>
                    <label className={labelCls}>{t.contact.service.companyType}</label>
                    <input data-testid="svc-companytype" className={fieldCls} value={svc.company_type} onChange={(e)=>setSvc({...svc, company_type:e.target.value})} />
                  </div>
                  <div>
                    <label className={labelCls}>{t.contact.service.companySize}</label>
                    <select data-testid="svc-companysize" className={fieldCls} value={svc.company_size} onChange={(e)=>setSvc({...svc, company_size:e.target.value})}>
                      <option value="" className="bg-[#0a0a0a]">{t.contact.service.selectSize}</option>
                      <option value="1-10" className="bg-[#0a0a0a]">1-10</option>
                      <option value="11-50" className="bg-[#0a0a0a]">11-50</option>
                      <option value="51-200" className="bg-[#0a0a0a]">51-200</option>
                      <option value="201-1000" className="bg-[#0a0a0a]">201-1000</option>
                      <option value="1000+" className="bg-[#0a0a0a]">1000+</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>{t.contact.service.budget}</label>
                    <select data-testid="svc-budget" className={fieldCls} value={svc.budget_range} onChange={(e)=>setSvc({...svc, budget_range:e.target.value})} disabled={!svc.company_size}>
                      <option value="" className="bg-[#0a0a0a]">{svc.company_size ? "—" : t.contact.service.selectSize}</option>
                      <option value="<5k" className="bg-[#0a0a0a]">&lt; $5,000</option>
                      <option value="5k-15k" className="bg-[#0a0a0a]">$5k – $15k</option>
                      <option value="15k-50k" className="bg-[#0a0a0a]">$15k – $50k</option>
                      <option value="50k-150k" className="bg-[#0a0a0a]">$50k – $150k</option>
                      <option value="150k+" className="bg-[#0a0a0a]">$150k+</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>{t.contact.service.bestTime}</label>
                    <select data-testid="svc-besttime" className={fieldCls} value={svc.best_time} onChange={(e)=>setSvc({...svc, best_time:e.target.value})}>
                      <option value="" className="bg-[#0a0a0a]">—</option>
                      <option value="morning" className="bg-[#0a0a0a]">Morning</option>
                      <option value="afternoon" className="bg-[#0a0a0a]">Afternoon</option>
                      <option value="evening" className="bg-[#0a0a0a]">Evening</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>{t.contact.service.challenge}</label>
                  <textarea data-testid="svc-challenge" required rows={5} className={fieldCls} value={svc.challenge} onChange={(e)=>setSvc({...svc, challenge:e.target.value})} />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    data-testid="svc-submit"
                    disabled={svcLoading}
                    className="magnetic inline-flex items-center gap-2 rounded-full bg-cyan-400/15 border border-cyan-400/50 px-7 py-3.5 text-sm text-cyan-100 hover:bg-cyan-400/25 hover:text-white transition-colors disabled:opacity-60"
                  >
                    {svcLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 rtl:rotate-180" />}
                    {t.cta.submitRequest}
                  </button>
                </div>
              </motion.form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
