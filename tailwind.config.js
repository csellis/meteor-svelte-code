module.exports = {
  purge: {
    enabled: true,
    content : [
      './client/**/*.html',
      './imports/**/*.svelte'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/ui'),
  ],
}
