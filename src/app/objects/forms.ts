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
export const BLOG_POST_FORM: any[] = [
  {
    name: 'paragraphs',
    label: 'Paragraphs',
    type: 'array',
    info: '',
    icon: '',
    style: '',
    required: false,
    value: [],
    errors: []
  },
  {
    name: 'header',
    label: 'Header',
    type: 'text',
    info: '',
    icon: '',
    style: '',
    required: true,
    value: '',
    errors: []
  },
  {
    name: 'subHeader',
    label: 'Sub Header',
    type: 'text',
    info: '',
    icon: '',
    style: '',
    required: true,
    value: '',
    errors: []
  },
  {
    name: 'author',
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
export const PARAGRAPH_FORM: any = {
  index: 0,
  title: '',
  body: ''
}

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
