import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Styleguide-FieldUsage-Link component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideFieldUsageLink(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideFieldUsageLink',
    templateName: 'JssAngularWeb-StyleguideFieldUsageLink',
    icon: SitecoreIcon.Link,
    fields: [
      { name: 'externalLink', type: CommonFieldTypes.GeneralLink },
      { name: 'internalLink', type: CommonFieldTypes.GeneralLink },
      { name: 'emailLink', type: CommonFieldTypes.GeneralLink },
      { name: 'paramsLink', type: CommonFieldTypes.GeneralLink },
    ],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['JssAngularWeb-styleguide-explanatory-component-template'],
  });
}
