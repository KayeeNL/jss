import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Styleguide-FieldUsage-File component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function StyleguideFieldUsageFile(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Styleguide-FieldUsage-File',
    templateName: 'JssNextWeb-Styleguide-FieldUsage-File',
    icon: SitecoreIcon.FloppyDisk,
    fields: [{ name: 'file', type: CommonFieldTypes.File }],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['JssNextWeb-styleguide-explanatory-component-template'],
  });
}
