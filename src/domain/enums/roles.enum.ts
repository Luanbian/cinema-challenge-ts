export const Roles = {
  ADMIN: 'ADMIN',
  CADASTRER: 'CADASTRER',
  MANAGER: 'MANAGER',
  CONSULTER: 'CONSULTER',
  TRAINEE: 'TRAINEE'
} as const

export type Roles = (typeof Roles)[keyof typeof Roles]
