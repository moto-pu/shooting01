'use strict';
import gulp from 'gulp';
import shell from 'gulp-shell';
import rsync from 'gulp-rsync';
import plumber from 'gulp-plumber';
import cssmin from 'gulp-cssmin';
import notify from 'gulp-notify';
import notifier from 'node-notifier';
import del from 'del';
import autoprefixer from 'gulp-autoprefixer';
import postcss from 'gulp-postcss';
import flexBugsFixes from 'postcss-flexbugs-fixes';
import compass from 'gulp-compass';
import deleteEmpty from 'delete-empty';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackConfig from './webpack.config.babel.factory';

const distPath = './dist';
const srcPath = './src';

let isWatchify = false;
let usePolling = false;
const aggregateTimeout = 300;
const pollInterval = 1000;

process.env.NODE_ENV = 'develop';

// フラグ設定
gulp.task('enableWatchify', done=>{isWatchify = true;done();});
gulp.task('usePolling', done=>{usePolling = true;done();});


// 環境変数設定(本番用)
gulp.task('setEnvProduction', done=>{
  process.env.NODE_ENV = 'production';
  console.log('[PRODUCTION]');
  done();
});

// 環境変数設定(本番ビルドのテスト用)
gulp.task('setEnvProductionBuildTest', done=>{
  process.env.NODE_ENV = 'production';
  console.log('[PRODUCTION_TEST]');
  done();
});

// 環境変数設定(デモ用) (開発中は開発ビルド)
gulp.task('setEnvDemo', done=>{
  console.log('[DEMO]');
  done();
});

gulp.task('clean_js', done=>{
  del([`${distPath}/**/*`], (err, deletedFiles) => {
    console.log('Files deleted:', deletedFiles.join(', '));
  });
  done();
});

gulp.task('clean', gulp.parallel(
  'clean_js',
));

gulp.task('webpackJsMain', done=>{
  const webpackParams = {
    environment: process.env.NODE_ENV === 'develop' ? 'develop' : 'production',
    buildMode: process.env.NODE_ENV,
    isWatchify,
    usePolling,
    aggregateTimeout,
    pollInterval,
  };
  webpack(webpackConfig(webpackParams), (err, stats)=>{
    if (err) {
      throw new Error(`webpackMain: ${err}`);
    } else {
      console.log('[webpackMain]', stats.toString());
    }
    done();
  });
});

// webpackタスク
gulp.task('webpackJs',
  gulp.series(
    'webpackJsMain',
    done=>done()));

gulp.task('complete_js', done=>{
  notifier.notify(
    {
      message: 'JS配備完了しました',
      title: 'JS配備完了'
    },
    (err, response) => {
      if (err) {
        console.log(response);
      }
    });
  done();
});


// ビルドタスク

gulp.task('buildJs', gulp.series(
  'webpackJs',
));

gulp.task('build', gulp.series(
  'clean',
  'setEnvProduction',
  'buildJs',
));

gulp.task('prodTestBuild', gulp.series(
  'clean',
  'setEnvProductionBuildTest',
  'buildJs',
));

gulp.task('demoBuild', gulp.series(
  'clean',
  'setEnvDemo',
  'buildJs',
));

gulp.task('developBuild', gulp.series(
  'clean',
  'buildJs',
));

gulp.task('browserSyncInit', done=>{
  browserSync.init({
    https: {
      key: './cert/localhost+1-key.pem',
      cert: './cert/localhost+1.pem'
    },
    server: {
      baseDir: './',
      index: 'index.html',
      directory: true,
    },
    watch: true,
    files: 'index.html',
    // proxy: {
    //   target: 'https://test.example.com',
    //   ws: true,
    // },
    port: 3330,
    open: false
  });
  done();
});

gulp.task('bsReload', done=>{
  browserSync.reload();
  done();
});

gulp.task('watchJs', ()=>{
  return gulp.watch(`${srcPath}/**/*.js`, {usePolling, interval:pollInterval, binaryInterval: pollInterval },
    gulp.series('buildJs','bsReload'));
});

gulp.task('watch',
  gulp.series(
    'clean',
    'enableWatchify',
    'browserSyncInit',
    gulp.parallel('buildJs', 'watchJs'),
    done=>done()));


gulp.task('watch-win',
  gulp.series(
    'clean',
    'usePolling',
    'enableWatchify',
    'browserSyncInit',
    gulp.parallel('buildJs', 'watchJs'),
    done=>done()));
