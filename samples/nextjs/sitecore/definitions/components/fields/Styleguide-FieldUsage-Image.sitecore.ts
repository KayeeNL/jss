import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Styleguide-FieldUsage-Image component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function StyleguideFieldUsageImage(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Styleguide-FieldUsage-Image',
    templateName: 'JssNextWeb-Styleguide-FieldUsage-Image',
    icon: SitecoreIcon.PhotoPortrait,
    fields: [
      { name: 'sample1', type: CommonFieldTypes.Image },
      { name: 'sample2', type: CommonFieldTypes.Image },
    ],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['JssNextWeb-styleguide-explanatory-component-template'],
  });
}
