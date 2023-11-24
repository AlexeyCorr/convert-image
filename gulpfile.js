const { src, dest, series } = require('gulp')
const del = require('del')
const svgmin = require('gulp-svgmin')
const squoosh = require('gulp-libsquoosh')

const SOURCE = './src/image/**/*.{png,jpg}'
const DESTINATION = './dist/image'

const svgMin = () => {
  return src('./src/svg/**/*.svg')
    .pipe(svgmin())
    .pipe(dest('./dist/svg'))
}

const imageMin = () => {
  return src(SOURCE)
    .pipe(squoosh())
    .pipe(dest(DESTINATION))
}

const toWebp = () => {
  return src(SOURCE)
    .pipe(
      squoosh({
        webp: {}
      })
    )
    .pipe(dest(DESTINATION))
}

const toAvif = () => {
  return src(SOURCE)
  .pipe(
    squoosh({
      avif: {}
    })
  )
  .pipe(dest(DESTINATION))
}

const clean = () => del('./dist')

exports.minify = series(clean, svgMin, imageMin, toWebp, toAvif)