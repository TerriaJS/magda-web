import StaticPage from "../Components/StaticPage";
// import About from "./markdown/About";
// import SearchSyntax from "./markdown/SearchSyntax";
// const webpackRequireContext = require.context('!markdown-with-front-matter!./_posts', false, /\.md$/);
// const blogs = webpackRequireContext.keys().reduce((memo, fileName) => memo.set(fileName.match(/\.\/([^\.]+)\.*/)[1], webpackRequireContext(fileName)), new Map())


const createContent = (path, title, component) => ({path, title, component})

export const staticPageRegister = [
    createContent('about', "About magda", StaticPage),
    createContent('search-syntax', "Search Syntax", StaticPage)
];

