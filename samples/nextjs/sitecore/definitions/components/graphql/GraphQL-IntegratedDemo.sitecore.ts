import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';
import fs from 'fs';

const query = fs.readFileSync(
  'sitecore/definitions/components/graphql/GraphQL-IntegratedDemo.sitecore.graphql',
  'utf8'
);

/**
 * Adds the GraphQL-IntegratedDemo component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function GraphQLIntegratedDemo(manifest: Manifest): void {
  manifest.addComponent({
    name: 'GraphQL-IntegratedDemo',
    templateName: 'JssNextWeb-GraphQL-IntegratedDemo',
    icon: SitecoreIcon.GraphConnection_directed,
    graphQLQuery: query,
    fields: [
      { name: 'sample1', type: CommonFieldTypes.SingleLineText },
      { name: 'sample2', type: CommonFieldTypes.GeneralLink },
    ],
  });
}
