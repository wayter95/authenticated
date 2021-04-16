export interface EmailConfirmation {
  confirmation: (confirmationParams: EmailConfirmation.Params) => Promise<EmailConfirmation.Result>
}

export namespace EmailConfirmation {
  export type Params = {
    email: string
    code: string
  }
  export type Result = boolean
}
