import { Allow } from 'class-validator'

export class CancelRequestTestPayload {
  /**
   * ID.
   */
  @Allow()
  id!: number
}
