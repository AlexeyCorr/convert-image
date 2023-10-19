const { src, dest, series } = require('gulp')
const del = require('del')
const svgmin = require('gulp-svgmin')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const avif = require('gulp-avif')

const SOURCE = 'src/image/**/*.{png,jpg}'
const DESTINATION = 'dist/image'

const svgMin = () => {
  return src('src/svg/**/*.svg')
    .pipe(svgmin())
    .pipe(dest('dist/svg'))
}

const imageMin = () => {
  return src(SOURCE)
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 80, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(dest(DESTINATION))
}

const toWebp = () => {
  return src(`${DESTINATION}/**/*.{png,jpg}`)
    .pipe(webp())
    .pipe(dest(DESTINATION))
}

const toAvif = () => {
  return src(`${DESTINATION}/**/*.{png,jpg}`)
    .pipe(avif())
    .pipe(dest(DESTINATION))
}

const clean = () => del('dist')

exports.minify = series(clean, svgMin, imageMin, toWebp, toAvif)