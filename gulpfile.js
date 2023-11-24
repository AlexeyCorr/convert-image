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

const pngImageMin = () => {
  return src('./src/image/*.png')
  .pipe(
    squoosh({
        oxipng: {
          level: 2,
        },
      },
      {
        quant: {
          numColors: 256
        },
      })
  )
  .pipe(dest(DESTINATION))
}

const jpgImageMin = () => {
  return src('./src/image/*.jpg')
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

exports.minify = series(clean, svgMin, pngImageMin, jpgImageMin, toWebp, toAvif)