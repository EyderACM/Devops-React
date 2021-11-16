import * as Yup from 'yup'

const requiredString = (message: string) => Yup.string().required(message)

export default requiredString
