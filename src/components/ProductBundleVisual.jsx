import { PRODUCT } from '../config/product';

export function ProductBundleVisual() {
  return (
    <div className="relative mx-auto min-h-[390px] w-full max-w-xl sm:min-h-[430px]" role="img" aria-label={`${PRODUCT.canonicalName} e material complementar ${PRODUCT.bonusName}`}>
      <div className="absolute inset-6 rounded-[2rem] bg-[#CFA34A]/15 blur-3xl" />
      <div className="absolute bottom-4 left-1 top-4 flex w-[66%] rotate-[-3deg] flex-col justify-between border border-[#CFA34A]/45 bg-[linear-gradient(145deg,#18140e,#060504)] p-5 shadow-[0_26px_90px_rgba(0,0,0,0.62)] sm:left-3 sm:w-[64%] sm:p-9">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#CFA34A] sm:tracking-[0.2em]">Material principal</p>
          <p className="mt-7 text-2xl font-black uppercase leading-none text-[#f4ead8] sm:mt-8 sm:text-4xl">{PRODUCT.name}</p>
          <p className="mt-4 text-xs font-bold uppercase leading-relaxed text-[#CFA34A] sm:text-sm">{PRODUCT.subtitle}</p>
        </div>
        <p className="border-t border-[#CFA34A]/25 pt-4 text-xs font-bold uppercase tracking-[0.12em] text-[#8f8678] sm:pt-5 sm:tracking-[0.18em]">PDF • roteiro prático</p>
      </div>
      <div className="absolute bottom-8 right-0 top-20 flex w-[48%] rotate-[4deg] flex-col justify-between border border-[#d7b76f]/45 bg-[linear-gradient(145deg,#b99045,#6d481c)] p-4 shadow-[0_26px_70px_rgba(0,0,0,0.58)] sm:right-2 sm:p-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.1em] text-[#211407] sm:tracking-[0.18em]">Material complementar</p>
          <p className="mt-7 text-xl font-black uppercase leading-tight text-[#140d05] sm:mt-8 sm:text-3xl">{PRODUCT.bonusName}</p>
        </div>
        <p className="border-t border-[#2b1a09]/25 pt-4 text-xs font-black uppercase tracking-[0.08em] text-[#2b1a09] sm:pt-5 sm:tracking-[0.15em]">PDF • mapa de sinais</p>
      </div>
    </div>
  );
}
