import type { Metadata } from "next";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Synami Agriscience for product enquiries, distribution opportunities, private-label requirements, bulk supply and international partnerships.",
};

export const revalidate = 3600;

type Settings = {
  generalEmail?: string;
  salesEmail?: string;
  exportEmail?: string;
  phone?: string;
  phoneAlt?: string;
  address?: string;
  mapEmbedUrl?: string;
  mapLinkUrl?: string;
};

export default async function ContactPage() {
  const settings: Settings = await client.fetch(siteSettingsQuery);

  const emails = [
    { label: "General", value: settings?.generalEmail },
    { label: "Sales", value: settings?.salesEmail },
    { label: "Export", value: settings?.exportEmail },
  ].filter((e) => !!e.value);

  const phones = [settings?.phone, settings?.phoneAlt].filter(Boolean) as string[];

  return (
    <>
      <section className="bg-field pb-14 pt-36 md:pb-16 md:pt-44">
        <Container>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-leaf">
            Contact us
          </p>
          <h1 className="mt-4 max-w-[18ch] font-display text-4xl font-semibold text-ink">
            Let&apos;s start a conversation
          </h1>
          <p className="mt-6 max-w-[58ch] text-lg">
            For product enquiries, distribution opportunities, private-label
            requirements, bulk supply and international partnerships — tell us
            what you need and our team will get back to you.
          </p>
        </Container>
      </section>

      {/* Two columns, details left and form right, matching the reference
          layout — but as two distinct blocks on the page rather than one
          floating white card, which sits better with the band rhythm the
          rest of the site uses. */}
      <section className="bg-paper py-16 md:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            {/* ---- Get in touch ---- */}
            <div>
              <h2 className="text-2xl">Get in touch</h2>

              <ul className="mt-9 space-y-6">
                {emails.map((e) => (
                  <li key={e.value} className="flex gap-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-field text-leaf">
                      <Mail className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-display text-xs uppercase tracking-[0.14em] text-slate">
                        {e.label}
                      </p>
                      <a
                        href={`mailto:${e.value}`}
                        className="link-wipe mt-1 inline-block text-navy transition-colors hover:text-leaf"
                      >
                        {e.value}
                      </a>
                    </div>
                  </li>
                ))}

                {phones.map((p) => (
                  <li key={p} className="flex gap-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-field text-leaf">
                      <Phone className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-display text-xs uppercase tracking-[0.14em] text-slate">
                        Phone
                      </p>
                      <a
                        href={`tel:${p.replace(/\s/g, "")}`}
                        className="link-wipe mt-1 inline-block text-navy transition-colors hover:text-leaf"
                      >
                        {p}
                      </a>
                    </div>
                  </li>
                ))}

                {settings?.address && (
                  <li className="flex gap-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-field text-leaf">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-display text-xs uppercase tracking-[0.14em] text-slate">
                        Address
                      </p>
                      <p className="mt-1 whitespace-pre-line text-navy">
                        {settings.address}
                      </p>
                      {settings.mapLinkUrl && (
                        <a
                          href={settings.mapLinkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 font-display text-sm font-medium text-leaf"
                        >
                          Open in Maps
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </li>
                )}
              </ul>

              {/* Map. Rendered only when the client has added an embed URL,
                  so the page never shows a broken grey rectangle. */}
              {settings?.mapEmbedUrl && (
                <div className="mt-10 overflow-hidden rounded-card border border-line">
                  <iframe
                    src={settings.mapEmbedUrl}
                    title="Our location"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-[320px] w-full border-0"
                    allowFullScreen
                  />
                </div>
              )}
            </div>

            {/* ---- Form ---- */}
            <div className="rounded-card border border-line bg-field p-8 md:p-10">
              <h2 className="text-2xl">Send us a message</h2>
              <p className="mt-3 text-stone">
                The more detail you give us, the more useful our reply will be.
              </p>
              <div className="mt-9">
                <EnquiryForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
