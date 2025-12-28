import { useEffect } from 'react'
import { motion } from 'motion/react'
import TopBar from '../TopBar'
import { Mail, Award, Users } from 'lucide-react'
import { Button } from '../ui/button'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import AymanImage from '../../assets/Ayman_AMASROUR.jpg'
import RihabImage from '../../assets/Rihab_ESSAFI.jpeg'
import JadImage from '../../assets/Jad_LASIRI.jpeg'
import HichamImage from '../../assets/Hicham_SMAITI.jpeg'

type Page = 'home' | 'dashboard' | 'map' | 'rapports' | 'about-us' | 'how-it-works'

interface AboutUsPageProps {
  onNavigate?: (page: Page) => void
}

export default function AboutUsPage({ onNavigate }: AboutUsPageProps = {}) {
  // Preload critical images
  useEffect(() => {
    const preloadImages = [AymanImage, RihabImage, JadImage]
    preloadImages.forEach((src) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
  }, [])

  const openMailDraft = (provider: 'outlook' | 'gmail', email: string) => {
    const outlookUrl = `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(email)}`
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`
    const url = provider === 'outlook' ? outlookUrl : gmailUrl
    if (typeof window !== 'undefined') {
      // Use location to avoid popup blockers
      window.location.href = url
    }
  }

  const teamMembers = [
    {
      name: 'Ayman Amasrour',
      role: 'Responsable Machine Learning et Data',
      email: 'Ayman.AMASROUR@emines.um6p.ma',
      image: AymanImage,
      description: 'Développement des modèles prédictifs et analyse des données environnementales'
    },
    {
      name: 'Rihab Essafi',
      role: 'Responsable Frontend et Visualisation de données',
      email: 'Rihab.ESSAFI@emines.um6p.ma',
      image: RihabImage,
      description: 'Conception de l\'interface utilisateur et création des dashboards interactifs'
    },
    {
      name: 'Jad Lasiri',
      role: 'Responsable Développement Web et Backend',
      email: 'Jad.LASIRI@emines.um6p.ma',
      image: JadImage,
      description: 'Architecture serveur, APIs temps réel et intégration des systèmes'
    },
  ]

  return (
    <>
      <TopBar currentPage="about-us" onNavigate={onNavigate || (() => {})} />
      <div className="min-h-screen p-8 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/30 backdrop-blur-sm mb-6">
              <Award size={18} className="text-emerald-400" />
              <span className="text-sm font-bold text-emerald-400" style={{ fontFamily: 'var(--font-heading)' }}>
                Notre Équipe
              </span>
            </div>
            
            <h1 
              className="gradient-text mb-4"
              style={{ 
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 800,
              }}
            >
              Qui sommes-nous ?
            </h1>
            
            <p className="text-lg max-w-3xl mx-auto dark:text-white/70 text-[#1A2A23]/70 mb-6" style={{ fontFamily: 'var(--font-body)' }}>
              Nous sommes des étudiants ingénieurs en Management Industriel à l'EMINES - École de Management Industriel, 
              au sein de l'Université Mohammed VI Polytechnique de Benguerir. Dans le cadre de notre formation, 
              nous développons des solutions innovantes pour la surveillance environnementale et l'aide à la décision.
            </p>
            
            <p className="text-base max-w-2xl mx-auto dark:text-white/60 text-[#1A2A23]/60" style={{ fontFamily: 'var(--font-body)' }}>
              AirBoard est notre projet info de 1ère année Cycle Ingénieur, conçu en collaboration avec OCP Safi pour optimiser 
              le pilotage intelligent des émissions industrielles.
            </p>
          </motion.div>

          {/* Team Members Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="glass-card rounded-3xl p-8 text-center h-full transition-all duration-300 hover:border-white/30 hover:shadow-2xl relative overflow-hidden">
                  {/* Background gradient on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, #2FA36F, transparent)' }}
                  />
                  
                  {/* Avatar */}
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-emerald-500/30 group-hover:border-emerald-500/50 transition-all duration-300">
                    {member.image ? (
                      <ImageWithFallback
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : "low"}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                        <Users size={50} className="text-emerald-500" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="dark:text-white text-[#1A2A23] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    {member.name}
                  </h3>
                  
                  <p className="text-emerald-500 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                    {member.role}
                  </p>
                  
                  <p className="text-sm dark:text-white/60 text-[#1A2A23]/60 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                    {member.description}
                  </p>
                  
                  <a 
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold hover:underline" 
                    style={{ 
                      color: '#79D6A3',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    <Mail size={16} />
                    {member.email}
                  </a>

                  <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-emerald-500/40 text-emerald-600 hover:text-emerald-700"
                      style={{ fontFamily: 'var(--font-heading)' }}
                      onClick={() => openMailDraft('outlook', member.email)}
                    >
                      Outlook
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-emerald-500/40 text-emerald-600 hover:text-emerald-700"
                      style={{ fontFamily: 'var(--font-heading)' }}
                      onClick={() => openMailDraft('gmail', member.email)}
                    >
                      Gmail
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card rounded-3xl p-8 md:p-12 text-center"
        >
          <h2 
            className="text-3xl md:text-4xl dark:text-white text-[#1A2A23] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Contact Responsable HSE
          </h2>
          <p className="text-lg dark:text-white/70 text-[#1A2A23]/70 mb-8" style={{ fontFamily: 'var(--font-body)' }}>
            Pour toute question liée au service HSE, contactez directement Hicham Smaiti (OCP Group).
          </p>

          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-500/30 shadow-lg shadow-emerald-500/20 bg-gradient-to-br from-emerald-500/15 to-teal-500/15 flex items-center justify-center">
              <ImageWithFallback
                src={HichamImage}
                alt="Hicham Smaiti"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <a
              href="mailto:H.smaiti@ocpgroup.ma"
              className="inline-flex items-center gap-2 text-lg font-semibold text-emerald-500 hover:underline"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <Mail size={20} />
              H.smaiti@ocpgroup.ma
            </a>

            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                onClick={() => window.location.href = 'mailto:H.smaiti@ocpgroup.ma'}
                className="h-14 px-10 bg-gradient-to-r from-[#0E6B57] via-[#2FA36F] to-[#0E6B57] text-white shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 border border-white/20"
                style={{ 
                  fontFamily: 'var(--font-heading)',
                  backgroundSize: '200% 100%',
                }}
              >
                <Mail size={22} className="mr-3" />
                Contacter Hicham Smaiti
              </Button>
            </motion.div>
          </div>
        </motion.div>
        </div>
      </div>
    </>
  )
}
