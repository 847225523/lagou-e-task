// 实现这个项目的构建任务
const { src, dest, parallel, series, watch } = require('gulp')
// 用于自动加载插件
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()
//用于自动删除文件，不用自己手动删除
const del = require('del')
//用于进行热更新
const browserSync = require('browser-sync')
const bs = browserSync.create()
const data = {
    menus: [
      {
        name: 'Home',
        icon: 'aperture',
        link: 'index.html'
      },
      {
        name: 'About',
        link: 'about.html'
      },
      {
        name: 'Contact',
        link: '#',
        children: [
          {
            name: 'Twitter',
            link: 'https://twitter.com/w_zce'
          },
          {
            name: 'About',
            link: 'https://weibo.com/zceme'
          },
          {
            name: 'divider'
          },
          {
            name: 'About',
            link: 'https://github.com/zce'
          }
        ]
      }
    ],
    pkg: require('./package.json'),
    date: new Date()
  }
//删除文件夹的任务
const clean = () => {
    return del(['dist', 'temp'])
  }

  //处理css文件
 const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' })
      .pipe(plugins.sass({ outputStyle: 'expanded' }))
      .pipe(dest('temp'))
      .pipe(bs.reload({ stream: true }))
  }

  //处理js文件
  const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
      .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
      .pipe(dest('temp'))
      .pipe(bs.reload({ stream: true }))
  }

  //处理html文件
  const page = () => {
    return src('src/*.html', { base: 'src' })
      .pipe(plugins.swig({ data, defaults: { cache: false } })) // 防止模板缓存导致页面不能及时更新
      .pipe(dest('temp'))
      .pipe(bs.reload({ stream: true }))
  }
  //用来处理图片
  const image = () => {
    return src('src/assets/images/**', { base: 'src' })
      .pipe(plugins.imagemin())
      .pipe(dest('dist'))
  }
  
  //处理font
  const font = () => {
    return src('src/assets/fonts/**', { base: 'src' })
      .pipe(plugins.imagemin())
      .pipe(dest('dist'))
  }
  //处理额外的文件
  const extra = () => {
    return src('public/**', { base: 'public' })
      .pipe(dest('dist'))
  }

  //处理注释
  const useref = () => {
    return src('temp/*.html', { base: 'temp' })
      .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
      // 压缩html js css
      .pipe(plugins.if(/\.js$/, plugins.uglify()))
      .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
      .pipe(plugins.if(/\.html$/, plugins.htmlmin({
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
      })))
      .pipe(dest('dist'))
  }  


  //开启服务
  const serve = () => {
    watch('src/assets/styles/*.scss', style)
    watch('src/assets/scripts/*.js', script)
    watch('src/*.html', page)
    watch([
      'src/assets/images/**',
      'src/assets/fonts/**',
      'public/**'
    ], bs.reload)
  
    bs.init({
      notify: false,
      port: 2080,
      // open: false,
      // files: 'dist/**',
      server: {
        baseDir: ['temp', 'src', 'public'],
        routes: {
          '/node_modules': 'node_modules'
        }
      }
    })
  }
  const compile = parallel(style, script,page)
  const build = series(clean,parallel(series(compile, useref),image, font,extra))
  const develop=series(compile,serve)
  module.exports = {
    clean,
    build,
    develop,
    compile,
  }