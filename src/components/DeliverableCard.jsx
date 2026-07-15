export function DeliverableCard({ icon, label, title, text }) {
  return (
    <article className="border border-[#CFA34A]/25 bg-[#11100d] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.32)] md:p-8">
      <div className="mb-6 text-[#CFA34A]">{icon}</div>
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#CFA34A]">{label}</p>
      <h3 className="mt-3 text-2xl font-black uppercase leading-tight text-[#f4ead8]">{title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-[#aaa194]">{text}</p>
    </article>
  );
}
