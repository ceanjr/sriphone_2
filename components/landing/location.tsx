import { MapPin, Clock, Mail, Phone } from "lucide-react";
import { SITE_INFO, FONT_CLASSES } from "@/lib/constants";

export function Location() {
  return (
    <section className="relative py-12 px-4 bg-brand-dark md:py-16">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8 md:flex-row-reverse md:justify-around md:gap-6">
          {/* Map */}
          <div className="relative h-[250px] overflow-hidden rounded-xl md:h-[400px] md:w-[600px] md:flex-shrink-0">
            <iframe
              src={SITE_INFO.maps.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[60%] invert-[90%] brightness-[85%] contrast-[105%]"
              title="Localização Sr. IPHONE"
            />
          </div>

          {/* Information */}
          <div className="flex flex-col gap-6 text-text-secondary-dark leading-relaxed">
            <h2
              className={`${FONT_CLASSES.heading} text-text-primary-dark text-[1.8rem] mb-2 md:text-[2.5rem]`}
            >
              Onde estamos
            </h2>

            {/* Address */}
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 flex-shrink-0 text-text-muted-dark mt-1" />
              <div>
                <p className="font-medium text-text-primary-dark mb-1">
                  Endereço
                </p>
                <p>{SITE_INFO.address.street}</p>
                <p>
                  {SITE_INFO.address.city}, {SITE_INFO.address.zip}
                </p>
                <p className="text-sm text-text-muted-dark mt-1">
                  {SITE_INFO.address.complement}
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-3">
              <Clock className="w-5 h-5 flex-shrink-0 text-text-muted-dark mt-1" />
              <div>
                <p className="font-medium text-text-primary-dark mb-1">
                  Funcionamento
                </p>
                <p>{SITE_INFO.hours.weekdays}</p>
                <p>{SITE_INFO.hours.saturday}</p>
                <p>{SITE_INFO.hours.sunday}</p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex gap-3">
              <Phone className="w-5 h-5 flex-shrink-0 text-text-muted-dark mt-1" />
              <div>
                <p className="font-medium text-text-primary-dark mb-1">
                  Contato
                </p>
                <a
                  href={SITE_INFO.contact.phoneHref}
                  className="text-text-primary-dark hover:opacity-80 transition-opacity font-medium"
                >
                  {SITE_INFO.contact.phone}
                </a>
              </div>
            </div>

            <div className="flex gap-3">
              <Mail className="w-5 h-5 flex-shrink-0 text-text-muted-dark mt-1" />
              <div>
                <a
                  href={SITE_INFO.contact.emailHref}
                  className="text-text-secondary-dark hover:text-text-primary-dark transition-colors"
                >
                  {SITE_INFO.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
