export const TEXT_INPUT_OPTIONS: string[] = [
  'text', 'textarea', 'email'
]

export const CONTACT_US_FORM: any[] = [
  {
    name: 'first_name',
    label: 'First Name',
    type: 'text',
    info: '',
    icon: '',
    style: '',
    required: true,
    value: ''
  },
  {
    name: 'last_name',
    label: 'Last Name',
    type: 'text',
    info: '',
    icon: '',
    style: '',
    required: true,
    value: ''
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    info: '',
    icon: '',
    style: '',
    required: true,
    value: ''
  },
  {
    name: 'subject',
    label: 'Subject',
    type: 'text',
    info: '',
    icon: '',
    style: '',
    required: true,
    value: ''
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    info: '',
    icon: '',
    style: '',
    required: true,
    value: ''
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
    value: []
  },
  {
    name: 'header',
    label: 'Header',
    type: 'text',
    info: '',
    icon: '',
    style: '',
    required: true,
    value: ''
  },
  {
    name: 'subHeader',
    label: 'Sub Header',
    type: 'text',
    info: '',
    icon: '',
    style: '',
    required: true,
    value: ''
  },
  {
    name: 'introduction',
    label: 'Introduction',
    type: 'textarea',
    info: '',
    icon: '',
    style: '',
    required: false,
    value: ''
  },
  {
    name: 'thumbnail',
    label: 'Thumbnail',
    type: 'media',
    info: '',
    icon: '',
    style: '',
    required: false,
    value: null
  },
  {
    name: 'author',
    label: 'Author',
    type: 'text',
    info: '',
    icon: '',
    style: '',
    required: false,
    value: ''
  },
]
export const PARAGRAPH_FORM: any = {
  index: 0,
  title: '',
  body: ''
}
