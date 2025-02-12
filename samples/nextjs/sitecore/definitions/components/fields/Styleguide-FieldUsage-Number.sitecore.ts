import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Styleguide-FieldUsage-Number component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function StyleguideFieldUsageNumber(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Styleguide-FieldUsage-Number',
    templateName: 'JssNextWeb-Styleguide-FieldUsage-Number',
    icon: SitecoreIcon.NumbersField,
    fields: [{ name: 'sample', type: CommonFieldTypes.Number }],
    // inherit fields from another template (../templates/Styleguide-Explanatory-Component)
    // inheritance adds fields defined on the base template(s) implicitly to this component
    inherits: ['JssNextWeb-styleguide-explanatory-component-template'],
  });
}
