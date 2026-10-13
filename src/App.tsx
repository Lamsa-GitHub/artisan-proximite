import { useState, type ReactNode } from "react";

type Role = "client" | "artisan" | "admin";
type StatusName =
  | "Publiée"
  | "Artisan sélectionné"
  | "Acceptée"
  | "En route"
  | "En cours"
  | "Terminée"
  | "Annulée";

const artisanPhoto =
  "https://images.unsplash.com/photo-1532437698276-c2ac365e7147?crop=faces&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=300&h=300";
const artisanPhoto2 =
  "https://images.unsplash.com/photo-1657356217561-6ed26b47e116?crop=faces&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=300&h=300";
const artisanPhoto3 =
  "https://images.unsplash.com/photo-1513872900980-460ea4c87668?crop=faces&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=300&h=300";

const screens: Record<Role, { id: string; label: string }[]> = {
  client: [
    { id: "home", label: "Accueil" },
    { id: "login", label: "Connexion" },
    { id: "new", label: "Nouvelle demande" },
    { id: "artisans", label: "Artisans" },
    { id: "artisan-profile", label: "Fiche artisan" },
    { id: "requests", label: "Mes demandes" },
    { id: "request-detail", label: "Détail" },
    { id: "rating", label: "Notation" },
  ],
  artisan: [
    { id: "artisan-home", label: "Accueil" },
    { id: "register", label: "Inscription" },
    { id: "pending", label: "Validation" },
    { id: "available", label: "Disponibles" },
    { id: "mission-detail", label: "Mission" },
    { id: "missions", label: "Mes missions" },
    { id: "profile", label: "Profil" },
  ],
  admin: [
    { id: "dashboard", label: "Tableau de bord" },
    { id: "admin-login", label: "Connexion" },
    { id: "validation", label: "Artisans" },
    { id: "admin-requests", label: "Demandes" },
  ],
};

const trades = [
  { name: "Plombier", icon: "drop", tone: "blue" },
  { name: "Électricien", icon: "bolt", tone: "yellow" },
  { name: "Maçon", icon: "brick", tone: "orange" },
  { name: "Climatisation", icon: "snow", tone: "cyan" },
  { name: "Menuisier", icon: "hammer", tone: "brown" },
  { name: "Peintre", icon: "brush", tone: "purple" },
];

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    home: <><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10v10h13V10M9 20v-6h6v6" /></>,
    file: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c.8-4 3.5-6 8-6s7.2 2 8 6" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    back: <path d="m15 18-6-6 6-6" />,
    phone: <path d="M7 3H4.5C3.7 3 3 3.7 3.1 4.5 3.8 13 11 20.2 19.5 20.9c.8.1 1.5-.6 1.5-1.4V17l-4-1-1.5 2c-4-1.6-7.9-5.5-9.5-9.5L8 7z" />,
    message: <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-5.1A8.5 8.5 0 1 1 21 11.5Z" />,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z" />,
    filter: <path d="M4 6h16M7 12h10M10 18h4" />,
    camera: <><path d="M4 8h4l1.5-2h5L16 8h4v11H4z" /><circle cx="12" cy="13.5" r="3" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    shield: <><path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6z" /><path d="m8.5 12 2 2 5-5" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18" /></>,
    drop: <path d="M12 3S6 10 6 14a6 6 0 0 0 12 0c0-4-6-11-6-11Z" />,
    bolt: <path d="m13 2-8 12h7l-1 8 8-12h-7z" />,
    brick: <><path d="M3 7h18v12H3zM3 13h18M9 7v6M15 13v6" /></>,
    snow: <path d="M12 2v20M4 7l16 10M4 17 20 7M9 4l3 3 3-3M9 20l3-3 3 3" />,
    hammer: <><path d="m14 5 5 5M6 20l9-9M11 4l3-2 7 7-3 3z" /></>,
    brush: <><path d="m14 4 6 6-8 8-6-6z" /><path d="M8 16c-4 0-5 2-5 5 2-1 5 0 7-3" /></>,
    users: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="10" r="2.5" /><path d="M3 20c.5-4 2.5-6 6-6s5.5 2 6 6M15 15c3 0 5 1.5 6 4.5" /></>,
    logout: <><path d="M10 4H5v16h5M14 8l4 4-4 4M8 12h10" /></>,
  };
  return (
    <svg aria-hidden="true" className="icon" width={size} height={size} viewBox="0 0 24 24">
      {paths[name] || paths.file}
    </svg>
  );
}

function Button({
  children,
  variant = "primary",
  icon,
  onClick,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "whatsapp";
  icon?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button type={type} onClick={onClick} className={`btn btn-${variant} ${className}`}>
      {icon && <Icon name={icon} size={18} />}
      {children}
    </button>
  );
}

function Card({ children, className = "", onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return <div onClick={onClick} className={`card ${onClick ? "card-clickable" : ""} ${className}`}>{children}</div>;
}

function Field({
  label,
  placeholder,
  prefix,
  error,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  prefix?: string;
  error?: string;
  type?: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <div className={`input-wrap ${error ? "input-error" : ""}`}>
        {prefix && <b>{prefix}</b>}
        <input type={type} placeholder={placeholder} />
      </div>
      {error && <small className="error-text">{error}</small>}
    </label>
  );
}

function SelectField({ label, value }: { label: string; value: string }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select defaultValue={value}>
        <option>{value}</option>
        <option>Cocody</option>
        <option>Marcory</option>
        <option>Yopougon</option>
        <option>Plateau</option>
      </select>
    </label>
  );
}

function Status({ value }: { value: StatusName }) {
  const key = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replaceAll(" ", "-");
  return <span className={`status status-${key}`}>{value}</span>;
}

function Stars({ value = 5, interactive = false }: { value?: number; interactive?: boolean }) {
  const [selected, setSelected] = useState(value);
  return (
    <div className={`stars ${interactive ? "stars-large" : ""}`} aria-label={`${selected} étoiles`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" onClick={() => interactive && setSelected(n)} aria-label={`${n} étoiles`}>
          <Icon name="star" size={interactive ? 34 : 15} />
        </button>
      ))}
    </div>
  );
}

function TopBar({ title, back, action }: { title: string; back?: () => void; action?: ReactNode }) {
  return (
    <header className="topbar">
      {back ? <button onClick={back} className="icon-btn" aria-label="Retour"><Icon name="back" /></button> : <span className="brand-mark"><Icon name="hammer" size={19} /></span>}
      <div className="topbar-title">{title}</div>
      <div className="topbar-action">{action || <span />}</div>
    </header>
  );
}

function BottomNav({ current, go }: { current: string; go: (screen: string) => void }) {
  const items = [
    ["home", "Accueil", "home"],
    ["requests", "Demandes", "file"],
    ["artisan-profile", "Profil", "user"],
  ];
  return (
    <nav className="bottom-nav">
      {items.map(([id, label, icon]) => (
        <button key={id} onClick={() => go(id)} className={current === id ? "active" : ""}>
          <Icon name={icon} size={21} /><span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function ClientHome({ go }: { go: (s: string) => void }) {
  return (
    <>
      <div className="hero">
        <div className="hero-top"><span className="brand-mark light"><Icon name="hammer" size={19} /></span><button className="avatar-small">AK</button></div>
        <p className="eyebrow light-text">Bonjour Aïcha</p>
        <h1>De quel service<br />avez-vous besoin ?</h1>
        <p>Des artisans vérifiés près de chez vous.</p>
      </div>
      <main className="content home-content">
        <div className="section-heading"><h2>Choisir un métier</h2><span>6 services</span></div>
        <div className="trade-grid">
          {trades.map((trade) => (
            <button key={trade.name} className="trade-card" onClick={() => go("new")}>
              <span className={`trade-icon tone-${trade.tone}`}><Icon name={trade.icon} size={26} /></span>
              <b>{trade.name}</b><Icon name="chevron" size={15} />
            </button>
          ))}
        </div>
        <Card className="request-cta" onClick={() => go("requests")}>
          <span className="round-icon"><Icon name="file" /></span>
          <div><b>Mes demandes</b><p>Suivez vos missions en cours</p></div>
          <Icon name="chevron" />
        </Card>
      </main>
      <BottomNav current="home" go={go} />
    </>
  );
}

function Login({ go }: { go: (s: string) => void }) {
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [error, setError] = useState(false);
  return (
    <div className="auth-screen">
      <div className="auth-logo"><span className="brand-mark large"><Icon name="hammer" size={26} /></span><b>Artisan Proximité</b></div>
      <div>
        <p className="eyebrow">ESPACE CLIENT</p>
        <h1>{step === "phone" ? "Bienvenue" : "Vérifiez votre numéro"}</h1>
        <p className="muted">{step === "phone" ? "Trouvez un artisan fiable en quelques minutes." : "Saisissez le code à 4 chiffres envoyé au +225 07•• ••42."}</p>
      </div>
      {step === "phone" ? (
        <form onSubmit={(e) => { e.preventDefault(); setStep("code"); }}>
          <Field label="Numéro de téléphone" prefix="+225" placeholder="07 00 00 00 00" type="tel" />
          <Button type="submit" className="full">Recevoir le code SMS</Button>
        </form>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); if (!error) setError(true); else go("home"); }}>
          <label className="field"><span>Code SMS</span><div className={`code-boxes ${error ? "has-error" : ""}`}><input maxLength={1} defaultValue="2" /><input maxLength={1} defaultValue="8" /><input maxLength={1} /><input maxLength={1} /></div>{error && <small className="error-text">Code incomplet. Saisissez les 4 chiffres reçus.</small>}</label>
          <Button type="submit" className="full">Continuer</Button>
          <button type="button" className="text-link">Renvoyer le code dans 00:42</button>
        </form>
      )}
      <p className="legal">En continuant, vous acceptez nos conditions d’utilisation.</p>
    </div>
  );
}

function NewRequest({ go }: { go: (s: string) => void }) {
  const [urgency, setUrgency] = useState("Normal");
  const [sent, setSent] = useState(false);
  return (
    <>
      <TopBar title="Nouvelle demande" back={() => go("home")} />
      <main className="content form-content">
        <div className="step-label"><b>Votre besoin</b><span>1 sur 1</span></div>
        <div className="progress"><i /></div>
        <SelectField label="Métier" value="Plombier" />
        <label className="field"><span>Décrivez le problème</span><textarea placeholder="Ex. Mon robinet de cuisine fuit depuis ce matin..." rows={4} /><small>0 / 300 caractères</small></label>
        <SelectField label="Quartier ou commune" value="Cocody — Angré" />
        <fieldset><legend>Niveau d’urgence</legend><div className="segmented">{["Normal", "Urgent", "Très urgent"].map((u) => <button type="button" key={u} onClick={() => setUrgency(u)} className={urgency === u ? "selected" : ""}>{u}</button>)}</div></fieldset>
        <Field label="Créneau souhaité" placeholder="Aujourd’hui, entre 14h et 17h" />
        <label className="field"><span>Photos <em>Optionnel · 3 max.</em></span><button className="photo-uploader" type="button"><Icon name="camera" /><b>Ajouter des photos</b><small>JPG ou PNG</small></button></label>
        <div className="info-note"><Icon name="shield" /><p><b>Aucun paiement dans l’application.</b><br />Le prix se négocie directement avec l’artisan.</p></div>
        {sent && <div className="success-note"><Icon name="check" /> Votre demande est prête à être publiée.</div>}
        <Button className="full" onClick={() => sent ? go("artisans") : setSent(true)}>Publier la demande</Button>
      </main>
    </>
  );
}

const artisans = [
  { name: "Koffi N’Guessan", job: "Plombier", zone: "Cocody, Riviera", rating: "4,9", exp: "8 ans", photo: artisanPhoto },
  { name: "Serge Kouamé", job: "Plombier", zone: "Cocody, Bingerville", rating: "4,8", exp: "6 ans", photo: artisanPhoto2 },
  { name: "Moussa Diarra", job: "Plombier", zone: "Angré, Abobo", rating: "4,7", exp: "10 ans", photo: artisanPhoto3 },
];

function ArtisanList({ go }: { go: (s: string) => void }) {
  return (
    <>
      <TopBar title="Artisans disponibles" back={() => go("new")} action={<button className="icon-btn"><Icon name="filter" /></button>} />
      <main className="content">
        <div className="result-summary"><div><b>12 plombiers</b><p>Disponibles près de Cocody</p></div><span className="live-dot">Actualisé</span></div>
        <div className="stack">
          {artisans.map((a, i) => (
            <Card key={a.name} className="artisan-card">
              <button className="artisan-main" onClick={() => go("artisan-profile")}>
                <img src={a.photo} alt={`Portrait de ${a.name}`} />
                <div><h3>{a.name}</h3><p>{a.job} · {a.exp}</p><span><Icon name="location" size={14} /> {a.zone}</span><span className="rating"><Icon name="star" size={14} /> {a.rating} <i>({34 - i * 7} avis)</i></span></div>
              </button>
              <Button onClick={() => go("request-detail")} className="full">Choisir cet artisan</Button>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}

function ArtisanProfile({ go, artisanMode = false }: { go: (s: string) => void; artisanMode?: boolean }) {
  return (
    <>
      <TopBar title={artisanMode ? "Mon profil" : "Fiche artisan"} back={() => go(artisanMode ? "artisan-home" : "artisans")} action={artisanMode ? <button className="text-link compact">Modifier</button> : undefined} />
      <main className="content">
        <div className="profile-head">
          <img src={artisanPhoto} alt="Portrait de Koffi N’Guessan" />
          <div><h1>Koffi N’Guessan</h1><p>Plombier professionnel</p><div className="verified"><Icon name="shield" size={15} /> Profil vérifié</div></div>
        </div>
        <div className="profile-stats"><div><b>4,9</b><span>Note moyenne</span></div><div><b>8 ans</b><span>Expérience</span></div><div><b>34</b><span>Missions</span></div></div>
        <section className="detail-section"><h2>À propos</h2><p>Plombier qualifié, spécialisé dans les dépannages rapides, les fuites et installations sanitaires. Travail propre et ponctuel.</p></section>
        <section className="detail-section"><h2>Zones d’intervention</h2><div className="chips"><span>Cocody</span><span>Riviera</span><span>Bingerville</span></div></section>
        {artisanMode && <section className="detail-section"><h2>Contact WhatsApp</h2><p className="contact-row"><Icon name="message" /> +225 07 08 23 45 67</p></section>}
        <section className="detail-section"><div className="section-heading"><h2>Avis récents</h2><button>Voir tout</button></div><Card className="review"><div><b>Aminata K.</b><Stars /><small>Il y a 3 jours</small></div><p>Très ponctuel et professionnel. Le problème a été réglé rapidement.</p></Card></section>
        {!artisanMode && <div className="sticky-action"><Button className="full" onClick={() => go("request-detail")}>Choisir Koffi</Button></div>}
      </main>
    </>
  );
}

function Requests({ go }: { go: (s: string) => void }) {
  return (
    <>
      <TopBar title="Mes demandes" />
      <main className="content">
        <div className="filter-tabs"><button className="active">Toutes <span>3</span></button><button>En cours</button><button>Terminées</button></div>
        <div className="stack">
          <RequestCard title="Fuite sous évier" trade="Plomberie" area="Cocody, Angré" date="Aujourd’hui · 10:30" status="En route" onClick={() => go("request-detail")} />
          <RequestCard title="Climatiseur peu froid" trade="Climatisation" area="Marcory" date="12 juin · 15:00" status="Artisan sélectionné" onClick={() => go("request-detail")} />
          <RequestCard title="Interrupteur défectueux" trade="Électricité" area="Cocody, Riviera" date="8 juin · 09:00" status="Terminée" onClick={() => go("rating")} />
        </div>
        <div className="empty-state compact-empty"><span><Icon name="file" /></span><b>Aucune autre demande</b><p>Vos futures demandes apparaîtront ici.</p></div>
      </main>
      <BottomNav current="requests" go={go} />
    </>
  );
}

function RequestCard({ title, trade, area, date, status, onClick }: { title: string; trade: string; area: string; date: string; status: StatusName; onClick: () => void }) {
  return <Card className="request-card" onClick={onClick}><div className="request-card-top"><span className="mini-trade"><Icon name={trade === "Plomberie" ? "drop" : trade === "Climatisation" ? "snow" : "bolt"} /></span><div><small>{trade}</small><h3>{title}</h3></div><Icon name="chevron" /></div><div className="request-meta"><span><Icon name="location" size={14} />{area}</span><span><Icon name="clock" size={14} />{date}</span></div><Status value={status} /></Card>;
}

function RequestDetail({ go }: { go: (s: string) => void }) {
  return (
    <>
      <TopBar title="Détail de la demande" back={() => go("requests")} />
      <main className="content">
        <div className="detail-title"><span className="trade-icon tone-blue"><Icon name="drop" /></span><div><p>Plomberie</p><h1>Fuite sous évier</h1></div><Status value="En route" /></div>
        <Card className="timeline-card">
          <h2>Progression</h2>
          <div className="timeline">
            {["Publiée", "Artisan sélectionné", "Acceptée", "En route", "En cours", "Terminée"].map((s, i) => <div className={i <= 3 ? "done" : ""} key={s}><i>{i <= 3 && <Icon name="check" size={12} />}</i><span><b>{s}</b>{i === 3 && <small>Aujourd’hui · 11:05</small>}</span></div>)}
          </div>
        </Card>
        <Card className="assigned-card">
          <p className="eyebrow">VOTRE ARTISAN</p>
          <div><img src={artisanPhoto} alt="Portrait de Koffi N’Guessan" /><span><h3>Koffi N’Guessan</h3><p>Plombier · <b>4,9</b></p></span></div>
          <div className="contact-actions"><Button icon="phone" variant="secondary">Appeler</Button><Button icon="message" variant="whatsapp">WhatsApp</Button></div>
          <small className="privacy-note"><Icon name="shield" size={14} /> Coordonnées visibles car la mission est acceptée.</small>
        </Card>
        <section className="detail-section"><h2>Détails</h2><p>Mon évier fuit depuis ce matin au niveau du siphon. L’eau coule dès que j’ouvre le robinet.</p><div className="detail-rows"><span><Icon name="location" />Cocody, Angré 8e tranche</span><span><Icon name="calendar" />Aujourd’hui, 14h–17h</span></div></section>
        <Button variant="danger" className="full" onClick={() => go("requests")}>Annuler la demande</Button>
      </main>
    </>
  );
}

function Rating({ go }: { go: (s: string) => void }) {
  return (
    <>
      <TopBar title="Noter la mission" back={() => go("requests")} />
      <main className="content rating-page">
        <div className="rating-person"><img src={artisanPhoto} alt="Koffi N’Guessan" /><span className="success-badge"><Icon name="check" size={16} /></span><h1>Comment s’est passée<br />votre intervention ?</h1><p>Votre avis aide les autres clients à choisir.</p></div>
        <Stars interactive value={0} />
        <p className="rating-label">Touchez une étoile pour noter</p>
        <label className="field"><span>Votre commentaire <em>Optionnel</em></span><textarea rows={5} placeholder="Ponctualité, qualité du travail, communication..." /></label>
        <Button className="full" onClick={() => go("requests")}>Envoyer mon avis</Button>
        <button className="text-link">Passer cette étape</button>
      </main>
    </>
  );
}

function Register({ go }: { go: (s: string) => void }) {
  return (
    <>
      <TopBar title="Devenir artisan" back={() => go("artisan-home")} />
      <main className="content form-content">
        <div><p className="eyebrow">CRÉER VOTRE PROFIL</p><h1>Rejoignez notre réseau</h1><p className="muted">Recevez des missions près de chez vous.</p></div>
        <Field label="Numéro de téléphone" prefix="+225" placeholder="07 00 00 00 00" />
        <Field label="Nom complet" placeholder="Ex. Koffi N’Guessan" />
        <SelectField label="Votre métier principal" value="Plombier" />
        <label className="field"><span>Zones d’intervention</span><div className="chips selectable"><span className="selected">Cocody <b>×</b></span><span>+ Ajouter une zone</span></div></label>
        <label className="check-row"><input type="checkbox" defaultChecked /><span>Je certifie que les informations fournies sont exactes.</span></label>
        <Button className="full" onClick={() => go("pending")}>Envoyer mon inscription</Button>
      </main>
    </>
  );
}

function Pending() {
  return (
    <div className="state-page">
      <span className="state-illustration"><Icon name="shield" size={42} /><i><Icon name="clock" size={18} /></i></span>
      <p className="eyebrow">DOSSIER ENVOYÉ</p><h1>Votre compte est en cours de validation</h1>
      <p>Notre équipe vérifie vos informations. Vous recevrez un SMS sous 24 à 48 heures.</p>
      <Card className="steps-card"><div className="done"><Icon name="check" /><span><b>Inscription reçue</b><small>Aujourd’hui · 09:42</small></span></div><div><span className="dot" /><span><b>Vérification du profil</b><small>En cours</small></span></div><div><span className="dot" /><span><b>Compte activé</b><small>À venir</small></span></div></Card>
      <Button variant="secondary" className="full">Contacter l’assistance</Button>
    </div>
  );
}

function ArtisanHome({ go }: { go: (s: string) => void }) {
  const [available, setAvailable] = useState(true);
  return (
    <>
      <div className="artisan-hero">
        <div className="hero-top"><div><p>Bonjour, Koffi</p><h1>Votre journée</h1></div><img src={artisanPhoto} alt="Koffi" /></div>
        <button onClick={() => setAvailable(!available)} className={`availability ${available ? "on" : ""}`}><span><i /><b>{available ? "Disponible" : "Indisponible"}</b></span><small>{available ? "Vous recevez de nouvelles missions" : "Vous ne recevez plus de missions"}</small></button>
      </div>
      <main className="content overlap">
        <div className="artisan-summary"><div><span><Icon name="calendar" /></span><b>2</b><small>Missions aujourd’hui</small></div><div><span><Icon name="star" /></span><b>4,9</b><small>Note moyenne</small></div></div>
        <div className="section-heading"><h2>Prochaine mission</h2><button onClick={() => go("missions")}>Voir tout</button></div>
        <Card className="next-mission" onClick={() => go("mission-detail")}><div><Status value="En route" /><small>AUJOURD’HUI · 14:00</small></div><h3>Fuite sous évier</h3><p><Icon name="location" size={15} /> Cocody, Angré 8e tranche</p><div className="client-row"><span className="avatar-small">AK</span><b>Aïcha K.</b><Icon name="chevron" /></div></Card>
        <Button className="full" icon="plus" onClick={() => go("available")}>Voir les missions disponibles</Button>
      </main>
      <ArtisanBottom current="artisan-home" go={go} />
    </>
  );
}

function ArtisanBottom({ current, go }: { current: string; go: (s: string) => void }) {
  return <nav className="bottom-nav artisan-nav">{[["artisan-home", "Accueil", "home"], ["available", "Disponibles", "plus"], ["missions", "Missions", "file"], ["profile", "Profil", "user"]].map(([id, label, icon]) => <button key={id} className={current === id ? "active" : ""} onClick={() => go(id)}><Icon name={icon} size={20} /><span>{label}</span></button>)}</nav>;
}

function AvailableMissions({ go }: { go: (s: string) => void }) {
  const jobs = [
    ["Plomberie", "Fuite importante sous l’évier depuis ce matin. Besoin d’une intervention rapide.", "Cocody, Angré", "Très urgent", "Aujourd’hui · Dès que possible", "Il y a 8 min"],
    ["Électricité", "Deux prises du salon ne fonctionnent plus.", "Riviera 3", "Normal", "Demain · 9h–12h", "Il y a 24 min"],
  ];
  return (
    <>
      <TopBar title="Missions disponibles" action={<button className="icon-btn"><Icon name="filter" /></button>} />
      <main className="content">
        <div className="privacy-banner"><Icon name="shield" /><span><b>Coordonnées protégées</b><small>Le contact du client apparaît après acceptation.</small></span></div>
        <div className="stack">{jobs.map((j) => <Card className="job-card" key={j[1]}><div className="job-top"><span className="mini-trade"><Icon name={j[0] === "Plomberie" ? "drop" : "bolt"} /></span><div><small>{j[0]}</small><b>{j[2]}</b></div><span className={`urgency ${j[3] === "Très urgent" ? "high" : ""}`}>{j[3]}</span></div><p>{j[1]}</p><div className="job-details"><span><Icon name="calendar" />{j[4]}</span><span><Icon name="clock" />Publiée {j[5]}</span></div><Button className="full" onClick={() => go("mission-detail")}>Accepter la mission</Button></Card>)}</div>
      </main>
      <ArtisanBottom current="available" go={go} />
    </>
  );
}

function MissionDetail({ go }: { go: (s: string) => void }) {
  const stages: StatusName[] = ["Acceptée", "En route", "En cours", "Terminée"];
  const [stage, setStage] = useState(0);
  return (
    <>
      <TopBar title="Mission #AP-2841" back={() => go("available")} />
      <main className="content mission-page">
        <div className="mission-status"><Status value={stages[stage]} /><small>Acceptée aujourd’hui à 10:54</small></div>
        <div className="detail-title"><span className="trade-icon tone-blue"><Icon name="drop" /></span><div><p>Plomberie</p><h1>Fuite sous évier</h1></div></div>
        <Card><h2>Client</h2><div className="accepted-client"><span className="avatar-small">AK</span><div><h3>Aïcha K.</h3><p>Contact visible · Mission acceptée</p></div></div><div className="contact-actions"><Button icon="phone" variant="secondary">Appeler</Button><Button icon="message" variant="whatsapp">WhatsApp</Button></div></Card>
        <Card className="address-card"><span><Icon name="location" /></span><div><small>ADRESSE D’INTERVENTION</small><b>Cocody, Angré 8e tranche</b><p>Près de la pharmacie Sainte-Marie</p></div></Card>
        <section className="detail-section"><h2>Description</h2><p>Mon évier fuit depuis ce matin au niveau du siphon. L’eau coule dès que j’ouvre le robinet.</p></section>
        {stage < 3 ? <div className="sticky-action"><Button className="full" onClick={() => setStage(stage + 1)}>Passer à l’étape suivante <Icon name="chevron" /></Button><small>Prochaine étape : {stages[stage + 1]}</small></div> : <div className="success-note"><Icon name="check" /> Mission terminée avec succès</div>}
      </main>
    </>
  );
}

function Missions({ go }: { go: (s: string) => void }) {
  const [tab, setTab] = useState("En cours");
  return (
    <>
      <TopBar title="Mes missions" />
      <main className="content">
        <div className="big-tabs"><button onClick={() => setTab("En cours")} className={tab === "En cours" ? "active" : ""}>En cours <span>2</span></button><button onClick={() => setTab("Terminées")} className={tab === "Terminées" ? "active" : ""}>Terminées</button></div>
        {tab === "En cours" ? <div className="stack"><RequestCard title="Fuite sous évier" trade="Plomberie" area="Cocody, Angré" date="Aujourd’hui · 14:00" status="En route" onClick={() => go("mission-detail")} /><RequestCard title="Robinet à remplacer" trade="Plomberie" area="Riviera 2" date="Demain · 09:30" status="Acceptée" onClick={() => go("mission-detail")} /></div> : <div className="empty-state"><span><Icon name="check" /></span><b>Aucune mission terminée</b><p>Vos missions finalisées apparaîtront ici.</p></div>}
      </main>
      <ArtisanBottom current="missions" go={go} />
    </>
  );
}

function AdminLogin({ go }: { go: (s: string) => void }) {
  return <div className="admin-auth"><div className="admin-auth-side"><span className="brand-mark light"><Icon name="hammer" /></span><h1>Artisan<br />Proximité</h1><p>Administration de la plateforme</p></div><form onSubmit={(e) => { e.preventDefault(); go("dashboard"); }}><p className="eyebrow">ESPACE SÉCURISÉ</p><h1>Connexion admin</h1><p className="muted">Accédez au tableau de bord.</p><Field label="Adresse e-mail" placeholder="admin@artisanproximite.ci" type="email" /><Field label="Mot de passe" placeholder="••••••••" type="password" /><div className="form-between"><label><input type="checkbox" /> Se souvenir de moi</label><button type="button">Mot de passe oublié ?</button></div><Button className="full" type="submit">Se connecter</Button></form></div>;
}

function AdminShell({ current, go, children, title, subtitle }: { current: string; go: (s: string) => void; children: ReactNode; title: string; subtitle: string }) {
  return <div className="admin-shell"><aside><div className="admin-brand"><span className="brand-mark light"><Icon name="hammer" /></span><b>Artisan<br />Proximité</b></div><nav>{[["dashboard", "Tableau de bord", "home"], ["validation", "Validation artisans", "users"], ["admin-requests", "Demandes", "file"]].map(([id, label, icon]) => <button key={id} onClick={() => go(id)} className={current === id ? "active" : ""}><Icon name={icon} />{label}{id === "validation" && <i>8</i>}</button>)}</nav><div className="admin-user"><span>YN</span><div><b>Yann N.</b><small>Administrateur</small></div><Icon name="logout" /></div></aside><main><header><div><h1>{title}</h1><p>{subtitle}</p></div><div className="admin-header-right"><button className="icon-btn"><Icon name="calendar" /></button><span className="avatar-small">YN</span></div></header>{children}</main></div>;
}

function Dashboard({ go }: { go: (s: string) => void }) {
  const metrics = [["Demandes", "248", "+12%", "file"], ["En cours", "32", "+4%", "clock"], ["Terminées", "186", "+18%", "check"], ["Artisans actifs", "74", "+6%", "users"], ["En attente", "8", "À traiter", "shield"]];
  return <AdminShell current="dashboard" go={go} title="Tableau de bord" subtitle="Vue d’ensemble de l’activité"><div className="admin-toolbar"><div className="period"><button className="active">7 jours</button><button>30 jours</button><button>3 mois</button></div><button className="date-filter"><Icon name="calendar" /> 10–17 juin 2025</button></div><div className="metric-grid">{metrics.map((m, i) => <Card key={m[0]} className="metric-card"><span className={`metric-icon metric-${i}`}><Icon name={m[3]} /></span><div><p>{m[0]}</p><b>{m[1]}</b><small>{m[2]}</small></div></Card>)}</div><div className="admin-columns"><Card className="chart-card"><div className="section-heading"><div><h2>Demandes publiées</h2><p>Évolution des 7 derniers jours</p></div><b>+12,4%</b></div><div className="fake-chart">{[42, 60, 48, 75, 66, 88, 72].map((h, i) => <div key={i}><i style={{ height: `${h}%` }} /><span>{["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"][i]}</span></div>)}</div></Card><Card className="activity-card"><div className="section-heading"><h2>À traiter</h2><button onClick={() => go("validation")}>Tout voir</button></div><div className="attention"><span><Icon name="users" /></span><div><b>8 artisans à valider</b><p>3 depuis plus de 24h</p></div><Icon name="chevron" /></div><div className="attention"><span><Icon name="file" /></span><div><b>2 demandes signalées</b><p>Nécessitent votre attention</p></div><Icon name="chevron" /></div></Card></div><Card className="admin-table-card"><div className="section-heading"><h2>Demandes récentes</h2><button onClick={() => go("admin-requests")}>Voir toutes</button></div><AdminRequestTable compact /></Card></AdminShell>;
}

function AdminValidation({ go }: { go: (s: string) => void }) {
  const [rejected, setRejected] = useState<string[]>([]);
  return <AdminShell current="validation" go={go} title="Validation des artisans" subtitle="8 inscriptions en attente de vérification"><div className="admin-toolbar"><div className="search-input">Rechercher un artisan...</div><div className="filter-button"><Icon name="filter" /> Tous les métiers</div></div><div className="validation-list">{[["Konan Yao", "Électricien", "Yopougon, Abobo", "Aujourd’hui, 10:24"], ["Fatou Traoré", "Peintre", "Cocody, Bingerville", "Hier, 16:42"], ["Issa Bamba", "Climatisation", "Marcory, Treichville", "Hier, 12:10"]].filter(a => !rejected.includes(a[0])).map((a, i) => <Card className="validation-row" key={a[0]}><div className={`admin-avatar avatar-${i}`}>{a[0].split(" ").map(n => n[0]).join("")}</div><div><h3>{a[0]}</h3><p>{a[1]}</p></div><div><small>ZONES</small><p><Icon name="location" />{a[2]}</p></div><div><small>INSCRIPTION</small><p>{a[3]}</p></div><button className="text-link">Voir le dossier</button><Button variant="danger" onClick={() => setRejected([...rejected, a[0]])}>Refuser</Button><Button onClick={() => setRejected([...rejected, a[0]])}>Valider</Button></Card>)}</div>{rejected.length > 0 && <div className="admin-toast"><Icon name="check" /> Profil traité avec succès.</div>}</AdminShell>;
}

function AdminRequestTable({ compact = false }: { compact?: boolean }) {
  const data: [string, string, string, string, StatusName][] = [["AP-2841", "Fuite sous évier", "Plomberie", "Cocody", "En route"], ["AP-2840", "Prises en panne", "Électricité", "Riviera", "Publiée"], ["AP-2839", "Climatiseur bruyant", "Climatisation", "Marcory", "Terminée"], ["AP-2838", "Porte bloquée", "Menuiserie", "Yopougon", "Acceptée"]];
  return <div className="table-wrap"><table><thead><tr><th>Référence</th><th>Demande</th><th>Métier</th><th>Commune</th><th>Statut</th>{!compact && <th>Actions</th>}</tr></thead><tbody>{data.slice(0, compact ? 3 : 4).map(d => <tr key={d[0]}><td><b>#{d[0]}</b></td><td>{d[1]}</td><td>{d[2]}</td><td>{d[3]}</td><td><Status value={d[4]} /></td>{!compact && <td><button className="row-action">•••</button></td>}</tr>)}</tbody></table></div>;
}

function AdminRequests({ go }: { go: (s: string) => void }) {
  return <AdminShell current="admin-requests" go={go} title="Toutes les demandes" subtitle="248 demandes au total"><div className="admin-toolbar multi"><div className="search-input">Rechercher par référence...</div><div className="filter-button">Statut : Tous</div><div className="filter-button">Métier : Tous</div><div className="filter-button">Commune : Toutes</div><div className="filter-button"><Icon name="calendar" /> Date</div></div><Card className="admin-table-card"><AdminRequestTable /><div className="pagination"><span>1–4 sur 248</span><div><Button variant="secondary">Précédent</Button><Button variant="secondary">Suivant</Button></div></div></Card></AdminShell>;
}

export default function App() {
  const [view, setView] = useState<"all" | Role>("all");
  const noNavigation = () => {};

  function renderScreen(role: Role, screen: string) {
    if (role === "client") {
      if (screen === "login") return <Login go={noNavigation} />;
      if (screen === "new") return <NewRequest go={noNavigation} />;
      if (screen === "artisans") return <ArtisanList go={noNavigation} />;
      if (screen === "artisan-profile") return <ArtisanProfile go={noNavigation} />;
      if (screen === "requests") return <Requests go={noNavigation} />;
      if (screen === "request-detail") return <RequestDetail go={noNavigation} />;
      if (screen === "rating") return <Rating go={noNavigation} />;
      return <ClientHome go={noNavigation} />;
    }
    if (role === "artisan") {
      if (screen === "register") return <Register go={noNavigation} />;
      if (screen === "pending") return <Pending />;
      if (screen === "available") return <AvailableMissions go={noNavigation} />;
      if (screen === "mission-detail") return <MissionDetail go={noNavigation} />;
      if (screen === "missions") return <Missions go={noNavigation} />;
      if (screen === "profile") return <ArtisanProfile go={noNavigation} artisanMode />;
      return <ArtisanHome go={noNavigation} />;
    }
    if (screen === "admin-login") return <AdminLogin go={noNavigation} />;
    if (screen === "validation") return <AdminValidation go={noNavigation} />;
    if (screen === "admin-requests") return <AdminRequests go={noNavigation} />;
    return <Dashboard go={noNavigation} />;
  }

  const visibleRoles = (["client", "artisan", "admin"] as Role[]).filter(
    (role) => view === "all" || view === role,
  );

  return (
    <div className="design-board">
      <div className="board-toolbar">
        <div className="prototype-brand"><span className="brand-mark"><Icon name="hammer" size={17} /></span><b>Artisan Proximité</b><small>Prototype interactif</small></div>
        <div className="role-switch">
          {(["all", "client", "artisan", "admin"] as const).map((role) => (
            <button key={role} className={view === role ? "active" : ""} onClick={() => setView(role)}>
              {role === "all" ? "Tous les écrans" : role === "client" ? "Client" : role === "artisan" ? "Artisan" : "Admin"}
            </button>
          ))}
        </div>
      </div>
      <main className="board-canvas">
        {visibleRoles.map((role) => (
          <section className={`frame-section frame-section-${role}`} key={role}>
            <div className="frame-section-title">
              <span>{role === "client" ? "01" : role === "artisan" ? "02" : "03"}</span>
              <div>
                <p>{role === "client" ? "APPLICATION MOBILE" : role === "artisan" ? "APPLICATION PROFESSIONNELLE" : "INTERFACE WEB"}</p>
                <h1>{role === "client" ? "Parcours client" : role === "artisan" ? "Parcours artisan" : "Administration"}</h1>
              </div>
              <small>{screens[role].length} écrans</small>
            </div>
            <div className={`frames-grid ${role === "admin" ? "admin-grid" : ""}`}>
              {screens[role].map((item, index) => (
                <article className={`gallery-frame ${role === "admin" ? "gallery-frame-admin" : ""}`} key={item.id}>
                  <div className="frame-caption">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <b>{item.label}</b>
                    <small>{role === "admin" ? "Desktop · 1180 × 760" : "Mobile · 390 × 844"}</small>
                  </div>
                  <div className={`app-frame ${role === "admin" ? "admin-frame" : ""}`}>
                    {renderScreen(role, item.id)}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
