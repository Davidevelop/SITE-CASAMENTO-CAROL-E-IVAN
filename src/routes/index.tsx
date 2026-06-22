import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Menu, X, Heart, MapPin, Calendar, Gift, Check, Loader2, Copy, Sparkles,
  Wine, Plane, Home, Camera,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import hero from "@/assets/hero.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Carol & Ivan — 13.12.2026" },
      { name: "description", content: "Casamento de Carol e Ivan — 13.12.2026, Vila Monsaraz. Confirme sua presença." },
      { property: "og:title", content: "Carol & Ivan" },
      { property: "og:description", content: "13 de Dezembro de 2026 — Vila Monsaraz, Rio de Janeiro." },
    ],
  }),
  component: Index,
});

const NAV = [
  { id: "inicio", label: "Início" },
  { id: "grande-dia", label: "O Grande Dia" },
  { id: "rsvp", label: "Confirmar" },
  { id: "presentes", label: "Presentes" },
  { id: "galeria", label: "Galeria" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Toaster position="top-center" />
      <Header />
      <Hero />
      <Countdown />
      <BigDay />
      <RSVP />
      <Gifts />
      <Gallery />
      <Footer />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border/60" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
        <button
          onClick={() => scrollTo("inicio")}
          className="text-script text-3xl md:text-4xl text-foreground/90 hover:text-accent transition-colors"
        >
          C <span className="text-accent">&</span> I
        </button>

        <ul className="hidden md:flex items-center gap-9 text-[13px] uppercase tracking-[0.18em] text-foreground/70">
          {NAV.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => scrollTo(n.id)}
                className="hover:text-foreground transition-colors"
              >
                {n.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          aria-label="Abrir menu"
          onClick={() => setOpen(true)}
          className="md:hidden p-2 -mr-2 text-foreground"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-background transition-all duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-script text-3xl">C & I</span>
          <button aria-label="Fechar menu" onClick={() => setOpen(false)} className="p-2">
            <X className="h-6 w-6" />
          </button>
        </div>
        <ul className="flex flex-col items-center justify-center gap-8 pt-16 text-2xl font-display">
          {NAV.map((n, i) => (
            <motion.li
              key={n.id}
              initial={{ opacity: 0, y: 12 }}
              animate={open ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06 }}
            >
              <button
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => scrollTo(n.id), 220);
                }}
                className="tracking-wide"
              >
                {n.label}
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="inicio" ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={hero}
          alt="Carol e Ivan"
          className="h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[11px] md:text-xs uppercase tracking-[0.5em] text-white/80"
        >
          Vamos nos casar
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-6 text-script text-[22vw] sm:text-[18vw] md:text-[14vw] lg:text-[180px] leading-[0.85] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
        >
          Carol <span className="italic">&</span> Ivan
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 flex items-center gap-6 text-sm md:text-base uppercase tracking-[0.35em] text-white/90"
        >
          <span className="h-px w-10 md:w-16 bg-white/60" />
          <span>13 · 12 · 2026</span>
          <span className="h-px w-10 md:w-16 bg-white/60" />
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4 }}
          onClick={() => scrollTo("rsvp")}
          className="group mt-12 inline-flex items-center gap-3 border border-white/70 px-9 py-4 text-xs uppercase tracking-[0.3em] text-white hover:bg-white hover:text-foreground transition-all duration-500"
        >
          Confirmar Presença
          <Heart className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70"
      >
        <div className="h-12 w-px bg-white/40 animate-pulse mx-auto" />
      </motion.div>
    </section>
  );
}

function Countdown() {
  const target = new Date("2026-12-13T16:00:00-03:00").getTime();
  const [t, setT] = useState(() => target - Date.now());
  useEffect(() => {
    const i = setInterval(() => setT(target - Date.now()), 1000);
    return () => clearInterval(i);
  }, [target]);
  const d = Math.max(0, Math.floor(t / 86400000));
  const h = Math.max(0, Math.floor((t / 3600000) % 24));
  const m = Math.max(0, Math.floor((t / 60000) % 60));
  const s = Math.max(0, Math.floor((t / 1000) % 60));

  const items = [
    { v: d, l: "Dias" },
    { v: h, l: "Horas" },
    { v: m, l: "Min" },
    { v: s, l: "Seg" },
  ];

  return (
    <section className="border-y border-border/60 bg-secondary/40 py-12 md:py-16">
      <div className="mx-auto grid max-w-3xl grid-cols-4 gap-4 px-6 text-center">
        {items.map((it) => (
          <div key={it.l}>
            <div className="font-display text-4xl md:text-6xl tabular-nums text-foreground">
              {String(it.v).padStart(2, "0")}
            </div>
            <div className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {it.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <p className="text-[11px] uppercase tracking-[0.45em] text-muted-foreground">{kicker}</p>
      <h2 className="mt-4 text-4xl md:text-6xl text-foreground">{title}</h2>
      <div className="mx-auto mt-6 h-px w-16 bg-accent" />
    </motion.div>
  );
}

function BigDay() {
  return (
    <section id="grande-dia" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading kicker="Save the date" title="O Grande Dia" />

        <div className="mt-16 md:mt-24 grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="space-y-10"
          >
            <Info icon={Calendar} title="Quando" lines={["Domingo, 13 de Dezembro de 2026", "Cerimônia às 16h00"]} />
            <Info icon={MapPin} title="Onde" lines={["Vila Monsaraz", "Estr. do Lameirão Pequeno, 806", "Campo Grande — Rio de Janeiro, RJ", "CEP 23017-325"]} />
            <Info icon={Sparkles} title="Traje" lines={["Esporte Fino", "Tons claros e neutros são bem-vindos"]} />

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Vila+Monsaraz+Estr.+do+Lameir%C3%A3o+Pequeno+806+Rio+de+Janeiro"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 border border-foreground/80 px-7 py-3 text-xs uppercase tracking-[0.3em] text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
            >
              Traçar Rota
              <MapPin className="h-3.5 w-3.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative aspect-[4/5] md:aspect-[4/5] w-full overflow-hidden shadow-soft"
          >
            <iframe
              title="Vila Monsaraz no mapa"
              src="https://www.google.com/maps?q=Estr.%20do%20Lameir%C3%A3o%20Pequeno%2C%20806%20-%20Campo%20Grande%2C%20Rio%20de%20Janeiro&output=embed"
              loading="lazy"
              className="h-full w-full grayscale-[40%] contrast-[0.95]"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Info({ icon: Icon, title, lines }: { icon: any; title: string; lines: string[] }) {
  return (
    <div className="flex gap-5">
      <div className="shrink-0 grid h-12 w-12 place-items-center rounded-full border border-border bg-card">
        <Icon className="h-5 w-5 text-accent-foreground" />
      </div>
      <div className="min-w-0">
        <h3 className="text-2xl md:text-3xl text-foreground">{title}</h3>
        <div className="mt-2 space-y-1 text-sm md:text-base text-muted-foreground leading-relaxed">
          {lines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

type RsvpState = "idle" | "loading" | "success" | "error";

function RSVP() {
  const [name, setName] = useState("");
  const [state, setState] = useState<RsvpState>("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 3) {
      setState("error");
      setMsg("Por favor, digite seu nome completo.");
      return;
    }
    setState("loading");
    setMsg("");

    try {
      // TODO: Substituir pelo endpoint do Google Planilhas (Apps Script Web App)
      // const ENDPOINT = "https://script.google.com/macros/s/SEU_DEPLOY_ID/exec";
      // const res = await fetch(ENDPOINT, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ name: name.trim() }),
      // });
      // const data = await res.json();
      // if (!data.found) throw new Error("not_found");

      // Simulação enquanto a API não está conectada:
      await new Promise((r) => setTimeout(r, 1400));
      const mockGuests = ["carol", "ivan", "convidado", "maria silva", "joão"];
      const ok = mockGuests.some((g) => name.trim().toLowerCase().includes(g));
      if (!ok) throw new Error("not_found");

      setState("success");
      setMsg("Presença Confirmada com Sucesso!");
    } catch (err) {
      setState("error");
      setMsg("Nome não encontrado na lista de convidados. Verifique a ortografia.");
    }
  }

  return (
    <section id="rsvp" className="relative bg-secondary/50 py-24 md:py-36 border-y border-border/60">
      <div className="mx-auto max-w-2xl px-6">
        <SectionHeading kicker="R.S.V.P." title="Confirme sua Presença" />
        <p className="mx-auto mt-8 max-w-md text-center text-muted-foreground leading-relaxed">
          Sua presença é o que tornará este dia inesquecível. Por favor, confirme até <strong className="text-foreground font-medium">30 de Outubro de 2026</strong>.
        </p>

        <form onSubmit={onSubmit} className="mt-12 space-y-5">
          <Input
            type="text"
            placeholder="Digite seu nome completo (como no convite)"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (state === "error") setState("idle");
            }}
            disabled={state === "loading" || state === "success"}
            className="h-14 md:h-16 text-base md:text-lg rounded-none border-x-0 border-t-0 border-b-2 border-border focus-visible:border-accent focus-visible:ring-0 bg-transparent px-0 text-center placeholder:text-muted-foreground/60"
          />

          <Button
            type="submit"
            disabled={state === "loading" || state === "success"}
            className="w-full h-14 md:h-16 rounded-none bg-foreground text-background hover:bg-foreground/90 text-xs uppercase tracking-[0.3em] transition-all"
          >
            {state === "loading" ? (
              <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Confirmando...</>
            ) : state === "success" ? (
              <><Check className="h-4 w-4 mr-2" /> Confirmado</>
            ) : (
              "Confirmar"
            )}
          </Button>

          {state === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center p-6 border border-accent/40 bg-accent/10"
            >
              <Heart className="h-6 w-6 mx-auto text-accent-foreground mb-2" />
              <p className="font-display text-xl text-foreground">{msg}</p>
              <p className="text-sm text-muted-foreground mt-1">Mal podemos esperar para celebrar com você.</p>
            </motion.div>
          )}
          {state === "error" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-destructive"
            >
              {msg}
            </motion.p>
          )}
        </form>
      </div>
    </section>
  );
}

const GIFTS = [
  { icon: Home, title: "Lar Doce Lar", desc: "Cota para nosso novo lar", price: "R$ 150" },
  { icon: Plane, title: "Lua de Mel", desc: "Uma diária da viagem dos sonhos", price: "R$ 300" },
  { icon: Wine, title: "Brinde do Casal", desc: "Vinhos para celebrar momentos", price: "R$ 100" },
  { icon: Camera, title: "Memórias", desc: "Álbum e ensaios fotográficos", price: "R$ 200" },
];

const PIX_KEY = "carolivan@casamento.com.br";

function Gifts() {
  const [open, setOpen] = useState<null | typeof GIFTS[number]>(null);

  return (
    <section id="presentes" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading kicker="Com carinho" title="Lista de Presentes" />
        <p className="mx-auto mt-8 max-w-xl text-center text-muted-foreground leading-relaxed">
          O maior presente é a sua presença em nosso grande dia. Mas se desejar nos presentear,
          disponibilizamos algumas cotas com muito carinho.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GIFTS.map((g, i) => (
            <motion.button
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              onClick={() => setOpen(g)}
              className="group text-left bg-card border border-border p-8 flex flex-col items-start hover:shadow-soft hover:-translate-y-1 transition-all duration-500"
            >
              <div className="grid h-14 w-14 place-items-center rounded-full border border-border bg-secondary group-hover:bg-accent/20 transition-colors">
                <g.icon className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="mt-6 text-2xl text-foreground">{g.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground flex-1">{g.desc}</p>
              <div className="mt-6 flex w-full items-center justify-between border-t border-border pt-4">
                <span className="font-display text-xl text-foreground">{g.price}</span>
                <span className="text-[11px] uppercase tracking-[0.25em] text-accent-foreground group-hover:underline">
                  Presentear →
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl text-center">{open?.title}</DialogTitle>
            <DialogDescription className="text-center">
              Escaneie o QR Code ou copie a chave PIX
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center gap-6 py-4">
            <div className="p-4 bg-white border border-border">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(PIX_KEY)}`}
                alt="QR Code PIX"
                className="h-52 w-52"
                width={220}
                height={220}
              />
            </div>

            <div className="w-full">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground text-center mb-2">Chave PIX</p>
              <div className="flex items-center gap-2 border border-border bg-secondary p-3">
                <code className="flex-1 truncate text-sm">{PIX_KEY}</code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(PIX_KEY);
                    toast.success("Chave PIX copiada!");
                  }}
                  className="shrink-0 inline-flex items-center gap-2 bg-foreground text-background px-3 py-2 text-xs uppercase tracking-wider hover:bg-foreground/90"
                >
                  <Copy className="h-3.5 w-3.5" /> Copiar
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function Gallery() {
  const photos = [
    { src: g1, h: "row-span-2" },
    { src: g2, h: "" },
    { src: g4, h: "" },
    { src: g3, h: "row-span-2" },
    { src: g5, h: "row-span-2" },
    { src: g6, h: "" },
  ];

  return (
    <section id="galeria" className="bg-secondary/40 py-24 md:py-36 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading kicker="Momentos" title="Nossas Fotos" />

        {/* Desktop masonry */}
        <div className="mt-16 hidden md:grid grid-cols-3 auto-rows-[220px] gap-4">
          {photos.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className={`overflow-hidden ${p.h}`}
            >
              <img
                src={p.src}
                alt={`Carol e Ivan ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-[1200ms]"
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile: horizontal scroll carousel */}
        <div className="mt-12 md:hidden -mx-6">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-6 pb-4 scrollbar-hide">
            {photos.map((p, i) => (
              <div key={i} className="shrink-0 w-[78%] snap-center aspect-[3/4] overflow-hidden">
                <img
                  src={p.src}
                  alt={`Carol e Ivan ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background py-20 md:py-28 text-center">
      <div className="mx-auto max-w-3xl px-6">
        <Heart className="h-5 w-5 mx-auto text-accent mb-6" />
        <p className="text-script text-7xl md:text-8xl text-background">Obrigado</p>
        <p className="mt-6 max-w-xl mx-auto text-background/70 leading-relaxed">
          Pelo carinho, pela torcida e por fazerem parte da nossa história.
          Mal podemos esperar para celebrar este dia ao lado de você.
        </p>
        <div className="mt-12 inline-flex items-center gap-3 border border-background/30 px-6 py-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-xs uppercase tracking-[0.3em]">#CasamentoCarolEIvan</span>
        </div>
        <p className="mt-12 text-xs uppercase tracking-[0.3em] text-background/40">
          Carol & Ivan · 13.12.2026 · carolivan.com.br
        </p>
      </div>
    </footer>
  );
}
