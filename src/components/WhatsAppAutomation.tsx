import { CalendarCheck, Check, CheckCheck, MessageCircle, ShoppingBag, Zap } from "lucide-react";
import { whatsappUrl } from "@/config/site";
import { Reveal } from "./Reveal";

const benefits = [
  { icon: Zap, title: "Responde al instante", text: "Precios, horarios y preguntas frecuentes contestadas a cualquier hora, sin que estés pendiente del celular." },
  { icon: CalendarCheck, title: "Agenda y confirma", text: "Tus clientes reservan, cambian o cancelan su cita por el chat, y reciben un recordatorio antes de llegar." },
  { icon: ShoppingBag, title: "Toma pedidos", text: "Muestra tu catálogo, recibe el pedido y avisa cuando esté listo, todo dentro de la conversación." },
];

// Conversación de ejemplo: muestra qué hace la automatización sin prometer cifras.
const chat = [
  { from: "client", text: "Hola, ¿tienen turno para mañana en la tarde?" },
  { from: "bot", text: "¡Hola! Sí. Tengo libre a las 3:00 p. m. y a las 5:30 p. m. ¿Cuál te sirve?" },
  { from: "client", text: "La de las 3" },
  { from: "bot", text: "Listo, quedó agendada para mañana a las 3:00 p. m. Te escribo un rato antes para recordártelo." },
] as const;

export function WhatsAppAutomation() {
  const href = whatsappUrl("¡Hola! Quiero automatizar el WhatsApp de mi negocio.") ?? "/#contacto";
  const external = href.startsWith("http");

  return (
    <section id="whatsapp" className="py-16 md:py-28">
      <div className="container grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="text-sm font-medium text-paramo">Automatización de WhatsApp</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Que tu WhatsApp atienda mientras tú trabajas.</h2>
          <p className="mt-4 max-w-lg text-texto2">
            Conectamos tu número de WhatsApp con respuestas automáticas, citas y pedidos. Tus clientes reciben atención al momento y tú recuperas el tiempo que gastas contestando lo mismo todos los días.
          </p>
          <ul className="mt-8 space-y-5">
            {benefits.map((b) => (
              <li key={b.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-paramo-suave text-paramo"><b.icon size={20} /></span>
                <div>
                  <h3 className="font-semibold">{b.title}</h3>
                  <p className="mt-1 text-sm text-texto2">{b.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <a
            href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-paramo px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-paramo-hondo"
          >
            <MessageCircle size={18} />Quiero automatizar mi WhatsApp
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto w-full max-w-sm rounded-[2rem] border border-linea bg-arena p-3 shadow-xl">
            <div className="overflow-hidden rounded-3xl bg-papel">
              <div className="flex items-center gap-3 bg-paramo px-4 py-3 text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15"><MessageCircle size={18} /></span>
                <div>
                  <p className="text-sm font-semibold leading-tight">Tu negocio</p>
                  <p className="text-xs text-white/75">Responde en segundos</p>
                </div>
              </div>
              <ol className="space-y-2.5 bg-arena/60 p-4" aria-label="Ejemplo de conversación">
                {chat.map((m, i) => (
                  <li key={i} className={m.from === "bot" ? "flex justify-end" : "flex justify-start"}>
                    <p className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-sm ${m.from === "bot" ? "rounded-br-md bg-paramo-suave text-tinta" : "rounded-bl-md bg-white text-tinta shadow-sm"}`}>
                      {m.text}
                      {m.from === "bot" && <CheckCheck size={14} className="ml-1.5 inline-block align-text-bottom text-paramo-puente" aria-hidden />}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="flex items-center justify-center gap-1.5 border-t border-linea px-4 py-3 text-xs text-texto2">
                <Check size={14} className="text-paramo" />Cita agendada sin intervención tuya
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
