import {
  Contains,
  IsInt,
  IsNotEmpty,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max, IsOptional
} from 'class-validator'

/**
 * Get demo payload
 */
export class GetDemoPayload {
  /**
   * Title.
   */
  @Length(10, 20)
  @IsNotEmpty({ message: 'Title is required!' })
  title!: string

  /**
   * Text.
   */
  @Contains('hello')
  text!: string

  /**
   * Rating.
   */
  @IsInt()
  @Min(0)
  @Max(10)
  rating!: number

  /**
   * Email.
   */
  @IsEmail()
  email!: string

  /**
   * site.
   */
  @IsFQDN()
  @IsOptional()
  site?: string

  /**
   * Create date.
   */
  @IsDate()
  @IsOptional()
  createDate?: Date
}
