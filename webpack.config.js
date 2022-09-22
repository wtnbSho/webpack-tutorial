const MiniCssExtractPlugin = require("mini-css-extract-plugin");


// // [定数] webpack の出力オプションを指定します
// // 'production' か 'development' を指定
// const MODE = "production";


// // ソースマップの利用有無(productionのときはソースマップを利用しない)
// const enabledSourceMap = MODE === "development";

module.exports = {
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.css'
		})],
		output: {
			assetModuleFilename: "imgs/[name][ext]",
		  },
	// mode: MODE,
	mode: "production",
	devtool: "source-map",

  module: {
    rules: [
      // Sassファイルの読み込みとコンパイル
      {
        test: /\.scss/, // 対象となるファイルの拡張子
        use: [
        //   // linkタグに出力する機能
        //   "style-loader",
			{
				loader: MiniCssExtractPlugin.loader,
			},
          // CSSをバンドルするための機能
          {
            loader: "css-loader",
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: true,
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,

              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
            },
          },
		   // PostCSSのための設定
		   {
            loader: "postcss-loader",
            options: {
              // PostCSS側でもソースマップを有効にする
              // sourceMap: true,
              postcssOptions: {
                plugins: [
                  // Autoprefixerを有効化
                  // ベンダープレフィックスを自動付与する
                  ["autoprefixer", { grid: true }],
                ],
              },
            },
          },
          {
            loader: "sass-loader",
            // options: {
            //   // ソースマップの利用有無
            //   sourceMap: enabledSourceMap,
            // },
          },
        ],
      },
	  {
        // 対象となるファイルの拡張子
        test: /\.(gif|png|jpg|svg)$/,
        // 閾値以上だったら埋め込まずファイルとして分離する
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 100KB以上だったら埋め込まずファイルとして分離する
            maxSize: 100 * 1024,
          },
        },
      },
    ],
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ["web", "es5"],
};