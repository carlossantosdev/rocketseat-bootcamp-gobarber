import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO'

interface IMailContactData {
  name: string
  email: string
}

export default interface ISendMailDTO {
  to: IMailContactData
  from?: IMailContactData
  subject: string
  templateData: IParseMailTemplateDTO
}
