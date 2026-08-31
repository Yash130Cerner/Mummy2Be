import type { Access } from 'payload'

/** Only logged-in admin users. */
export const admins: Access = ({ req }) => Boolean(req.user)

/** Anyone, including anonymous site visitors. */
export const anyone: Access = () => true

/** Public visitors see only published docs; admins see everything. */
export const publishedOnly: Access = ({ req }) => {
  if (req.user) return true
  return { published: { equals: true } }
}
