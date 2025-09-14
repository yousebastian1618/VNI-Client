export const TEXT_INPUT_OPTIONS: string[] = [
  'text', 'textarea', 'email'
]

export const CONTACT_US_FORM: any[] = [
  {
    name: 'first_name',
    gqlKey: 'firstName',
    label: 'First Name',
    type: 'text',
    info: '',
    icon: '',
    style: '',
    required: true,
    value: '',
    errors: {
      "NOT_EMPTY": {
        params: null,
        message: "Your first name cannot be empty"
      },
    }
  },
  {
    name: 'last_name',
    gqlKey: 'lastName',
    label: 'Last Name',
    type: 'text',
    info: '',
    icon: '',
    style: '',
    required: true,
    value: '',
    errors: {
      "NOT_EMPTY": {
        params: null,
        message: "Your last name cannot be empty"
      },
    }
  },
  {
    name: 'email',
    gqlKey: 'email',
    label: 'Email',
    type: 'email',
    info: '',
    icon: '',
    style: '',
    required: true,
    value: '',
    errors: {
      "NOT_EMPTY": {
        params: null,
        message: "Email cannot be empty"
      },
      "TYPE": {
        params: 'email',
        message: "Invalid email address. Please try again."
      }
    }
  },
  {
    name: 'subject',
    gqlKey: 'subject',
    label: 'Subject',
    type: 'text',
    info: '',
    icon: '',
    style: '',
    required: true,
    value: '',
    errors: {
      "NOT_EMPTY": {
        params: null,
        message: "Subject cannot be empty"
      },
    }
  },
  {
    name: 'message',
    gqlKey: 'message',
    label: 'Message',
    type: 'textarea',
    info: '',
    icon: '',
    style: '',
    required: true,
    value: '',
    errors: {
      "NOT_EMPTY": {
        params: null,
        message: "Message cannot be empty"
      },
    }
  }
]
export const LOGIN_FORM: any[] = [
  {
    name: 'email',
    gqlKey: 'email',
    label: 'Email',
    type: 'email',
    info: '',
    icon: '',
    style: '',
    required: true,
    value: '',
    errors: ['NOT_EMPTY']
  },
  {
    name: 'password',
    gqlKey: 'password',
    label: 'Password',
    type: 'text',
    info: '',
    icon: '',
    style: '',
    required: true,
    value: '',
    errors: ['NOT_EMPTY']
  },
]

export const NEW_BLOG_FORM: any[] = [
  {
    name: 'title',
    gqlKey: 'title',
    label: 'Title',
    type: 'text',
    info: '',
    icon: '',
    style: '',
    required: true,
    value: '',
    errors: ['NOT_EMPTY']
  },
  {
    name: 'subtitle',
    gqlKey: 'subtitle',
    label: 'Subtitle',
    type: 'text',
    info: '',
    icon: '',
    style: '',
    required: false,
    value: '',
    errors: []
  },
  {
    name: 'author',
    gqlKey: 'author',
    label: 'Author',
    type: 'text',
    info: '',
    icon: '',
    style: '',
    required: false,
    value: '',
    errors: []
  },
]

export const NEW_BLOG_IMAGE_FORM: any = {
  name: 'image',
  gqlKey: 'image',
  label: 'Image',
  type: 'file',
  info: '',
  icon: '',
  style: '',
  required: false,
  value: '',
  errors: []
}

export const NEW_BLOG_PARAGRAPH_FORM: any[] = [
  {
    name: 'paragraph-title',
    gqlKey: 'title',
    label: 'Title',
    type: 'text',
    info: '',
    icon: '',
    style: '',
    required: false,
    value: '',
    errors: []
  },
  {
    name: 'paragraph-text',
    gqlKey: 'text',
    label: 'Paragraph',
    type: 'textarea',
    info: '',
    icon: '',
    style: '',
    required: false,
    value: '',
    errors: []
  },
  {
    name: 'paragraph-image',
    gqlKey: 'image',
    label: '',
    type: '',
    info: '',
    icon: '',
    style: '',
    required: false,
    value: '',
    errors: []
  },
]

export const FORGOT_PASSWORD_FORM: any[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    info: '',
    icon: '',
    style: '',
    required: true,
    value: '',
    errors: ['NOT_EMPTY']
  },
]
