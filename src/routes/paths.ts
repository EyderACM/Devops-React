function path(root: string, sublink: string) {
  return `${root}${sublink}`
}

const ROOTS = '/'

const paths = {
  root: path(ROOTS, ''),
  general: {
    login: path(ROOTS, 'login'),
    signUp: path(ROOTS, 'sign-up'),
    dashboard: path(ROOTS, 'dashboard'),
  },
  dashboard: {
    root: path(ROOTS, 'dashboard'),
    students: path(ROOTS, 'dashboard/students'),
    courses: path(ROOTS, 'dashboard/courses'),
  },
}

export default paths
