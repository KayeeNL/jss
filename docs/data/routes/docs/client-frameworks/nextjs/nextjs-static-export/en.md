---
name: nextjs-static-export
routeTemplate: ./data/component-templates/article.yml
title: Next.js static export
---

# Next.js Static HTML Export

Using JSS Next.js sample app you can run `jss export` that allows you to export your app to static HTML, which can be run standalone without the need of a Node.js server. Read more about Next.js [Static HTML Export](https://nextjs.org/docs/advanced-features/static-html-export).

> Currently, these are the limitations of the Next.js sample app for usage of Static HTML Export:
> 1. i18n not supported, so multilingual apps can't be exported.
> 1. Visitor Identification not available.
> 1. Request rewrites not supported.

These instructions you should apply in order to run `next export`:
1. Remove `i18n`:
	1. Delete i18n configuration in `next.config.js`.
	1. Define language in `package.json` using `config.language` which will be used during export.
1. Remove `rewrites` in `next.config.js`.
1. Define `getStaticPaths` in `[[...path]].tsx` and use:
	```js
	import { GetStaticPaths } from 'next';
	import { graphQLSitemapService } from 'lib/graphql-sitemap-service';
	import config from 'temp/config';
	import { config as packageConfig } from '../../package.json';

	export const getStaticPaths: GetStaticPaths = async (context) => {
	  const ROOT_ITEM = `/sitecore/content/${config.jssAppName}/home`;
	  const paths = await graphQLSitemapService.fetchExportSitemap(packageConfig.language, ROOT_ITEM);

	  return {
    	paths,
    	fallback: false,
	  };
	}
	```
	> The `fallback: true` and `fallback: 'blocking'` modes of `getStaticPaths` are not supported when using next export.
1. Remove usage of `<VisitorIdentification />` component in `src/Layout.tsx`, since Visitor Identification not available.
1. Define `PUBLIC_URL` in `.env`.
1. Add script `"export": "npm-run-all --serial bootstrap next:build next:export"` in package.json.