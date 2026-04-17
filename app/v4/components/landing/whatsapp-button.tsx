"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/573105511862?text=Hola%2C+me+interesa+Simon+Movilidad"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 hover:bg-[#20c45a] focus-visible:outline-2 focus-visible:outline-[#25D366] focus-visible:outline-offset-2"
      aria-label="Contactar a Simon Movilidad por WhatsApp"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </motion.a>
  )
}
