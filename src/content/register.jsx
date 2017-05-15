import StaticPage from "../Components/StaticPage";
// import About from "./markdown/About";
// import SearchSyntax from "./markdown/SearchSyntax";

const webpackRequireContext = require.context('!markdown-with-front-matter!../markdown', false, /\.md$/);
export const contents = webpackRequireContext.keys().reduce((memo, fileName) => memo.set(fileName.match(/\.\/([^\.]+)\.*/)[1], webpackRequireContext(fileName)), new Map())


const createContent = (path, title, component) => ({path, title, component})

export const staticPageRegister = [...contents.keys()].map(path => createContent(path, contents.get(path).title , StaticPage))
