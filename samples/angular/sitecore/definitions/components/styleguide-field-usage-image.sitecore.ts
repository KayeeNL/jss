import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Styleguide-FieldUsage-Image component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function StyleguideFieldUsageImage(manifest: Manifest) {
  manifest.addComponent({
    name: 'StyleguideFieldUsageImage',
    templateName: 'JssAngularWeb-StyleguideFieldUsageImage',
    icon: SitecoreIcon.PhotoPortrait,
    fields: [
      { name: 'sample1', type: CommonFieldTypes.Image },
      { name: 'sample2', type: CommonFieldTypes.Image },
    ],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['JssAngularWeb-styleguide-explanatory-component-template'],
  });
}
