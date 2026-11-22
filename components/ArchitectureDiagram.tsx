/**
 * Project Nexus architecture, drawn by hand as inline SVG.
 * Colours come from the CSS theme tokens, so it follows light/dark mode.
 * Deliberately generic: no IPs, hostnames or other sensitive details.
 */
import type { Content } from "@/content/types";

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  dashed?: boolean;
  fill?: string;
};

function Box({ x, y, w, h, dashed, fill = "var(--bg)" }: BoxProps) {
  return (
    <rect
      x={x + 0.5}
      y={y + 0.5}
      width={w - 1}
      height={h - 1}
      rx={8}
      fill={fill}
      stroke="var(--line)"
      strokeWidth={1}
      strokeDasharray={dashed ? "4 4" : undefined}
    />
  );
}

type ServiceProps = {
  x: number;
  y: number;
  name: string;
  stack: string;
  pill: string;
  dashed?: boolean;
};

function Service({ x, y, name, stack, pill, dashed }: ServiceProps) {
  return (
    <g>
      <Box x={x} y={y} w={148} h={92} dashed={dashed} />
      <text x={x + 12} y={y + 23} className="t-title">
        {name}
      </text>
      <text x={x + 12} y={y + 41} className="t-small">
        {stack}
      </text>
      <rect x={x + 10} y={y + 56} width={128} height={24} rx={12} fill="var(--surface)" />
      <text x={x + 21} y={y + 72} className="t-mono">
        {pill}
      </text>
    </g>
  );
}

export function ArchitectureDiagram({ d }: { d: Content["diagram"] }) {
  return (
    <svg
      viewBox="0 0 360 652"
      role="img"
      aria-labelledby="nexus-diagram-title nexus-diagram-desc"
      className="arch h-auto w-full"
    >
      <title id="nexus-diagram-title">{d.title}</title>
      <desc id="nexus-diagram-desc">{d.desc}</desc>

      <defs>
        <marker
          id="arrow-accent"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
        </marker>
      </defs>

      {/* Row 1: who can and cannot reach the server */}
      <Box x={0} y={0} w={168} h={58} fill="var(--accent-soft)" />
      <text x={14} y={25} className="t-title">{d.devices}</text>
      <text x={14} y={43} className="t-small">{d.devicesSub}</text>

      <Box x={192} y={0} w={168} h={58} dashed />
      <text x={206} y={25} className="t-title t-muted">{d.internet}</text>
      <text x={206} y={43} className="t-small">{d.internetSub}</text>

      {/* Allowed path: Tailscale */}
      <line x1={84} y1={58} x2={84} y2={136} stroke="var(--accent)" strokeWidth={2} markerEnd="url(#arrow-accent)" />
      <text x={96} y={94} className="t-label t-accent">
        Tailscale VPN
      </text>
      <text x={96} y={110} className="t-small">{d.tunnelSub}</text>

      {/* Blocked path: internet */}
      <line x1={276} y1={58} x2={276} y2={120} stroke="var(--muted)" strokeWidth={1.25} strokeDasharray="3 4" />
      <path d="M270 124 L282 136 M282 124 L270 136" stroke="var(--fg)" strokeWidth={2} strokeLinecap="round" />

      {/* Host */}
      <Box x={0} y={140} w={360} h={422} fill="var(--surface)" />
      <text x={14} y={161} className="t-mono t-muted">{d.host}</text>

      {/* Traefik */}
      <Box x={14} y={172} w={332} h={64} />
      <text x={28} y={197} className="t-title">{d.traefik}</text>
      <text x={28} y={217} className="t-small">{d.traefikSub}</text>
      <line x1={180} y1={236} x2={180} y2={258} stroke="var(--accent)" strokeWidth={2} markerEnd="url(#arrow-accent)" />

      {/* Internal network with the services */}
      <rect
        x={14.5}
        y={262.5}
        width={331}
        height={243}
        rx={10}
        fill="none"
        stroke="var(--muted)"
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      <text x={26} y={282} className="t-mono t-muted">{d.network}</text>

      <Service x={26} y={292} name="Fin-Engine" stack="Next.js · FastAPI" pill={d.ownPostgres} />
      <Service x={186} y={292} name="Transcriber" stack="FastAPI · FFmpeg" pill={d.telegramBot} />
      <Service x={26} y={396} name="Quiz-Engine" stack="FastAPI · PWA" pill={d.ownPostgres} />
      <Service x={186} y={396} name="Ads Automator" stack={d.inDevelopment} pill={d.encryptedSqlite} dashed />

      {/* Hardening note */}
      <text x={180} y={530} textAnchor="middle" className="t-small">{d.hardening[0]}</text>
      <text x={180} y={547} textAnchor="middle" className="t-small">{d.hardening[1]}</text>

      {/* Outbound-only dependencies */}
      <line x1={84} y1={562} x2={84} y2={594} stroke="var(--muted)" strokeWidth={1.25} strokeDasharray="3 4" />
      <line x1={276} y1={562} x2={276} y2={594} stroke="var(--muted)" strokeWidth={1.25} strokeDasharray="3 4" />
      <text x={180} y={583} textAnchor="middle" className="t-mono t-muted">{d.outbound}</text>

      <Box x={0} y={594} w={168} h={58} />
      <text x={14} y={619} className="t-title">
        Porkbun DNS
      </text>
      <text x={14} y={637} className="t-small">{d.dnsSub}</text>

      <Box x={192} y={594} w={168} h={58} />
      <text x={206} y={619} className="t-title">
        Let&apos;s Encrypt
      </text>
      <text x={206} y={637} className="t-small">{d.certsSub}</text>
    </svg>
  );
}
